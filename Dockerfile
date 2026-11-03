FROM node:24.22.1-trixie-slim AS build
WORKDIR /app
COPY package.json package-lock.json prisma.config.ts tsconfig.json ./
COPY prisma ./prisma
COPY src ./src
COPY scripts/init.sh /init.sh
RUN npm ci && npx prisma generate && npx tsc -p tsconfig.json && chmod +x /init.sh

FROM build AS init
USER node
ENTRYPOINT ["/init.sh"]

FROM node:24.22.1-trixie-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/src/generated ./src/generated
USER node
EXPOSE 3000
CMD ["node", "dist/src/main.js"]
HEALTHCHECK --interval=10s --timeout=3s --retries=12 \
    CMD node -e "fetch('http://127.0.0.1:3000/health').then((r)=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"