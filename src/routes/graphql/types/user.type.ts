import {
	GraphQLFloat,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLString,
} from 'graphql';
import { UUIDType } from './uuid.js';

export const UserType = new GraphQLObjectType({
	name: 'User',
	fields: {
		id: {
			type: new GraphQLNonNull(UUIDType),
		},
		name: {
			type: new GraphQLNonNull(GraphQLString),
		},
		balance: {
			type: new GraphQLNonNull(GraphQLFloat),
		},
	},
});
