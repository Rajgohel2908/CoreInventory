import { NextApiRequest, NextApiResponse } from "next";
import { Server as NetServer } from "http";
import { Server as SocketIOServer } from "socket.io";

export type NextApiResponseWithSocket = NextApiResponse & {
  socket: any & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseWithSocket) => {
  if (!res.socket.server.io) {
    console.log("*First use, starting socket.io");
    const io = new SocketIOServer(res.socket.server, {
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
        console.log(`User ${userId} joined room ${userId}`);
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
      });
    });

    res.socket.server.io = io;
  } else {
    console.log("socket.io already running");
  }
  res.end();
};

export default ioHandler;
