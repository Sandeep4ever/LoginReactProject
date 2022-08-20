import React, { createContext, useState, useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home.js";
import Login from "./Components/Login.js";
import SignUp from "./Components/SignUp.js";

export const AuthProvider = createContext();
const App = () => {
  const [auth, setAuth] = useState(false);
  const handleAuth = () => {
    setAuth(!auth);
  };

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    setIsLogin(JSON.parse(localStorage.getItem("isLogin")));
  }, [auth]);

  const myAuth = [auth, handleAuth];

  return (
    <>
      <BrowserRouter>
        <AuthProvider.Provider value={myAuth}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            {isLogin && <Route path="/home" element={<Home />} />}
            <Route path="*" element={<Login />} />
          </Routes>
        </AuthProvider.Provider>
      </BrowserRouter>
    </>
  );
};

export default App;
