import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, type ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import type { Env } from '../config/env';
import { formatGraphqlError } from './format-error';
import { queryGuard } from './query-guard';
import './enums';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      inject: [ConfigService],
      useFactory: (config: ConfigService<Env, true>): ApolloDriverConfig => {
        const sandbox = config.get('GRAPHQL_SANDBOX_ENABLED', { infer: true });
        const production = config.get('NODE_ENV', { infer: true }) === 'production';
        return {
          path: '/graphql',
          autoSchemaFile: true,
          sortSchema: true,
          introspection: sandbox,
          playground: false,
          graphiql: false,
          plugins: (sandbox
            ? [ApolloServerPluginLandingPageLocalDefault({ embed: true })]
            : []) as ApolloDriverConfig['plugins'],
          validationRules: [
            queryGuard(
              config.get('GRAPHQL_MAX_COMPLEXITY', { infer: true }),
              12,
            ),
          ],
          formatError: (formatted, error) =>
            formatGraphqlError(formatted, error, production),
        };
      },
    }),
  ],
})
export class AppGraphQLModule {}