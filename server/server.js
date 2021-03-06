const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const { generateMessage } = require("./utils/message");

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

  socket.emit(
    "newMessage",
    generateMessage("Admin", "Welcome to the chat app!")
  );

  socket.broadcast.emit(
    "newMessage",
    generateMessage("Admin", "New user joined")
  );

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  socket.on("createMessage", (newMessage, callback) => {
    console.log("User email recieved ", newMessage);

    io.emit("newMessage", generateMessage(newMessage.from, newMessage.text));

    callback("This is from the server");
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
