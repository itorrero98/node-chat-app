var socket = io();

socket.on("connect", function() {
  console.log("connected to server");
});

socket.on("disconnect", function() {
  console.log("Disconnected from server");
});

socket.on("newMessage", function(details) {
  console.log("Got new message ", details);

  var li = jQuery("<li></li>");
  li.text(`${details.from}: ${details.text}`);

  jQuery("#messages").append(li);
});

jQuery("#message-form").on("submit", function(e) {
  e.preventDefault();

  socket.emit(
    "createMessage",
    {
      from: "User",
      text: jQuery("[name=Message]").val()
    },
    function() {}
  );
});
