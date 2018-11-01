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

  socket.emit("newMessage", {
    from: "Issiac",
    text: "Group meeting at 3pm",
    createdAt: 123
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  socket.on("createMessage", newMessage => {
    console.log("User email recieved ", newMessage);
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
