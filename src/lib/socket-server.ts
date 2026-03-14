import { Server as NetServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { NextApiResponse } from "next";

export type NextApiResponseWithSocket = NextApiResponse & {
  socket: any & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

export const initSocket = (server: NetServer) => {
  const io = new SocketIOServer(server, {
    path: "/api/socket/io",
    addTrailingSlash: false,
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("join-room", (userId: string) => {
      socket.join(userId);
      console.log(`User ${userId} joined room`);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return io;
};
