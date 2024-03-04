import { GraphQLBoolean, GraphQLInputObjectType, GraphQLInt } from 'graphql';
import { MemberTypeId } from '../types/member-type-id.type.js';

export const ChangeProfileInput = new GraphQLInputObjectType({
	name: 'ChangeProfileInput',
	fields: {
		isMale: {
			type: GraphQLBoolean,
		},
		yearOfBirth: {
			type: GraphQLInt,
		},
		memberTypeId: {
			type: MemberTypeId,
		},
	},
});
