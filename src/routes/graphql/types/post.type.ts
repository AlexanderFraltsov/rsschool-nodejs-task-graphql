import {
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLString,
} from 'graphql';

import { UUIDType } from './uuid.js';
import { GQLContext } from './context.type.js';

export const PostType: GraphQLObjectType<{
	id: string,
	title: string,
	content: string,
	authorId: string,
}, GQLContext> = new GraphQLObjectType({
	name: 'Post',
	fields: {
		id: {
			type: new GraphQLNonNull(UUIDType),
		},
		title: {
			type: new GraphQLNonNull(GraphQLString),
		},
		content: {
			type: new GraphQLNonNull(GraphQLString),
		},
		authorId: {
			type: new GraphQLNonNull(UUIDType),
		},
	},
});
