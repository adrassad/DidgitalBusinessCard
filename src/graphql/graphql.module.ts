import { ApolloDriver, type ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { formatGraphqlError } from './format-error';
import './enums';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      path: '/graphql',
      autoSchemaFile: true,
      sortSchema: true,
      graphiql: false,
      playground: false,
      formatError: (formatted, error) =>
        formatGraphqlError(
          formatted,
          error,
          process.env['NODE_ENV'] === 'production',
        ),
    }),
  ],
})
export class AppGraphQLModule {}