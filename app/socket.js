import {io} from 'socket.io-client';

export const socket = () => io("wss://client-api-2-74b1891ee9f9.herokuapp.com", {
  transports: ["websocket", "polling"] // use WebSocket first, if available
});
