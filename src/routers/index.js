import routesConfig from "~/config/router";

//Layouts

//Pages
import Commodities from "~/pages/Commodities/Commodities";
import Contact from "~/pages/Contact/Contact";
import Contract from "~/pages/Contract/Contract";
import ContractType from "~/pages/ContractType/ContractType";
import Customer from "~/pages/Customer/Customer";
import Order from "~/pages/Order/Order";
import Profile from "~/pages/Profile/Profile";
import Staff from "~/pages/Staff/Staff";
import StaffType from "~/pages/StaffType/StaffType";
import Transaction from "~/pages/Transaction/Transaction";
import TransactionType from "~/pages/TransactionType/TransactionType";
import TransactionStatus from "~/pages/TransactionStatus/TransactionStatus";
import Home from "~/pages/Home/Home";


//Public Routes
const publicRoutes = [
  { path: routesConfig.commodities, component: Commodities },
  { path: routesConfig.contact, component: Contact },
  { path: routesConfig.contract, component: Contract },
  { path: routesConfig.contracttype, component: ContractType },
  { path: routesConfig.customer, component: Customer },
  { path: routesConfig.order, component: Order },
  { path: routesConfig.profile, component: Profile },
  { path: routesConfig.staff, component: Staff },
  { path: routesConfig.stafftype, component: StaffType },
  { path: routesConfig.transaction, component: Transaction },
  { path: routesConfig.transactiontype, component: TransactionType },
  { path: routesConfig.transactionstatus, component: TransactionStatus },
  { path: routesConfig.home, component: Home },
];

export { publicRoutes };