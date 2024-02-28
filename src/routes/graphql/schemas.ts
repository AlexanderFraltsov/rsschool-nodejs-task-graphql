import { Type } from '@fastify/type-provider-typebox';
import { PrismaClient, Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library.js';
import {
	GraphQLObjectType,
	GraphQLList,
	GraphQLBoolean,
	GraphQLSchema,
} from 'graphql';
import { MemberType } from './types/member-type.type.js';
import { PostType } from './types/post.type.js';
import { ProfileType } from './types/profile.type.js';
import { UserType } from './types/user.type.js';

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

export const createGQLRequestSchema = (prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>) => {
	const rootQuery = new GraphQLObjectType({
		name: 'Query',
		fields: {
			users: {
				type: new GraphQLList(UserType),
				resolve: async () => prisma.user.findMany(),
			},
			posts: {
				type: new GraphQLList(PostType),
				resolve: async () => prisma.post.findMany(),
			},
			profiles: {
				type: new GraphQLList(ProfileType),
				resolve: async () => prisma.profile.findMany(),
			},
			memberTypes: {
				type: new GraphQLList(MemberType),
				resolve: async () => prisma.memberType.findMany(),
			},
		},
	});
	const rootMutation = new GraphQLObjectType({
		name: 'Mutation',
		fields: {
			createUser: {
				type: GraphQLBoolean,
				resolve: () => true,
			},
		},
	});

	return new GraphQLSchema({
		query: rootQuery,
		mutation: rootMutation,
	});
}
