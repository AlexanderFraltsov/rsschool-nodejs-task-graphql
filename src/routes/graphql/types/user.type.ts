import {
	GraphQLFloat,
	GraphQLList,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLString,
} from 'graphql';

import { UUIDType } from './uuid.js';
import { PostType } from './post.type.js';
import { GQLContext } from './context.type.js';
import { ProfileType } from './profile.type.js';
import { getDataLoader } from '../utils/get-data-loader.util.js';

export const UserType: GraphQLObjectType<{
	id: string;
	name: string;
	balance: number;
}, GQLContext> = new GraphQLObjectType({
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
			resolve: async (
				{ id: userId },
				_,
				{ prisma, dataLoaders },
				info,
			) => {
				const findMany = async (ids: string[]) => {
					const rows = await prisma.profile.findMany({ where: { userId: { in: ids } } });
					const sortedInIdsOrder = ids.map((id: string) => rows.find(x => x.userId === id));
					return sortedInIdsOrder;
				}
				const dl = await getDataLoader<({
					id: string;
					isMale: boolean;
					yearOfBirth: number;
					userId: string;
					memberTypeId: string;
				} | undefined)>(dataLoaders, info.fieldNodes, findMany);

				return dl.load(userId);
			},
		},
		posts: {
			type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PostType))),
			resolve: async (
				{ id: authorId },
				_,
				{ prisma, dataLoaders },
				info,
			) => {
				const findMany = async (ids: string[]) => {
					const rows = await prisma.post.findMany({ where: { authorId: { in: ids } } });
					const sortedInIdsOrder = ids.map((id: string) => rows.filter(x => x.authorId === id));
					return sortedInIdsOrder;
				}
				const dl = await getDataLoader<({
					id: string;
					title: string;
					content: string;
					authorId: string;
				}[])>(dataLoaders, info.fieldNodes, findMany);

				return dl.load(authorId);
			},
		},
		userSubscribedTo: {
			type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
			resolve: async (
				{ id: subscriberId },
				_,
				{ prisma, dataLoaders },
				info,
			) => {
				const findMany = async (ids: string[]) => {
					const rows = await prisma.user.findMany({
							where: {
								subscribedToUser: {
									some: {
										subscriberId: { in : ids},
									},
								},
							},
							include: { subscribedToUser: true },
						});

					const sortedInIdsOrder = ids.map((id: string) => rows.filter(x => x.subscribedToUser.some(({subscriberId}) => subscriberId === id)));
					return sortedInIdsOrder;
				}
				const dl = await getDataLoader<({
					id: string;
					name: string;
					balance: number;
					subscribedToUser: { subscriberId: string; authorId: string; }[];
				})[]>(dataLoaders, info.fieldNodes, findMany);

				return dl.load(subscriberId);
			},
		},
		subscribedToUser: {
			type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
			resolve: async (
				{ id: authorId },
				_,
				{ prisma, dataLoaders },
				info,
			) => {
				const findMany = async (ids: string[]) => {
					const rows = await prisma.user.findMany({
							where: {
								userSubscribedTo: {
									some: {
										authorId: { in: ids},
									},
								},
							},
							include: { userSubscribedTo: true },
						});

					const sortedInIdsOrder = ids.map((id: string) => rows.filter(x => x.userSubscribedTo.some(({authorId}) => authorId === id)));
					return sortedInIdsOrder;
				}

				const dl = await getDataLoader<({
					id: string;
					name: string;
					balance: number;
					userSubscribedTo: {
						subscriberId: string;
						authorId: string;
					}[];
				}[])>(dataLoaders, info.fieldNodes, findMany);

				return dl.load(authorId);
			},
		},
	}),
});
