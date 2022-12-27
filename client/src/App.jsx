import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import "./style/App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ConfigRoute from "./ConfigRoute";
import { useRef } from "react";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";
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
  const tawkMessengerRef = useRef();
  const onLoad = () => {
    console.log("onLoad works!");
  };

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
        <div className="App">
          <TawkMessengerReact
            propertyId="63aaa7a747425128790a3c1d"
            widgetId="1gl99tpkc"
            onLoad={onLoad}
            ref={tawkMessengerRef}
          />
        </div>
      )}
    </>
  );
}

export default App;
