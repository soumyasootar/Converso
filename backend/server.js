const express = require("express");
const cors = require("cors");

const app = express();

const dotenv = require("dotenv");
const connectDB = require("./configs/db");
const userRoute = require("./routes/userRoute");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const chatRoute = require("./routes/chatRoute");
const messageRoute = require("./routes/messageRoute");

app.use(express.json()); //to accept JSOn data
app.use(cors());

dotenv.config();

app.get("/", (req, res) => {
  res.send("Welcome to C O N V E R S O api");
});

app.use("/api/user", userRoute);
app.use("/api/chat", chatRoute);
app.use("/api/message", messageRoute);



app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log();
  console.log('🚀🚀🚀'.inverse); 
  console.log(`Server is Listening at http://localhost:${PORT}`.blue.bold);
  connectDB();
});

const io = require("socket.io")(server, {
 /* `pingTimeout: 60000` is setting the maximum time in milliseconds that the server will wait for a
 ping response from the client before considering the connection as lost. In this case, it is set to
 60 seconds (60000 milliseconds). */
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  // user should be connected to his personal socket everytime he opens the app
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});