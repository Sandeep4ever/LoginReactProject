import React, { useEffect, useState } from "react";
import ".//SignUp.css";
import CrossIcon from "./img/cross.svg";
import { Link, useNavigate } from "react-router-dom";
const SignUp = () => {
  const gettingLocalStorageData = () => {
    let list = JSON.parse(localStorage.getItem("userData"));
    if (list && list.length > 0) {
      return list;
    } else {
      return [];
    }
  };
  useEffect(() => {
    setallarryData(gettingLocalStorageData());
  }, []);
  const navigate = useNavigate();
  const [cross, setCross] = useState(true);
  const [userData, setUserData] = useState({
    name: "",
    newpsw: "",
    rnewpsw: "",
    email: "",
    phone: "",
    profession: "",
  });
  const [allarryData, setallarryData] = useState([]);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };
  console.log(allarryData);
  const handleSubmitData = () => {
    const newRecord = { ...userData, id: new Date().getTime().toString() };
    setallarryData([...allarryData, newRecord]);

    let docs = localStorage.getItem("userData");
    console.log("docs", docs);
    if (docs !== null) {
      let docArray = JSON.parse(docs) || [];
      docArray = [...docArray, newRecord];
      localStorage.setItem("userData", JSON.stringify(docArray));
    } else {
      let docArray = [newRecord];
      console.log("docArray", docArray);

      localStorage.setItem("userData", JSON.stringify(docArray));
    }

    setUserData({
      name: "",
      newpsw: "",
      rnewpsw: "",
      email: "",
      phone: "",
      profession: "",
    });
    alert("Registration is successful...");
    navigate("/");
  };
  const HandleCross = () => {
    setCross(!cross);
    navigate("/");
  };

  return (
    <>
      {cross && (
        <div className="container">
          <div className="card" style={{ width: "30rem" }}>
            <div className="card-body">
              <h2 className="card-title">Sign Up</h2>

              <img
                className="crossimg"
                src={CrossIcon}
                alt="img"
                onClick={HandleCross}
              />
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={userData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Email </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="newpsw"
                  value={userData.newpsw}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Repeat Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="rnewpsw"
                  value={userData.rnewpsw}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Phone No</label>
                <input
                  type="number"
                  className="form-control"
                  name="phone"
                  value={userData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Profession</label>
                {/* <select className="form-control" onChange={handleInputChange} > */}
                <select
                  name="profession"
                  className="form-control"
                  onChange={handleInputChange}
                  required
                  value={userData.profession ?? ""}
                >
                  <option disabled value="">
                    Choose...
                  </option>
                  <option value="UI developer">UI developer</option>
                  <option value="Frontend developer">Frontend developer</option>
                  <option value="FullStack developer">
                    FullStack developer
                  </option>
                  <option value="React.js developer">React.js developer</option>
                </select>
              </div>
              <button
                className="btn btn-outline-primary w-25 "
                onClick={handleSubmitData}
              >
                Register Now
              </button>
              <Link
                type="button"
                className="btn btn-outline-primary ml-3"
                to="/"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;
