import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import contactRoute from "./routes/contactRoute.js";
import messageRoute from "./routes/messageRoute.js";
import searchRoute from "./routes/searchRoute.js";

// REMOVE these for Vercel, as WebSockets won't work here:
// import { createServer } from "http";
// import { setupSocket } from "./socket/socketSetup.js";
// import { Server } from "socket.io";

dotenv.config();

// Connect to Database
connectDB();

const app = express();
app.use(express.json());

const corsOptions = {
  origin: "*",
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

// HTTP Routing
app.use("/api/auth", authRoute);
app.use("/api/contact", contactRoute);
app.use("/api/message", messageRoute);
app.use("/api/", searchRoute);

// A simple test route to ensure your Vercel rewrite is pointing to the right place
app.get("/", (req, res) => {
  res.send("Express server is running perfectly on Vercel!");
});

// CRITICAL FOR LOCAL TESTING VS VERCEL PRODUCTION:
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`🚀 Local Server running on port ${PORT}`),
  );
}

// CRITICAL FOR VERCEL: Export the app instance
export default app;
