/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify';
import router from '../router';

import { createTRPCVueQueryClient } from '@falcondev-oss/trpc-vue-query';
import { useQueryClient, VueQueryPlugin } from '@tanstack/vue-query';
import { httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@back/index';
// Types
import type { App } from 'vue';

export function registerPlugins (app: App) {
  app.use(vuetify).use(router);

  app.use(VueQueryPlugin);
  app.use({
    install (app) {
      const queryClient = app.runWithContext(useQueryClient);
      const trpc = createTRPCVueQueryClient<AppRouter>({
        queryClient,
        trpc: {
          links: [
            httpBatchLink({
              url: '/api/trpc',
            }),
          ],
        },
      });

      app.provide('trpc', trpc);
    },
  });
}
