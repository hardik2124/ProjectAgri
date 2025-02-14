import { useEffect, useState } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Test from "./Pages/test";
import ProtectedRoute from "./Components/ProtectedRoute";
import { useSelector } from "react-redux";
import Dashboard from "./Pages/Dashboard";
import Sidebar from "./Components/common/Navbar";
import Header from "./Components/common/Header";

//auth pages 
import Login from "./Pages/AuthPages/Login";
import ForgotPassword from "./Pages/AuthPages/ForgotPassword";
import SignUp from "./Pages/AuthPages/SignUp";
import VerifyEmail from "./Pages/AuthPages/VerifyEmail";
import ResetPassword from "./Pages/AuthPages/ResetPassword";
import AllProducts from "./Pages/Admin/Products";
//end auth pages


function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>
      <ToastContainer position="top-center" autoClose={5000} />

      {/* {isAuthenticated && <Sidebar />}
      <div className="flex-1 flex flex-col">
        {isAuthenticated && <Header />}
      </div> */}

      <div className="flex">
        {isAuthenticated && <Sidebar />}
        <div className="flex-1 flex flex-col ">
          {isAuthenticated && <Header />}
          <div className="p-6 bg-gray-100">
            <Routes>
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/signup"
                element={<SignUp />}
              />
              <Route
                path="/verify-email"
                element={<VerifyEmail />}
              />
              <Route
                path="/forgot-password"
                element={<ForgotPassword />}
              />
              <Route
                path="/reset-password/:id"
                element={<ResetPassword />}
              />

              {/* protected routes  ...............................................*/}
              <Route element={<ProtectedRoute />}>
                <Route
                  path="/"
                  element={
                    <Home />
                  }
                />

                <Route
                  path="/test"
                  element={<Test />}
                />

                <Route
                  path="/dashboard"
                  element={
                    <Dashboard />
                  }
                />
                <Route
                  path="/product"
                  element={<AllProducts />}
                />
                



              </Route>

            </Routes>

          </div>

        </div>
      </div>

      {/* {isAuthenticated && <Footer />} */}
    </>
  );
}

export default App;
