import { Logger } from '@nestjs/common';
import type { GraphQLFormattedError } from 'graphql';

const logger = new Logger('GraphQL');

const PUBLIC_CODES = new Set([
  'GRAPHQL_VALIDATION_FAILED',
  'GRAPHQL_PARSE_FAILED',
  'BAD_USER_INPUT',
  'BAD_REQUEST',
]);

export function formatGraphqlError(
  formatted: GraphQLFormattedError,
  error: unknown,
  production: boolean,
): GraphQLFormattedError {
  const code =
    typeof formatted.extensions?.['code'] === 'string'
      ? formatted.extensions['code']
      : 'INTERNAL_SERVER_ERROR';

  if (!production || PUBLIC_CODES.has(code)) {
    return formatted;
  }

  logger.error(
    error instanceof Error ? (error.stack ?? error.message) : String(error),
  );

  return {
    message: 'Internal server error',
    extensions: { code: 'INTERNAL_SERVER_ERROR' },
  };
}