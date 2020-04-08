exports.createSocket = (io, socketURL, socketOptions) => {
  return io(socketURL, socketOptions);
};

exports.addHandler = (socket, win, handlerManager) => {
  handlerManager.forEach((handler) => {
    socket.on(handler.event, handler.handler.bind(null, socket, win));
  });
};