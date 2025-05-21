import { RPCHandler } from "@orpc/server/fetch";
import { Elysia } from "elysia";
import { orpcRouter } from "./orpc.router";
import { experimental_RPCHandler as SocketRPCHandler } from '@orpc/server/bun-ws'
import { orpcSocketRouter } from "./orpc.socket.router";


const handler = new RPCHandler(orpcRouter);

const socketHandler = new SocketRPCHandler(orpcSocketRouter)


const elysiaApp = new Elysia()
  .all("/rpc*", async ({ request }: { request: Request }) => {
    const { response } = await handler.handle(request, {
      prefix: "/rpc",
      context: {
        headers: Object.fromEntries(request.headers),
      },
    });

    return response ?? new Response("Not Found", { status: 404 });
  })
  .ws("/ws", {
    message(ws, message) {
      try {
        socketHandler.message(
          ws,
          typeof message != 'string' ? JSON.stringify(message) : message, 
          {
            context: {
              headers: Object.fromEntries([]),
            }
          }
        )
      }
      catch (error) {
        console.error('PROXY TRPC WS: message error', error)
      }
    },
    close(ws) {
      socketHandler.close(ws)
    }
  })
  .listen(3399);

console.log(`🦊 Elysia is running at http://localhost:3399`);

