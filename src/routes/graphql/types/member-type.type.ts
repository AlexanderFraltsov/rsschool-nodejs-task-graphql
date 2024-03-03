import {
	GraphQLFloat,
	GraphQLInt,
	GraphQLNonNull,
	GraphQLObjectType,
} from 'graphql';

import { MemberTypeId } from './member-type-id.type.js';
import { GQLContext } from './context.type.js';

export const MemberType: GraphQLObjectType<{
	id: string,
	discount: number,
	postsLimitPerMonth: number,
}, GQLContext> = new GraphQLObjectType({
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
