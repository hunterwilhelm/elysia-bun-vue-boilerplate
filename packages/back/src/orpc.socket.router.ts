import type { IncomingHttpHeaders } from 'node:http';
import { os } from '@orpc/server';
import { z } from 'zod';

// Simple ping handler for WebSocket
export const ping = os
  .$context<{ headers: IncomingHttpHeaders }>()
  .input(z.object({
    id: z.number().int().min(1),
  }))
  .handler(async ({ input, context }) => {
    // Return a simple pong response
    return 'pong';
  });

// Export the socket router with our handlers
export const orpcSocketRouter = {
  ping,
};
