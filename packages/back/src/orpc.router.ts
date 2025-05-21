import type { IncomingHttpHeaders } from 'node:http'
import { ORPCError, os } from '@orpc/server'
import { z } from 'zod'

const PlanetSchema = z.object({
  id: z.number().int().min(1),
  name: z.string(),
  description: z.string().optional(),
})

export const ping = os
  .handler(async () => {
    return 'pong'
  })

export const listPlanet = os
  .input(
    z.object({
      limit: z.number().int().min(1).max(100).optional(),
      cursor: z.number().int().min(0).default(0),
    }),
  )
  .output(z.array(PlanetSchema))
  .handler(async ({ input }) => {
    // your list code here
    return [{ id: 1, name: 'name' }]
  })

export const findPlanet = os
  .input(PlanetSchema.pick({ id: true }))
  .handler(async ({ input }) => {
    // your find code here
    return { id: 1, name: 'name' }
  })

export const createPlanet = os
  .$context<{ headers: IncomingHttpHeaders }>()
  // .use(({ context, next }) => {
  //   const user = parseJWT(context.headers.authorization?.split(' ')[1])

  //   if (user) {
  //     return next({ context: { user } })
  //   }

  //   throw new ORPCError('UNAUTHORIZED')
  // })
  .input(PlanetSchema.omit({ id: true }))
  .handler(async ({ input, context }) => {
    // your create code here
    return { id: 1, name: 'name' }
  })

export const orpcRouter = {
  planet: {
    list: listPlanet,
    find: findPlanet,
    create: createPlanet
  }
}
