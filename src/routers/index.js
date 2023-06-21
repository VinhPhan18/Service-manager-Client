import routesConfig from "~/config/router";

//Layouts

//Pages
import Commodities from "~/pages/Commodities/Commodities";
import Contact from "~/pages/Contact/Contact";
import Contract from "~/pages/Contract/Contract";
import Customer from "~/pages/Customer/Customer";
import CustomerType from "~/pages/CustomerType/CustomerType";
import Order from "~/pages/Order/Order";
import Profile from "~/pages/Profile/Profile";
import Staff from "~/pages/Staff/Staff";
import StaffType from "~/pages/StaffType/StaffType";
import StaffAccount from "~/pages/StaffAccount/StaffAccount";
import Transaction from "~/pages/Transaction/Transaction";
import Home from "~/pages/Home/Home";

//Public Routes
const publicRoutes = [
  { path: routesConfig.commodities, component: Commodities },
  { path: routesConfig.contacts, component: Contact },
  { path: routesConfig.contracts, component: Contract },
  { path: routesConfig.customers, component: Customer },
  { path: routesConfig.customertypes, component: CustomerType },
  { path: routesConfig.orders, component: Order },
  { path: routesConfig.profile, component: Profile },
  { path: routesConfig.staffs, component: Staff },
  { path: routesConfig.staffaccounts, component: StaffAccount },
  { path: routesConfig.stafftypes, component: StaffType },
  { path: routesConfig.transactions, component: Transaction },
  { path: routesConfig.home, component: Home },
];

export { publicRoutes };