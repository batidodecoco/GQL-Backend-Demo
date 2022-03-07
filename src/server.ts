import { ApolloServer } from 'apollo-server'
import { schema } from './schema/schema'

export const server = new ApolloServer({
  schema,
  cors: true,
  //context: ({ req }) => context(req),
})