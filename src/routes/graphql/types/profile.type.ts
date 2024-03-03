import {
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLBoolean,
	GraphQLInt,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { MemberType } from './member-type.type.js';
import { DB } from './db.type.js';
import { MemberTypeId } from './member-type-id.type.js';

export const ProfileType: GraphQLObjectType<{
	id: string,
	isMale: boolean,
	yearOfBirth: number,
	userId: string,
	memberTypeId: string,
}, { prisma: DB }> = new GraphQLObjectType({
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
			resolve: (
				{ memberTypeId: id },
				_,
				{ prisma },
			) => prisma.memberType.findUnique({	where: { id	}	}),
		},
	},
});
