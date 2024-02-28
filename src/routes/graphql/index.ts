import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGQLRequestSchema, createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import {
	graphql,
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLBoolean,
	GraphQLList,
} from 'graphql';
import { UserType } from './types/user.type.js';
import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library.js';




const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
	const { prisma } = fastify;

	const schema = createGQLRequestSchema(prisma);

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
			const { query, variables } = req.body;
			return await graphql({ schema, source: query });
    },
  });
};

export default plugin;
