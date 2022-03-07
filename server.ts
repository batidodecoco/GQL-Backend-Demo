import { server } from './src/server';

(async () => {
  const { url } = await server.listen()

  console.log(`🚀 Server ready at ${url}`)
})().catch(console.error)