import { store } from "@/main";
import { setActiveUsers } from "@/state/socketState";
import { io, Socket } from "socket.io-client";

export let socket: Socket;

export const initSocket = (token: string) => {
  socket = io("https://spot-delirious-girdle.glitch.me", { query: { token } });
  socket.on("connect", () => {
    console.log("connected to server");
  });

  socket.on("activeUsers", (data) => {
    store.dispatch(setActiveUsers(data));
  });

  socket.on("notifications", (data) => {
    console.log(data);
  });

  socket.emit("userLogged");
  socket.emit("listenActiveUsers");
};

export const disconnetSocket = () => {
  if (socket) {
    console.log("disconnected from server");
    socket.disconnect();
  }
};
