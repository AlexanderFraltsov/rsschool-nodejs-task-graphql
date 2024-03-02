import {
	GraphQLFloat,
	GraphQLInt,
	GraphQLNonNull,
	GraphQLObjectType,
} from 'graphql';

import { DB } from './db.type.js';
import { MemberTypeId } from './member-type-id.type.js';

export const MemberType: GraphQLObjectType<{
	id: string,
	discount: number,
	postsLimitPerMonth: number,
}, { prisma: DB }> = new GraphQLObjectType({
	name: 'MemberType',
	fields: {
		id: {
			type: new GraphQLNonNull(MemberTypeId),
		},
		discount: {
			type: new GraphQLNonNull(GraphQLFloat),
		},
		postsLimitPerMonth: {
			type: new GraphQLNonNull(GraphQLInt),
		},
	},
});
