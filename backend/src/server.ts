import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import { createServer } from "http";
import { setupSocket } from "./socket/socketSetup.js";
import { Server } from "socket.io";

dotenv.config();

// Connect to Database
connectDB();

const app = express();
const httpServer = createServer(app);
app.use(express.json());

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

setupSocket(io);

app.use("/api/auth", authRoute);

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
