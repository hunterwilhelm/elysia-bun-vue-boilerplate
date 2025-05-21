import { Elysia, t as T } from "elysia";

import { compile as c } from "@elysiajs/trpc";
import { initTRPC } from "@trpc/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { z } from "zod";

const t = initTRPC.create();
const p = t.procedure;

const router = t.router({
  greet: p
    // 💡 Using Zod
    .input(z.object({
			name: z.string(),
		}))
    // 💡 Using Elysia's T
    .query(({ input }) => input),
});

export type AppRouter = typeof router;

const app = new Elysia()
  .get("/", () => "Hello World")
  .all("/trpc/*", async (opts) => {
		console.log(opts)
    const res = await fetchRequestHandler({
      endpoint: "/trpc",
      router: router,
      req: opts.request,
      createContext() {
        return {};
      },
    });

    return res;
  })
  .listen(3399);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
