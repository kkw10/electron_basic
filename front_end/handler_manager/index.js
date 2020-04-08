const SocketEvent = require('./event/socket_event');

module.exports = [
  {
    event: SocketEvent.CONNECT,
    handler: require('./handler/onConnect'),
  },
  {
    event: SocketEvent.CONNECT_TIMEOUT,
    handler: require('./handler/onConnectTimeout'),
  },
  {
    event: SocketEvent.DISCONNECT,
    handler: require('./handler/onDisconnect'),
  },
  {
    event: SocketEvent.RECONNECTING,
    handler: require('./handler/onReconnecting'),
  },
  {
    event: SocketEvent.RECONNECT_FAILED,
    handler: require('./handler/onReconnectFailed'),
  },
  {
    event: SocketEvent.RECONNECT_ERROR,
    handler: require('./handler/onReconnectError'),
  },
  {
    event: SocketEvent.PING,
    handler: require('./handler/onPing'),
  },
  {
    event: SocketEvent.PONG,
    handler: require('./handler/onPong'),
  },
  {
    event: SocketEvent.HELLO,
    handler: require('./handler/onHello'),
  }
];