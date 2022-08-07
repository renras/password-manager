import "./App.css";
import { ToastContainer } from "react-toastify";
import Home from "pages/Home";
import Login from "pages/Login";
import Register from "pages/Register";
import { Routes, Route } from "react-router-dom";
import Layout from "components/Layout/Layout";
import Activation from "pages/Users/Activation";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="users/activation" element={<Activation />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
      <ToastContainer />
    </Layout>
  );
}

export default App;
