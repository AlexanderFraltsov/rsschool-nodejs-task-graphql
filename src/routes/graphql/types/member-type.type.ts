import {
	GraphQLEnumType,
	GraphQLFloat,
	GraphQLInt,
	GraphQLNonNull,
	GraphQLObjectType,
} from 'graphql';

export const MemberType = new GraphQLObjectType({
	name: 'MemberType',
	fields: {
		id: {
			type: new GraphQLNonNull(new GraphQLEnumType({
				name: 'MemberTypeId',
				values: {
					BASIC: { value: 'basic' },
					BUSINESS: { value: 'business' },
				}
			})),
		},
		discount: {
			type: new GraphQLNonNull(GraphQLFloat),
		},
		postsLimitPerMonth: {
			type: new GraphQLNonNull(GraphQLInt),
		},
	},
});
