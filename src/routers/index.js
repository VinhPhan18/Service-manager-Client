import routesConfig from "~/config/router";

//Layouts

//Pages
import Commodity from "~/pages/Commodity/Commodity";
import Contact from "~/pages/Contact/Contact";
import Contract from "~/pages/Contract/Contract";
import Customer from "~/pages/Customer/Customer";
import Support from "~/pages/Customer/Support/Support";
import CustomerType from "~/pages/CustomerType/CustomerType";
import TransactionType from "~/pages/Transaction/TransactionType/TransactionType";
import Order from "~/pages/Order/Order";
import Profile from "~/pages/Profile/Profile";
import Staff from "~/pages/Staff/Staff";
import Position from "~/pages/Staff/Position/Position";
import Login from "~/pages/Staff/Login/Login";
import Transaction from "~/pages/Transaction/Transaction";
import Home from "~/pages/Home/Home";

//Public Routes
const publicRoutes = [
  { path: routesConfig.commodity, component: Commodity },
  { path: routesConfig.contacts, component: Contact },
  { path: routesConfig.contracts, component: Contract },
  { path: routesConfig.customers, component: Customer },
  { path: routesConfig.supports, component: Support },
  { path: routesConfig.customertypes, component: CustomerType },
  { path: routesConfig.transactiontypes, component: TransactionType },
  { path: routesConfig.orders, component: Order },
  { path: routesConfig.profile, component: Profile },
  { path: routesConfig.staffs, component: Staff },
  { path: routesConfig.position, component: Position},
  { path: routesConfig.login, component: Login },
  { path: routesConfig.transactions, component: Transaction },
  { path: routesConfig.home, component: Home },
];

export { publicRoutes };
