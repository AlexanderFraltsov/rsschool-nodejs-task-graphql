import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType } from 'graphql';

import { DB } from '../types/db.type.js';
import { UserType } from '../types/user.type.js';
import { PostType } from '../types/post.type.js';
import { UUIDType } from '../types/uuid.js';
import { ProfileType } from '../types/profile.type.js';
import { CreateUserInput } from '../dto/create-user-input.dto.js';
import { CreatePostInput } from '../dto/create-post-input.dto.js';
import { ChangeUserInput } from '../dto/change-user-input.dto.js';
import { ChangePostInput } from '../dto/change-post-input.dto.js';
import { CreateProfileInput } from '../dto/create-profile-input.dto.js';
import { ChangeProfileInput } from '../dto/change-profile-input.dto.js';

export const rootMutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		createUser: {
			type: UserType,
			args: {
				dto: {
					type: new GraphQLNonNull(CreateUserInput),
				},
			},
			resolve: (
				_,
				{ dto }: { dto: { name: string; balance: number } },
				{ prisma }: { prisma: DB }
			) => prisma.user.create({ data: dto }),
		},
		changeUser: {
			type: UserType,
			args: {
				id: { type: new GraphQLNonNull(UUIDType) },
				dto: { type: new GraphQLNonNull(ChangeUserInput) },
			},
			resolve: (
				_,
				{ id, dto }: { id: string; dto: { name?: string; balance?: number } },
				{ prisma }: { prisma: DB }
			) => prisma.user.update({ where: { id }, data: dto }),
		},
		deleteUser: {
			type: GraphQLBoolean,
			args: {
				id: {
					type: new GraphQLNonNull(UUIDType),
				},
			},
			resolve: async (_, { id } : { id: string }, { prisma }: { prisma: DB })	=> {
				await prisma.user.delete({ where: { id } });
				return true;
			},
		},
		subscribeTo: {
			type: UserType,
			args: {
				userId: {
					type: new GraphQLNonNull(UUIDType),
				},
				authorId: {
					type: new GraphQLNonNull(UUIDType),
				},
			},
			resolve: async (
				_,
				{ userId, authorId } : { userId: string; authorId: string },
				{ prisma }: { prisma: DB },
			)	=> {
				return await prisma.user.update({
					where: {
						id: userId,
					},
					data: {
						userSubscribedTo: {
							create: {
								authorId,
							},
						},
					},
				});
			},
		},
		unsubscribeFrom: {
			type: GraphQLBoolean,
			args: {
				userId: {
					type: new GraphQLNonNull(UUIDType),
				},
				authorId: {
					type: new GraphQLNonNull(UUIDType),
				},
			},
			resolve: async (
				_,
				{ userId, authorId } : { userId: string; authorId: string },
				{ prisma }: { prisma: DB },
			)	=> {
				await prisma.subscribersOnAuthors.delete({
					where: {
						subscriberId_authorId: {
							subscriberId: userId,
							authorId,
						},
					},
				});
				return true;
			},
		},
		createPost: {
			type: PostType,
			args: {
				dto: {
					type: new GraphQLNonNull(CreatePostInput),
				},
			},
			resolve: (
				_,
				{ dto }: { dto: { title: string; content: string; authorId: string } },
				{ prisma }: { prisma: DB }
			) => prisma.post.create({ data: dto }),
		},
		changePost: {
			type: PostType,
			args: {
				id: { type: new GraphQLNonNull(UUIDType) },
				dto: { type: new GraphQLNonNull(ChangePostInput) },
			},
			resolve: (
				_,
				{ id, dto }: { id: string; dto: { title?: string; content?: string } },
				{ prisma }: { prisma: DB }
			) => prisma.post.update({ where: { id }, data: dto }),
		},
		deletePost: {
			type: GraphQLBoolean,
			args: {
				id: {
					type: new GraphQLNonNull(UUIDType),
				},
			},
			resolve: async (_, { id } : { id: string }, { prisma }: { prisma: DB })	=> {
				await prisma.post.delete({ where: { id } });
				return true;
			},
		},
		createProfile: {
			type: ProfileType,
			args: {
				dto: {
					type: new GraphQLNonNull(CreateProfileInput),
				},
			},
			resolve: (
				_,
				{ dto }: {
					dto: {
						userId: string;
						memberTypeId:	string;
						isMale: boolean;
						yearOfBirth: number;
					};
				},
				{ prisma }: { prisma: DB }
			) => prisma.profile.create({ data: dto }),
		},
		changeProfile: {
			type: ProfileType,
			args: {
				id: { type: new GraphQLNonNull(UUIDType) },
				dto: { type: new GraphQLNonNull(ChangeProfileInput) },
			},
			resolve: (
				_,
				{ id, dto }: {
					id: string;
					dto: {
						memberTypeId?:	string;
						isMale?: boolean;
						yearOfBirth?: number;
					};
				},
				{ prisma }: { prisma: DB }
			) => prisma.profile.update({ where: { id }, data: dto }),
		},
		deleteProfile: {
			type: GraphQLBoolean,
			args: {
				id: {
					type: new GraphQLNonNull(UUIDType),
				},
			},
			resolve: async (_, { id } : { id: string }, { prisma }: { prisma: DB })	=> {
				await prisma.profile.delete({ where: { id } });
				return true;
			},
		},
	},
});
