import type { orpcRouter } from "@back/orpc.router";
import type { orpcSocketRouter } from "@back/orpc.socket.router";
import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { ContractRouterClient } from "@orpc/contract";
import { createORPCVueQueryUtils } from "@orpc/vue-query";
import { experimental_RPCLink as RPCLinkSocket } from "@orpc/client/websocket";

// Create HTTP client for API requests
const link = new RPCLink({
  url: window.location.origin + "/rpc", // Updated path to match Express route
});

// Create the RPC client
const orpcClient: ContractRouterClient<typeof orpcRouter> =
  createORPCClient(link);

// Create Vue Query utils
const orpcUtils = createORPCVueQueryUtils(orpcClient);

// Create WebSocket connection
// Use window.location.host to make it work in different environments
const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
const websocket = new WebSocket(`${wsProtocol}//${window.location.host}/ws`);

// Create WebSocket client
const websocketLink = new RPCLinkSocket({
  websocket,
});

// Create WebSocket RPC client
const orpcClientSocket: ContractRouterClient<typeof orpcSocketRouter> =
  createORPCClient(websocketLink);

export { orpcClient, orpcClientSocket, orpcUtils };
