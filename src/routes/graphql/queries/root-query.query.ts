import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { DB } from '../types/db.type.js';
import { UserType } from '../types/user.type.js';
import { UUIDType } from '../types/uuid.js';
import { PostType } from '../types/post.type.js';
import { MemberType } from '../types/member-type.type.js';
import { ProfileType } from '../types/profile.type.js';
import { MemberTypeId } from '../types/member-type-id.type.js';

export const rootQuery = new GraphQLObjectType({
	name: 'Query',
	fields: {
		users: {
			type: new GraphQLList(UserType),
			resolve: (_, __, { prisma }: { prisma: DB }) => prisma.user.findMany(),
		},
		user: {
			type: UserType,
			args: {
				id: {
					type: new GraphQLNonNull(UUIDType),
				},
			},
			resolve: async (_, { id } : { id: string }, { prisma }) => {
				const user = await prisma.user.findUnique({	where: { id	}	});
				return user;
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
			resolve: async (_, { id } : { id: string }, { prisma }) => {
				const post = await prisma.post.findUnique({	where: { id	}	});
				return post;
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
			resolve: async (_, { id } : { id: string }, { prisma }) => {
				const profile = await prisma.profile.findUnique({	where: { id	}	});
				return profile;
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
			resolve: async (_, { id } : { id: string }, { prisma }) => {
				const memberType = await prisma.memberType.findUnique({	where: { id	}	});
				return memberType;
			},
		},
	},
});
