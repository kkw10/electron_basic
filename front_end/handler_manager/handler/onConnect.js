module.exports = (socket, win) => {
  const SocketEvent = require('../event/socket_event');

  console.log(`Socket connected. socket ID is ${socket.id}`);

  socket.emit(SocketEvent.HELLO, { message: 'Hello Server!' });

  win.webContents.send(SocketEvent.HELLO, { message: 'Hello Render Process!' });
}
