"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.publicRoutes = void 0;

var _router = _interopRequireDefault(require("~/config/router"));

var _Commodity = _interopRequireDefault(require("~/pages/Commodity/Commodity"));

var _Contact = _interopRequireDefault(require("~/pages/Contact/Contact"));

var _Contract = _interopRequireDefault(require("~/pages/Contract/Contract"));

var _Customer = _interopRequireDefault(require("~/pages/Customer/Customer"));

var _Support = _interopRequireDefault(require("~/pages/Customer/Support/Support"));

var _CustomerType = _interopRequireDefault(require("~/pages/CustomerType/CustomerType"));

var _TransactionType = _interopRequireDefault(require("~/pages/TransactionType/TransactionType"));

var _Order = _interopRequireDefault(require("~/pages/Order/Order"));

var _Profile = _interopRequireDefault(require("~/pages/Profile/Profile"));

var _Staff = _interopRequireDefault(require("~/pages/Staff/Staff"));

var _Login = _interopRequireDefault(require("~/pages/Staff/Login/Login"));

var _Transaction = _interopRequireDefault(require("~/pages/Transaction/Transaction"));

var _Home = _interopRequireDefault(require("~/pages/Home/Home"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Layouts
//Pages
//Public Routes
const publicRoutes = [{
  path: _router.default.commodity,
  component: _Commodity.default
}, {
  path: _router.default.contacts,
  component: _Contact.default
}, {
  path: _router.default.contracts,
  component: _Contract.default
}, {
  path: _router.default.customers,
  component: _Customer.default
}, {
  path: _router.default.supports,
  component: _Support.default
}, {
  path: _router.default.customertypes,
  component: _CustomerType.default
}, {
  path: _router.default.transactiontypes,
  component: _TransactionType.default
}, {
  path: _router.default.orders,
  component: _Order.default
}, {
  path: _router.default.profile,
  component: _Profile.default
}, {
  path: _router.default.staffs,
  component: _Staff.default
}, {
  path: _router.default.login,
  component: _Login.default
}, {
  path: _router.default.transactions,
  component: _Transaction.default
}, {
  path: _router.default.home,
  component: _Home.default
}];
exports.publicRoutes = publicRoutes;
//# sourceMappingURL=index.dev.js.map
