import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import contactRoute from "./routes/contactRoute.js";
import messageRoute from "./routes/messageRoute.js";
import searchRoute from "./routes/searchRoute.js";
import { createServer } from "http";
import { setupSocket } from "./socket/socketSetup.js";
import { Server } from "socket.io";

dotenv.config();

// Connect to Database
connectDB();

const app = express();
app.use(express.json());

//app.use(cookieParser());

const corsOptions = {
  origin: "*", // Allow only this origin
  methods: "GET,POST,PUT,DELETE", // Allowed HTTP methods
  credentials: true, // Allow cookies to be sent
};

app.use(cors(corsOptions));
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

setupSocket(io);

app.use("/api/auth", authRoute);
app.use("/api/contact", contactRoute);
app.use("/api/message", messageRoute);
app.use("/api/", searchRoute);

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
