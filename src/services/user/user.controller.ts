import { extendType, nonNull, objectType, stringArg } from "nexus";

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
}

const users: IUser[] = [];

export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('users', { // REST: GET /users
      type: 'User',
      resolve: async (_, __, ctx) => {
        return users;
      },
    });
    t.field('userById', { // REST: GET /users/:id
      type: 'User',
      args: {
        id: nonNull(stringArg())
      },
      resolve: async (_, { id }, ctx) => {
        return users.find(user => user.id === id) ?? null;
      }
    })
  }
});

export const UserMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createUser', { // REST: POST /users
      type: 'CreateUserResponse',
      args: {
        firstName: nonNull(stringArg()),
        lastName: nonNull(stringArg()),
        email: nonNull(stringArg()),
        telephone: nonNull(stringArg()),
      },
      resolve: async (_, args, ctx) => {
        const user: IUser = {
          id: users.length.toString(),
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          telephone: args.telephone,
        };

        users.push(user);

        return {
          success: true,
          message: "El usuario ha sido creado con éxito",
          user
        }
      }
    })
  }
});

export const User = objectType({
  name: "User",
  definition(t) {
    t.id('id')
    t.string('firstName')
    t.string('lastName')
    t.string('email')
    t.string('telephone')
  }
})

export const CreateUserResponse = objectType({
  name: "CreateUserResponse",
  definition(t) {
    t.boolean('success')
    t.string('message')
    t.field('user', {
      type: 'User',
    })
  }
})