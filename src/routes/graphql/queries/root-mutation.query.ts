import { GraphQLBoolean, GraphQLObjectType } from 'graphql';

export const rootMutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		createUser: {
			type: GraphQLBoolean,
			resolve: () => true,
		},
	},
});
