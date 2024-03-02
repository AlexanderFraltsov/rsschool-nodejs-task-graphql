import {
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLBoolean,
	GraphQLInt,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { MemberType } from './member-type.type.js';
import { DB } from './db.type.js';

export const ProfileType = new GraphQLObjectType({
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
			type: new GraphQLNonNull(UUIDType),
		},
		memberType: {
			type: MemberType,
			args: {},
			resolve: (
				{ memberTypeId: id }: { memberTypeId: string },
				_,
				{ prisma }: { prisma: DB },
			) => prisma.memberType.findUnique({	where: { id	}	}),
		},
	},
});
