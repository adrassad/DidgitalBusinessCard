import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import type { GraphQLFormattedError } from 'graphql';
import { formatGraphqlError } from './format-error';

const validationError: GraphQLFormattedError = {
  message: 'Cannot query field "url" on type "ProjectModel".',
  extensions: { code: 'GRAPHQL_VALIDATION_FAILED' },
};

const databaseError: GraphQLFormattedError = {
  message: "Can't reach database server at 127.0.0.1:55433",
  extensions: {
    code: 'INTERNAL_SERVER_ERROR',
    stacktrace: ['PrismaClientKnownRequestError'],
  },
};

describe('formatGraphqlError', () => {
  it('keeps a validation error in production', () => {
    const result = formatGraphqlError(validationError, new Error('validation'), true);
    assert.equal(result.message, validationError.message);
    assert.equal(result.extensions?.['code'], 'GRAPHQL_VALIDATION_FAILED');
  });

  it('hides an internal error in production', () => {
    const result = formatGraphqlError(databaseError, new Error('db down'), true);
    assert.equal(result.message, 'Internal server error');
    assert.equal(result.extensions?.['code'], 'INTERNAL_SERVER_ERROR');
    assert.equal(result.extensions?.['stacktrace'], undefined);
  });

  it('keeps an internal error outside production', () => {
    const result = formatGraphqlError(databaseError, new Error('db down'), false);
    assert.equal(result, databaseError);
  });
});