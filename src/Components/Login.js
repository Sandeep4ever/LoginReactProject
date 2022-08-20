import React, { useContext, useState, useEffect } from "react";
import { AuthProvider } from "../App";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";
const Login = () => {
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const gettingLocalStorageData = () => {
    let list = JSON.parse(localStorage.getItem("userData"));
    if (list && list.length > 0) {
      return list;
    } else {
      return [];
    }
  };

  const [auth, handleAuth] = useContext(AuthProvider);
  const [loginData, setLoginData] = useState({
    email: "",
    newpsw: "",
  });

  const [allData, setAllData] = useState([]);

  useEffect(() => {
    setAllData(gettingLocalStorageData());
    localStorage.setItem("isLogin", false);
  }, []);

  const handleLoginInput = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });

    if (validator.isEmail(loginData.email)) {
      setEmailError("Valid Email :)");
      if (validator.isStrongPassword(loginData.newpsw)) {
        setPassword("Valid Password :)");
      } else {
        setPassword("Enter valid Password!");
      }
    } else {
      setEmailError("Enter valid Email!");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const matchFoundArr = [];
    const onlyUserNameMatchedData = [];
    const noDataMatch = [];
    if (allData.length === 0) {
      alert("No data found please Register");
      setLoginData({
        email: "",
        newpsw: "",
      });
    }
    if (allData && allData.length > 0) {
      allData.forEach((el, index) => {
        if (el.email === loginData.email && el.newpsw === loginData.newpsw) {
          matchFoundArr.push(el);
        }
        if (el.email === loginData.email && el.newpsw !== loginData.newpsw) {
          onlyUserNameMatchedData.push(el);
        } else {
          noDataMatch.push("No Match found! please Register");
        }
      });
      if (matchFoundArr && matchFoundArr.length > 0) {
        handleAuth();
        localStorage.setItem("isLogin", true);
        localStorage.setItem("userData", JSON.stringify(matchFoundArr));

        setTimeout(() => {
          navigate("/home");
        }, 200);
      }
      if (
        onlyUserNameMatchedData &&
        onlyUserNameMatchedData.length > 0 &&
        matchFoundArr.length === 0
      ) {
        alert("password is wrong");
      }
      if (
        noDataMatch &&
        noDataMatch.length > 0 &&
        onlyUserNameMatchedData.length === 0 &&
        matchFoundArr.length === 0
      ) {
        alert("No combination found !");
      }
    }
  };

  return (
    <div>
      <div className="container">
        <div className="card" style={{ width: "30rem" }}>
          <div className="card-body">
            <h2 className="card-title text-center">Login</h2>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={loginData.email}
                onChange={handleLoginInput}
              />
              <span
                style={{
                  marginTop: "-.4rem",
                  fontSize: ".6rem",
                  fontWeight: "bold",
                  color: "red",
                }}
              >
                {emailError}
              </span>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="newpsw"
                value={loginData.newpsw}
                onChange={handleLoginInput}
              />
              <span
                style={{
                  marginTop: "-.4rem",
                  fontSize: ".6rem",
                  fontWeight: "bold",
                  color: "red",
                }}
              >
                {password}
              </span>
            </div>
            <button onClick={handleLogin} className="btn btn-outline-primary">
              Login
            </button>
            <hr />
            <Link to="/register" className="newAccount">
              SignUp
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
