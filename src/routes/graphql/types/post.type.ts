import {
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLString,
} from 'graphql';
import { DB } from './db.type.js';
import { UUIDType } from './uuid.js';

export const PostType: GraphQLObjectType<{
	id: string,
	title: string,
	content: string,
	authorId: string,
}, { prisma: DB }> = new GraphQLObjectType({
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
