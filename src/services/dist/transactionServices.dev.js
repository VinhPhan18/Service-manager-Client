"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTranscation = exports.getTransaction = void 0;

var request = _interopRequireWildcard(require("../utils/request"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const getTransaction = async filters => {
  try {
    const res = await request.get("transaction/", {
      params: {
        limit: filters.limit,
        sort: filters.sort,
        page: filters.page,
        nhanvien: filters.nhanvien,
        deleted: filters.deleted,
        khachhang: filters.khachhang,
        loaihd: filters.loaihd,
        trangthaigd: filters.trangthaigd
      }
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

exports.getTransaction = getTransaction;

const createTranscation = async data => {
  try {
    const res = await request.post("transaction/create", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

exports.createTranscation = createTranscation;
//# sourceMappingURL=transactionServices.dev.js.map
