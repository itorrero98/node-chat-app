const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", socket => {
  console.log("New user connected");

  //socket.emit from Admin text "welcom to the chat app"
  //socket.broadcast.emit from Admin text New user joined

  socket.emit("newMessage", {
    from: "Admin",
    text: "Welcome to the chat app",
    createdat: new Date().getTime()
  });

  socket.broadcast.emit("newMessage", {
    from: "Admin",
    text: "New user joined the chat",
    createdat: new Date().getTime()
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  socket.on("createMessage", newMessage => {
    console.log("User email recieved ", newMessage);

    io.emit("newMessage", {
      from: newMessage.from,
      text: newMessage.text,
      createdAt: new Date().getTime()
    });

    // socket.broadcast.emit("newMessage", {
    //   from: newMessage.from,
    //   text: newMessage.text,
    //   createdAt: new Date().getTime()
    // });
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
