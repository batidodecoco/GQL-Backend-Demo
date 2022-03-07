import { extendType, objectType } from "nexus";

export const HelloWorldQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('helloWorld', {
      type: 'HelloWorld',
      resolve: async (_, __, ctx) => {
        return {
          message: "Hello World",
          success: true,
        }
      },
    });
  }
})

export const HelloWorld = objectType({
  name: "HelloWorld",
  definition(t) {
    t.string('message')
    t.boolean('success')
  }
})