import type { orpcRouter } from "@back/orpc.router";
import type { orpcSocketRouter } from "@back/orpc.socket.router";
import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { ContractRouterClient } from "@orpc/contract";
import { createORPCVueQueryUtils } from "@orpc/vue-query";

import { experimental_RPCLink as RPCLinkSocket } from "@orpc/client/websocket";

const link = new RPCLink({
  url: window.location.origin + "/api/rpc",
});

// Create a client for your router
// const orpcClient: RouterClient<typeof orpcRouter> = createORPCClient(link);
const orpcClient: ContractRouterClient<typeof orpcRouter> =
  createORPCClient(link);

const orpcUtils = createORPCVueQueryUtils(orpcClient);

const websocket = new WebSocket(`ws://localhost:3399/ws`);
const websocketLink = new RPCLinkSocket({
  websocket,
});

const orpcClientSocket: ContractRouterClient<typeof orpcSocketRouter> =
  createORPCClient(websocketLink);

export { orpcClient, orpcClientSocket, orpcUtils };
