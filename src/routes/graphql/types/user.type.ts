import {
	GraphQLFloat,
	GraphQLInterfaceType,
	GraphQLList,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLString,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { ProfileType } from './profile.type.js';
import { DB } from './db.type.js';
import { PostType } from './post.type.js';

export const UserType = new GraphQLObjectType({
	name: 'User',
	fields: () => ({
		id: {
			type: new GraphQLNonNull(UUIDType),
		},
		name: {
			type: new GraphQLNonNull(GraphQLString),
		},
		balance: {
			type: new GraphQLNonNull(GraphQLFloat),
		},
		profile: {
			type: ProfileType,
			resolve: (
				{ id: userId }: { id: string },
				_,
				{ prisma }: { prisma: DB },
			) => prisma.profile.findUnique({	where: { userId	}	}),
		},
		posts: {
			type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PostType))),
			resolve: (
				{ id: authorId }: { id: string },
				_,
				{ prisma }: { prisma: DB },
			) => prisma.post.findMany({ where: { authorId } }),
		},
		userSubscribedTo: {
			type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
			resolve: (
				{ id: subscriberId }: { id: string },
				_,
				{ prisma }: { prisma: DB },
			) => prisma.user.findMany({
        where: {
          subscribedToUser: {
            some: {
              subscriberId,
            },
          },
        },
      }),
		},
		subscribedToUser: {
			type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
			resolve: (
				{ id: authorId }: { id: string },
				_,
				{ prisma }: { prisma: DB },
			) => prisma.user.findMany({
        where: {
          userSubscribedTo: {
            some: {
              authorId,
            },
          },
        },
      }),
		},
	}),
});
