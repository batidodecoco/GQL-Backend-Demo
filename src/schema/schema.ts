import { fieldAuthorizePlugin, makeSchema } from 'nexus'
import { join } from 'path'
import * as types from './controllers'

const schema = makeSchema({
  types,
  outputs: {
    typegen: join(__dirname, '..', '..', 'nexus-typegen.ts'),
    schema: join(__dirname, '..', '..', 'schema.graphql')
  },
  plugins: [
    fieldAuthorizePlugin()
  ],
})

export { schema }