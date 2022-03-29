/** @format */
const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");
// const { Server } = require("socket.io");
const {
  addUsers,
  getUser,
  removeUser,
  getUsersInRoom,
} = require("./helper/index");
const router = require("./routes/index.routes");

const PORT = process.env.PORT || 8080;
const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

// const io = new Server(PORT, {
//   cors: {
//     origin: "*",
//   },
// });

app.use(router);

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUsers({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.emit("message", {
      user: "admin",
      text: `${user.name} welcom to the room ${user.room}`,
    });
    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `${user.name} has joined!`,
    });

    socket.join(user.room);

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
    callback();
  });

  socket.on("sendMessage", (message) => {
    if (message) {
      const user = getUser(socket.id);
      console.log(user);

      io.to(user.room).emit("message", { user: user.name, text: message });
    }
    // callback();
  });

  socket.on("disconnect", () => {
    console.log("disconn");
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} has left.`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

server.listen(PORT, () => {
  console.log(`listening to PORT : ${PORT}`);
});
