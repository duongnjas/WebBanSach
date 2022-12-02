import Home from "./pages/Home";
import CustomerAccount from "./pages/CustomerAccount";
import ShoppingCart from "./pages/ShoppingCart";
import FilterProduct from "./pages/FilterProduct";
import DetailProduct from "./pages/DetailProduct";
import Admin from "./pages/Admin";
import Payment from "./pages/Payment";
import Error from "./pages/Error/index";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import ChangePassword from "./components/ChangePassword";
import OAuth2RedirectHandler from "./pages/OAuth2RedirectHandler";
import SuccessPayment from "./pages/SuccessPayment";

import FilterProductSearch from "./pages/FilterProductSearch";

function ConfigRoute() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="cart" element={<ShoppingCart />} />
      <Route element={<PrivateRoute roles={["ADMIN", "USER"]} />}>
        <Route path="payment" element={<Payment />} />
      </Route>
      {/* Routing customer account */}
      <Route element={<PrivateRoute roles={["USER",'ADMIN']} />}>
        <Route path="customer/*" element={<CustomerAccount />} />
      </Route>
      <Route element={<PrivateRoute roles={['ADMIN']} />}>
        <Route path="admin/*" element={<Admin />} />
      </Route>
      <Route path="filter/:slug" element={<FilterProduct />} />
      <Route path="product/:slug" element={<DetailProduct />} />
      <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
      <Route path="*" element={<Error />} />
      <Route path="search/:slug" element={<FilterProductSearch />} />
      <Route path="reset" element={<ChangePassword />} />
      <Route path="result-payment" element={<SuccessPayment/>} />

    </Routes>
  );
}

export default ConfigRoute;
