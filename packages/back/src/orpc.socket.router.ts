import type { IncomingHttpHeaders } from 'node:http'
import { ORPCError, os } from '@orpc/server'
import { z } from 'zod'


export const ping = os
  .$context<{ headers: IncomingHttpHeaders }>()
  .input(z.object({
    id: z.number().int().min(1),
  }))
  .handler(async ({ input, context }) => {
    return 'pong'
  })

export const orpcSocketRouter = {
  ping,
}
