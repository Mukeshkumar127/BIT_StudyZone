import express, { urlencoded } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import userRoute from "./route/user.route.js";
import notesRoute from "./route/notes.route.js";
import chatRoute from "./route/chat.route.js";
import Chat from "./model/chat.model.js";

dotenv.config();

const allowedOrigins = [
  "http://localhost:5173",
  "https://bit-studyzone-59sl.onrender.com",
];

const app = express();
const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

// middleware
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// routes
app.use("/user", userRoute);
app.use("/notes", notesRoute);
app.use("/chat", chatRoute);

app.get('/hero', (req,res) => {
    res.send('MUKESH');
});


// http + socket setup
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});


io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("sendMessage", async (data) => {
    try {
      const newMsg = await Chat.create(data);
      io.emit("receiveMessage", newMsg);
    } catch (err) {
      console.log("Chat error:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// database connection
mongoose
  .connect(URI)
  .then(() => {
    console.log("Connected to MongoDB");
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });