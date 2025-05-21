import { orpcRouter } from '@back/orpc.router';
import { createORPCClient } from '@orpc/client';
import { RPCLink } from '@orpc/client/fetch';
import type { ContractRouterClient } from '@orpc/contract';
import { createORPCVueQueryUtils } from '@orpc/vue-query';

const link = new RPCLink({
  url: window.location.origin + '/api/rpc',
});

// Create a client for your router
// const orpcClient: RouterClient<typeof orpcRouter> = createORPCClient(link);
const orpcClient: ContractRouterClient<typeof orpcRouter> = createORPCClient(link)


const orpcUtils = createORPCVueQueryUtils(orpcClient)

export { orpcClient, orpcUtils };
