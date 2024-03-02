import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { UserType } from '../types/user.type.js';
import { DB } from '../types/db.type.js';
import { UUIDType } from '../types/uuid.js';
import { PostType } from '../types/post.type.js';
import { ProfileType } from '../types/profile.type.js';
import { MemberType } from '../types/member-type.type.js';

export const rootQuery = new GraphQLObjectType({
	name: 'Query',
	fields: {
		users: {
			type: new GraphQLList(UserType),
			resolve: (_, __, { prisma }: { prisma: DB }) => prisma.user.findMany(),
		},
		posts: {
			type: new GraphQLList(PostType),
			resolve: async (_, __, { prisma }: { prisma: DB }) => prisma.post.findMany(),
		},
		profiles: {
			type: new GraphQLList(ProfileType),
			resolve: async (_, __, { prisma }: { prisma: DB }) => prisma.profile.findMany(),
		},
		memberTypes: {
			type: new GraphQLList(MemberType),
			resolve: async (_, __, { prisma }: { prisma: DB }) => prisma.memberType.findMany(),
		},
		user: {
			type: UserType,
			args: {
				userId: {
					type: new GraphQLNonNull(UUIDType),
				},
			},
			resolve: async (_, { userId } : { userId: string }, { prisma }: { prisma: DB }) => {
					console.log('RESOLVER:', userId);
					return await prisma.user.findUnique({
					where: {
						id: userId,
					},
				})
			},
		},
	},
});
