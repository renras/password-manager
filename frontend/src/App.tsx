import "./App.css";
import { ToastContainer } from "react-toastify";
import Home from "pages/Home";
import Login from "pages/Login";
import Register from "pages/Register";
import { Routes, Route } from "react-router-dom";
import Layout from "components/Layout/Layout";
import ActivateAccount from "pages/Users/ActivateAccount";
import AccountActivated from "pages/Users/AccountActivated";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="users/activation" element={<ActivateAccount />} />
        <Route path="activate/:uid/:token" element={<AccountActivated />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
      <ToastContainer />
    </Layout>
  );
}

export default App;
