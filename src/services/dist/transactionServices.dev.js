"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTransaction = exports.addTransactionStatus = exports.getTransactionStatus = exports.addTransactionType = exports.getTransactionTypes = exports.transactionDetail = exports.getTransactions = void 0;

var request = _interopRequireWildcard(require("~/utils/request"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var getTransactions = function getTransactions(filter) {
  var res;
  return regeneratorRuntime.async(function getTransactions$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(request.get("transaction/", {
            params: {
              limit: filter.limit,
              sort: filter.sort,
              page: filter.page,
              q: filter.q,
              loaigd: filter.loaigd,
              trangthaigd: filter.trangthaigd,
              khachhang: filter.khachhang,
              nguoilienhe: filter.nguoilienhe,
              nhanvien: filter.nhanvien,
              deleted: filter.deleted
            }
          }));

        case 3:
          res = _context.sent;
          return _context.abrupt("return", res);

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getTransactions = getTransactions;

var transactionDetail = function transactionDetail(id) {
  var res;
  return regeneratorRuntime.async(function transactionDetail$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(request.get("transaction/".concat(id)));

        case 3:
          res = _context2.sent;
          return _context2.abrupt("return", res);

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.transactionDetail = transactionDetail;

var getTransactionTypes = function getTransactionTypes() {
  var res;
  return regeneratorRuntime.async(function getTransactionTypes$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(request.get("transaction/types"));

        case 3:
          res = _context3.sent;
          return _context3.abrupt("return", res);

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getTransactionTypes = getTransactionTypes;

var addTransactionType = function addTransactionType(data) {
  var res;
  return regeneratorRuntime.async(function addTransactionType$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(request.post("transaction/type", data));

        case 3:
          res = _context4.sent;
          return _context4.abrupt("return", res);

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.addTransactionType = addTransactionType;

var getTransactionStatus = function getTransactionStatus() {
  var res;
  return regeneratorRuntime.async(function getTransactionStatus$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(request.get("transaction/status"));

        case 3:
          res = _context5.sent;
          return _context5.abrupt("return", res);

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getTransactionStatus = getTransactionStatus;

var addTransactionStatus = function addTransactionStatus(data) {
  var res;
  return regeneratorRuntime.async(function addTransactionStatus$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(request.post("transaction/status", data));

        case 3:
          res = _context6.sent;
          return _context6.abrupt("return", res);

        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0);

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.addTransactionStatus = addTransactionStatus;

var createTransaction = function createTransaction(data) {
  var res;
  return regeneratorRuntime.async(function createTransaction$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(request.post("transaction/create", data));

        case 3:
          res = _context7.sent;
          return _context7.abrupt("return", res);

        case 7:
          _context7.prev = 7;
          _context7.t0 = _context7["catch"](0);
          console.log(_context7.t0);

        case 10:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.createTransaction = createTransaction;
//# sourceMappingURL=transactionServices.dev.js.map
