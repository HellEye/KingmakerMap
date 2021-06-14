"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var settings = _interopRequireWildcard(require("./serverSettings"));

var _db = _interopRequireDefault(require("./db/db"));

var _socket = _interopRequireDefault(require("socket.io"));

var _http = _interopRequireDefault(require("http"));

var _path = _interopRequireDefault(require("path"));

var _bson = require("bson");

/* eslint-disable import/first */
require("babel-polyfill");

require("babel-core/register");

var app = (0, _express.default)();

var server = _http.default.createServer(app);

var io = (0, _socket.default)(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
  allowEIO3: true
});
var users = [];

var getUser = function getUser(id) {
  var foundUser = users.find(function (v) {
    return v.id === id;
  });
  return foundUser ? foundUser.name : "<undefined>";
};

io.on("connection", function (socket) {
  console.info("connected from " + socket.id);
  socket.on("greet", function (_ref) {
    var clientName = _ref.clientName;
    if (getUser(socket.id) === "<undefined>") users.push({
      id: socket.id,
      name: clientName
    });
  }); //CRUD calls to db

  socket.on("find", function (_ref2) {
    var collection = _ref2.collection,
        findObj = _ref2.findObj,
        options = _ref2.options,
        causedBy = _ref2.causedBy,
        projection = _ref2.projection;
    console.info("received find from ".concat(getUser(socket.id), " with "), collection, findObj, projection);
    if (findObj && "_id" in findObj) findObj._id = (0, _bson.ObjectID)(findObj._id);

    _db.default.find(findObj, collection, options, projection).then(function (result) {
      var data = {
        collection: collection,
        result: result,
        findObj: findObj,
        options: options,
        operation: "find",
        causedBy: causedBy
      };
      io.to(socket.id).emit("found", data);
    });
  });
  socket.on("delete", /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(_ref3) {
      var collection, findObj, options, idToChange;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              collection = _ref3.collection, findObj = _ref3.findObj, options = _ref3.options;
              console.info("received delete from ".concat(getUser(socket.id), " with "), collection, findObj);
              if (findObj && "_id" in findObj) findObj._id = (0, _bson.ObjectID)(findObj._id);
              _context.next = 5;
              return getIdToChange(findObj, collection);

            case 5:
              idToChange = _context.sent;

              _db.default.delete(findObj, collection, options).then(makeReply("delete", collection, findObj, options, idToChange));

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref4.apply(this, arguments);
    };
  }());
  socket.on("update", /*#__PURE__*/function () {
    var _ref6 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(_ref5) {
      var collection, findObj, newObj, options, idToChange;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              collection = _ref5.collection, findObj = _ref5.findObj, newObj = _ref5.newObj, options = _ref5.options;
              console.info("received update from ".concat(getUser(socket.id), " with "), collection, findObj, newObj);
              _context2.next = 4;
              return getIdToChange(findObj, collection);

            case 4:
              idToChange = _context2.sent;

              _db.default.update(findObj, newObj, collection, options).then(makeReply("update", collection, findObj, options, idToChange, newObj));

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x2) {
      return _ref6.apply(this, arguments);
    };
  }());
  socket.on("insert", function (_ref7) {
    var collection = _ref7.collection,
        newObj = _ref7.newObj,
        options = _ref7.options;
    console.info("received insert from ".concat(getUser(socket.id), " with "), collection);

    _db.default.insert(newObj, collection, options).then(makeReply("insert", collection, undefined, options, undefined, newObj));
  });
});
server.listen(settings.SOCKET_PORT);
console.log("Socket listening on localhost:".concat(settings.SOCKET_PORT));

function makeReply(operation, collection, findObj, options, idToChange, newObj) {
  return function (result) {
    var _result$_id, _result$insertedId;

    var data = {
      collection: collection,
      result: result,
      findObj: findObj,
      newObj: newObj,
      options: options,
      operation: operation,
      newId: idToChange || (result === null || result === void 0 ? void 0 : (_result$_id = result._id) === null || _result$_id === void 0 ? void 0 : _result$_id.toString()) || (result === null || result === void 0 ? void 0 : (_result$insertedId = result.insertedId) === null || _result$insertedId === void 0 ? void 0 : _result$insertedId.toString())
    };
    io.emit("changed", data);
  };
}

function getIds(_x3, _x4) {
  return _getIds.apply(this, arguments);
}

function _getIds() {
  _getIds = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(collection, findObj) {
    var result;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _db.default.find(findObj, collection);

          case 2:
            result = _context3.sent;
            return _context3.abrupt("return", result.map(function (v) {
              return v._id;
            }));

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getIds.apply(this, arguments);
}

function getIdToChange(_x5, _x6) {
  return _getIdToChange.apply(this, arguments);
} //callback to ensure db is connected when executing main code
//not necessary later with socket
// db.readyCallback=main


function _getIdToChange() {
  _getIdToChange = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(findObj, collection) {
    var idsList, idToChange;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (findObj && "_id" in findObj) findObj._id = (0, _bson.ObjectID)(findObj._id);

            if (!findObj._id) {
              _context4.next = 5;
              break;
            }

            _context4.t0 = [findObj._id];
            _context4.next = 8;
            break;

          case 5:
            _context4.next = 7;
            return getIds(collection, findObj);

          case 7:
            _context4.t0 = _context4.sent;

          case 8:
            idsList = _context4.t0;
            idToChange = idsList ? idsList[0] : "";
            return _context4.abrupt("return", idToChange);

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _getIdToChange.apply(this, arguments);
}