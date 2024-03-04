import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';

import { UserType } from '../types/user.type.js';
import { UUIDType } from '../types/uuid.js';
import { PostType } from '../types/post.type.js';
import { MemberType } from '../types/member-type.type.js';
import { GQLContext } from '../types/context.type.js';
import { ProfileType } from '../types/profile.type.js';
import { MemberTypeId } from '../types/member-type-id.type.js';
import { getDataLoader } from '../utils/get-data-loader.util.js';

export const rootQuery: GraphQLObjectType<null, GQLContext> = new GraphQLObjectType({
	name: 'Query',
	fields: () => ({
		users: {
			type: new GraphQLList(UserType),
			resolve: async (_, __, { prisma }) => {
				return await prisma.user.findMany();
			},
		},
		user: {
			type: UserType,
			args: {
				id: {
					type: new GraphQLNonNull(UUIDType),
				},
			},
			resolve: async (_, { id } : { id: string },	{ prisma, dataLoaders }, info) => {
				const findMany = async (ids: string[]) => {
					const rows = await prisma.user.findMany({ where: { id: { in: ids } } });
					const sortedInIdsOrder = ids.map((id: string) => rows.find(x => x.id === id));
					return sortedInIdsOrder;
				}
				const dl = await getDataLoader<({
					id: string;
					name: string;
					balance: number;
				} | undefined)>(dataLoaders, info.fieldNodes, findMany);

				return dl.load(id);
			},
		},
		posts: {
			type: new GraphQLList(PostType),
			resolve: async (_, __, { prisma }) => prisma.post.findMany(),
		},
		post: {
			type: PostType,
			args: {
				id: {
					type: new GraphQLNonNull(UUIDType),
				},
			},
			resolve: async (_, { id } : { id: string }, { prisma, dataLoaders }, info) => {
				const findMany = async (ids: string[]) => {
					const rows = await prisma.post.findMany({ where: { id: { in: ids } } });
					const sortedInIdsOrder = ids.map((id: string) => rows.find(x => x.id === id));
					return sortedInIdsOrder;
				}
				const dl = await getDataLoader<({
					id: string;
					title: string;
					content: string;
					authorId: string;
				} | undefined)>(dataLoaders, info.fieldNodes, findMany);

				return dl.load(id);
			},
		},
		profiles: {
			type: new GraphQLList(ProfileType),
			resolve: async (_, __, { prisma }) => prisma.profile.findMany(),
		},
		profile: {
			type: ProfileType,
			args: {
				id: {
					type: new GraphQLNonNull(UUIDType),
				},
			},
			resolve: async (_, { id } : { id: string }, { prisma, dataLoaders }, info) => {
				const findMany = async (ids: string[]) => {
					const rows = await prisma.profile.findMany({ where: { id: { in: ids } } });
					const sortedInIdsOrder = ids.map((id: string) => rows.find(x => x.id === id));
					return sortedInIdsOrder;
				}
				const dl = await getDataLoader<({
					id: string;
					isMale: boolean;
					yearOfBirth: number;
					userId: string;
					memberTypeId: string;
				} | undefined)>(dataLoaders, info.fieldNodes, findMany);

				return dl.load(id);
			},
		},
		memberTypes: {
			type: new GraphQLList(MemberType),
			resolve: async (_, __, { prisma }) => prisma.memberType.findMany(),
		},
		memberType: {
			type: MemberType,
			args: {
				id: {
					type: new GraphQLNonNull(MemberTypeId),
				},
			},
			resolve: async (_, { id } : { id: string }, { prisma, dataLoaders }, info) => {
				const findMany = async (ids: string[]) => {
					const rows = await prisma.memberType.findMany({ where: { id: { in: ids } } });
					const sortedInIdsOrder = ids.map((id: string) => rows.find(x => x.id === id));
					return sortedInIdsOrder;
				}
				const dl = await getDataLoader<({
					id: string;
					discount: number;
					postsLimitPerMonth: number;
				} | undefined)>(dataLoaders, info.fieldNodes, findMany);

				return dl.load(id);
			},
		},
	}),
});
