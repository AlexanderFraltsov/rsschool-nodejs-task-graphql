import {
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLBoolean,
	GraphQLInt,
} from 'graphql';

import { UUIDType } from './uuid.js';
import { MemberType } from './member-type.type.js';
import { GQLContext } from './context.type.js';
import { MemberTypeId } from './member-type-id.type.js';
import { getDataLoader } from '../utils/get-data-loader.util.js';

export const ProfileType: GraphQLObjectType<{
	id: string,
	isMale: boolean,
	yearOfBirth: number,
	userId: string,
	memberTypeId: string,
}, GQLContext> = new GraphQLObjectType({
	name: 'Profile',
	fields: {
		id: {
			type: new GraphQLNonNull(UUIDType),
		},
		isMale: {
			type: new GraphQLNonNull(GraphQLBoolean),
		},
		yearOfBirth: {
			type: new GraphQLNonNull(GraphQLInt),
		},
		userId: {
			type: new GraphQLNonNull(UUIDType),
		},
		memberTypeId: {
			type: new GraphQLNonNull(MemberTypeId),
		},
		memberType: {
			type: MemberType,
			args: {},
			resolve: async (
				{ memberTypeId: id },
				_,
				{ prisma, dataLoaders },
				info,
			) => {
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
	},
});
