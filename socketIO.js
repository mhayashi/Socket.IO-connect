var io = require('socket.io');

exports.socketIO = function(server) {
  var options, connectionCallback;
  if (arguments.length === 2) {
    if (typeof arguments[1] === "function") {
      connectionCallback = arguments[1];
      options = {};
    } else {
      options = arguments[1];
      connectionCallback = function () {};
    }
  } else if (arguments.length === 3){
    options = arguments[1];
    connectionCallback = arguments[2];
  } else {
    throw new Error("Wrong number of arguments");
  }

  var listener;
  return function(req, res, next) {
    if (!listener) {
      listener = io.listen(server, options);
      listener.on('connection', function(client) {
        connectionCallback(client);
      });
    }
    next();
  };
};
