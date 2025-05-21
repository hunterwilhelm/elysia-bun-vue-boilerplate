import { Elysia } from "elysia";
import { orpcRouter } from "./orpc.router";
import { OpenAPIHandler } from '@orpc/openapi/fetch'


const handler = new OpenAPIHandler(orpcRouter)

const app = new Elysia()
  .get("/", () => "Hello from Elysia")
  .ws("/ws", {
    message(ws, message) {
      if (message === "ping") {
        ws.send("pong");
      } else {
        ws.send(message);
      }

    },
  })
  .all('/rpc*', async ({ request }) => {
    console.log(await request.clone().json())
    const { response } = await handler.handle(request, {
      context: {
        headers: Object.fromEntries(request.headers)
      },
      prefix: '/rpc',
    })

    return response ?? new Response('Not Found', { status: 404 })
  })
  .listen(3399);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
