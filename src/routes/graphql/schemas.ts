import { Type } from '@fastify/type-provider-typebox';
import { GraphQLSchema } from 'graphql';

import { rootQuery } from './queries/root-query.query.js';
import { rootMutation } from './queries/root-mutation.query.js';

export const gqlResponseSchema = Type.Partial(
  Type.Object({
    data: Type.Any(),
    errors: Type.Any(),
  }),
);

export const createGqlResponseSchema = {
  body: Type.Object(
    {
      query: Type.String(),
      variables: Type.Optional(Type.Record(Type.String(), Type.Any())),
    },
    {
      additionalProperties: false,
    },
  ),
};

export const createGQLRequestSchema = new GraphQLSchema({
	query: rootQuery,
	mutation: rootMutation,
});
