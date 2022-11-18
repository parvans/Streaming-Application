import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Email from "./components/forgot-password/Email";
import Otp from "./components/forgot-password/Otp";
import Vediolist from "./components/Vediolist";
import Navbars from "./components/Navbars";
import About from "./components/About";
import ResetPassword from "./components/forgot-password/ResetPassword";
import Vedio from "./components/Vedio";
import Addvedio from "./components/admin/Addvedio";
import AddPlan from "./components/admin/AddPlan";
import AllPlans from "./components/admin/AllPlans";
import UpdatePlan from "./components/admin/UpdatePlan";

function App() {
  // window.location.reload()
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("UserToken")) {
      setLoggedIn(true);
      // window.location.reload();
    }  
  });
  return (
    <div>
      {loggedIn && <Navbars />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/email-send" element={<Email />} />
        <Route path="/verify-otp" element={<Otp />} />
        <Route path="/vedio-list" element={<Vediolist />} />
        <Route path="/vedio/:id" element={<Vedio />} />
        <Route path="/about" element={<About />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/add-video" element={<Addvedio />} />
        <Route path="/add-plan" element={<AddPlan />} />
        <Route path="/all-plan" element={<AllPlans />} />
        <Route path="/update-plan/:id" element={<UpdatePlan />} />
      </Routes>
    </div>
  );
}

export default App;
