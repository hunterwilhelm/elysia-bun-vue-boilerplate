import { Elysia } from "elysia";

const app = new Elysia().get("/", () => "Hello from Elysia").listen(3399);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
