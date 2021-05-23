"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var settings = _interopRequireWildcard(require("../serverSettings"));

var _mongodb = _interopRequireDefault(require("mongodb"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// const mongoClient = new mongodb.MongoClient(settings.MONGO_URL)
// const connection=mongoClient.connect()
// const testConnection = () =>{
//     mongo.connect((err) => {
//         if (err) {
//             console.error("Big error in database", err)
//             throw err
//         }
//         console.log("db connected")
//         const db = mongo.db(settings.MONGO_DB_NAME)
//         console.log(
//             db
//                 .collection("markers")
//                 .find({})
//                 .toArray((err, docs) => {
//                     if(err){
//                         console.error("Error when loading from db", err)
//                         throw err
//                     }
//                     console.log(docs)
//                 })
//         )
//     })
// }
var MongoDb = /*#__PURE__*/function () {
  function MongoDb() {
    (0, _classCallCheck2.default)(this, MongoDb);
    this.connectToMongoDB();

    this.readyCallback = function () {};
  }

  (0, _createClass2.default)(MongoDb, [{
    key: "connectToMongoDB",
    value: function () {
      var _connectToMongoDB = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var options, client;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.db) {
                  _context.next = 13;
                  break;
                }

                options = {
                  useUnifiedTopology: true
                };
                _context.prev = 2;
                client = new _mongodb.default.MongoClient(settings.MONGO_URL, options);
                _context.next = 6;
                return client.connect();

              case 6:
                this.db = client.db(settings.MONGO_DB_NAME);
                if (this.readyCallback) this.readyCallback();
                _context.next = 13;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](2);
                console.error(_context.t0, "MongoDB connection failed.");

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 10]]);
      }));

      function connectToMongoDB() {
        return _connectToMongoDB.apply(this, arguments);
      }

      return connectToMongoDB;
    }()
  }, {
    key: "insert",
    value: function () {
      var _insert = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(doc, collection, options) {
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!options) options = {};

                if (!this.db) {
                  _context2.next = 11;
                  break;
                }

                _context2.prev = 2;
                _context2.next = 5;
                return this.db.collection(collection).insertOne(doc);

              case 5:
                return _context2.abrupt("return", _context2.sent);

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](2);
                console.error(_context2.t0, "Something went wrong - insert");

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 8]]);
      }));

      function insert(_x, _x2, _x3) {
        return _insert.apply(this, arguments);
      }

      return insert;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(oldDoc, newDoc, collection, options) {
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!options) options = {};

                if (!this.db) {
                  _context3.next = 15;
                  break;
                }

                _context3.prev = 2;

                if (!("$pull" in newDoc)) {
                  _context3.next = 7;
                  break;
                }

                _context3.next = 6;
                return this.db.collection(collection).updateOne(oldDoc, {
                  $pull: newDoc.$pull
                }, {
                  upsert: true
                });

              case 6:
                return _context3.abrupt("return", _context3.sent);

              case 7:
                _context3.next = 9;
                return this.db.collection(collection).updateOne(oldDoc, {
                  $set: newDoc.$set ? newDoc.$set : newDoc
                }, {
                  upsert: true
                });

              case 9:
                return _context3.abrupt("return", _context3.sent);

              case 12:
                _context3.prev = 12;
                _context3.t0 = _context3["catch"](2);
                console.error(_context3.t0, "Something went wrong - update");

              case 15:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[2, 12]]);
      }));

      function update(_x4, _x5, _x6, _x7) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(oldDoc, collection, options) {
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!options) options = {};

                if (!this.db) {
                  _context4.next = 11;
                  break;
                }

                _context4.prev = 2;
                _context4.next = 5;
                return this.db.collection(collection).deleteOne(oldDoc);

              case 5:
                return _context4.abrupt("return", _context4.sent);

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4["catch"](2);
                console.error(_context4.t0, "Something went wrong - delete");

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[2, 8]]);
      }));

      function _delete(_x8, _x9, _x10) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }, {
    key: "find",
    value: function () {
      var _find = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(obj, collection, options, projection) {
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (this.db) {
                  _context5.next = 2;
                  break;
                }

                return _context5.abrupt("return");

              case 2:
                if (!options) options = {};
                if (!projection) projection = {};
                _context5.prev = 4;
                _context5.next = 7;
                return this.db.collection(collection).find(obj, _objectSpread(_objectSpread({}, options), {}, {
                  projection: projection
                })).toArray();

              case 7:
                return _context5.abrupt("return", _context5.sent);

              case 10:
                _context5.prev = 10;
                _context5.t0 = _context5["catch"](4);
                console.error(_context5.t0, "Something went wrong - find");

              case 13:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[4, 10]]);
      }));

      function find(_x11, _x12, _x13, _x14) {
        return _find.apply(this, arguments);
      }

      return find;
    }()
  }]);
  return MongoDb;
}();

var instance = new MongoDb();
var _default = instance;
exports.default = _default;