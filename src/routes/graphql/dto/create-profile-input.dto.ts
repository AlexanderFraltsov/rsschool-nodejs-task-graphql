import { GraphQLBoolean, GraphQLInputObjectType, GraphQLInt, GraphQLNonNull } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { MemberTypeId } from '../types/member-type-id.type.js';

export const CreateProfileInput = new GraphQLInputObjectType({
	name: 'CreateProfileInput',
	fields: {
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
	},
});
