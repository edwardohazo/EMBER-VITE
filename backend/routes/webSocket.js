const WebSocket = (io) => {
  io.on('connection', (socket) => {
    socket.on('join_room', (data) => {
      console.log("DATA:");
      socket.join(data);
      console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });
    socket.on('send_message', (data) => {
      socket.to(data.room).emit("recieve_message", data);
    });
    socket.on('disconnect', () => {
      console.log(`User ${socket.id} disconnected`);
    });
  });
};
export { WebSocket };
