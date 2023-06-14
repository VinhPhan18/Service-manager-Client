"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.publicRoutes = void 0;

var _router = _interopRequireDefault(require("~/config/router"));

var _Commodities = _interopRequireDefault(require("~/pages/Commodities/Commodities"));

var _Contact = _interopRequireDefault(require("~/pages/Contact/Contact"));

var _Contract = _interopRequireDefault(require("~/pages/Contract/Contract"));

var _ContractType = _interopRequireDefault(require("~/pages/ContractType/ContractType"));

var _Customer = _interopRequireDefault(require("~/pages/Customer/Customer"));

var _Order = _interopRequireDefault(require("~/pages/Order/Order"));

var _Profile = _interopRequireDefault(require("~/pages/Profile/Profile"));

var _Staff = _interopRequireDefault(require("~/pages/Staff/Staff"));

var _StaffType = _interopRequireDefault(require("~/pages/StaffType/StaffType"));

var _Transaction = _interopRequireDefault(require("~/pages/Transaction/Transaction"));

var _TransactionType = _interopRequireDefault(require("~/pages/TransactionType/TransactionType"));

var _TransactionStatus = _interopRequireDefault(require("~/pages/TransactionStatus/TransactionStatus"));

var _Home = _interopRequireDefault(require("~/pages/Home/Home"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Layouts
//Pages
//Public Routes
const publicRoutes = [{
  path: _router.default.commodities,
  component: _Commodities.default
}, {
  path: _router.default.contact,
  component: _Contact.default
}, {
  path: _router.default.contract,
  component: _Contract.default
}, {
  path: _router.default.contracttype,
  component: _ContractType.default
}, {
  path: _router.default.customer,
  component: _Customer.default
}, {
  path: _router.default.order,
  component: _Order.default
}, {
  path: _router.default.profile,
  component: _Profile.default
}, {
  path: _router.default.staff,
  component: _Staff.default
}, {
  path: _router.default.stafftype,
  component: _StaffType.default
}, {
  path: _router.default.transaction,
  component: _Transaction.default
}, {
  path: _router.default.transactiontype,
  component: _TransactionType.default
}, {
  path: _router.default.transactionstatus,
  component: _TransactionStatus.default
}, {
  path: _router.default.home,
  component: _Home.default
}];
exports.publicRoutes = publicRoutes;
//# sourceMappingURL=index.dev.js.map
