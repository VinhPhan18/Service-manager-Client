"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTransactionType = exports.getTransactionTypes = exports.transactionDetail = exports.getTransactions = void 0;

var request = _interopRequireWildcard(require("~/utils/request"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const getTransactions = async filter => {
  try {
    const res = await request.get("transaction/", {
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
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

exports.getTransactions = getTransactions;

const transactionDetail = async id => {
  try {
    const res = await request.get("transaction/".concat(id));
    return res;
  } catch (error) {
    console.log(error);
  }
};

exports.transactionDetail = transactionDetail;

const getTransactionTypes = async () => {
  try {
    const res = await request.get("transaction/types");
    return res;
  } catch (error) {
    console.log(error);
  }
};

exports.getTransactionTypes = getTransactionTypes;

const createTransactionType = async data => {
  try {
    const res = await request.post("transaction/create", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

exports.createTransactionType = createTransactionType;
//# sourceMappingURL=transactionServices.dev.js.map
