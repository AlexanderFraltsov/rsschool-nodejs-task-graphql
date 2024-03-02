import {
	GraphQLFloat,
	GraphQLList,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLString,
} from 'graphql';
import { DB } from './db.type.js';
import { UUIDType } from './uuid.js';
import { PostType } from './post.type.js';
import { ProfileType } from './profile.type.js';

export const UserType: GraphQLObjectType<{
	id: string,
	name: string,
	balance: string,
}, { prisma: DB }> = new GraphQLObjectType({
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
				{ id: userId },
				_,
				{ prisma },
			) => prisma.profile.findUnique({	where: { userId	}	}),
		},
		posts: {
			type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PostType))),
			resolve: (
				{ id: authorId },
				_,
				{ prisma },
			) => prisma.post.findMany({ where: { authorId } }),
		},
		userSubscribedTo: {
			type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
			resolve: (
				{ id: subscriberId },
				_,
				{ prisma },
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
				{ id: authorId },
				_,
				{ prisma },
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
