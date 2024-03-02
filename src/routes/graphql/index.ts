import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { graphql } from 'graphql';

import { createGQLRequestSchema, createGqlResponseSchema, gqlResponseSchema } from './schemas.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
	const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
			const {
				query: source,
				variables: variableValues,
			} = req.body;

			return await graphql({
				schema: createGQLRequestSchema,
				source,
				contextValue: { prisma },
				variableValues,
			});
    },
  });
};

export default plugin;
