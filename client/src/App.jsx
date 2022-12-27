import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import "./style/App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ConfigRoute from "./ConfigRoute";

import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "./apis/axiosClient";
import { loginSuccess, logoutSuccess } from "./slices/authSlice";
import ScrollToTop from "./components/ScrollToTop";
import CheckAuthentication from "./components/CheckAuthentication";

function App() {
  const isAdmin = window.location.href.includes("admin");
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  if (user) {
    axiosInstance(user, dispatch, loginSuccess, logoutSuccess);
  }

  return (
    <>
      <BrowserRouter>
        <CheckAuthentication />
        <ScrollToTop>
          {isAdmin ? null : <Header />}
          <ConfigRoute />
          {isAdmin ? null : <Footer />}

          <ToastContainer
            autoClose={1200}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            pauseOnHover={false}
          />
        </ScrollToTop>
      </BrowserRouter>

      {isAdmin ? null : (
      <></>
      )}
    </>
  );
}

export default App;
