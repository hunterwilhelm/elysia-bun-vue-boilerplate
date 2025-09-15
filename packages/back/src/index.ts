import { Hono } from 'hono'
import { RPCHandler } from '@orpc/server/fetch'
import { orpcRouter } from './orpc.router'

const app = new Hono()

const handler = new RPCHandler(orpcRouter)

app.use('/rpc/*', async (c, next) => {
  const { matched, response } = await handler.handle(c.req.raw, {
    prefix: '/rpc',
    context: {
      headers: c.req.header(),
    } // Provide initial context if needed
  })

  if (matched) {
    return c.newResponse(response.body, response)
  }

  await next()
})

export default app