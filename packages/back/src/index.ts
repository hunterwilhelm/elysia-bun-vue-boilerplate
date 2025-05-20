import { Elysia } from "elysia";

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
  .listen(3399);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
