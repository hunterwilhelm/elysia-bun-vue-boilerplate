import type { createTRPCVueQueryClient } from '@falcondev-oss/trpc-vue-query';
import { inject } from 'vue';
import type { AppRouter } from '@back/index';

export function useTRPC () {
  return inject('trpc') as ReturnType<
    typeof createTRPCVueQueryClient<AppRouter>
  >;
}
