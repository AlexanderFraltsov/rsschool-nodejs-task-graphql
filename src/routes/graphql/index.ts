import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { Source, graphql, parse, validate } from 'graphql';
import depthLimit from 'graphql-depth-limit';

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

			const errors = validate(createGQLRequestSchema, parse(new Source(source)), [depthLimit(5)]);

			if (errors.length > 0) {
				return { errors };
			}

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
