import React, { useState } from "react";

const Nav = () => {
  const [status, setstatus] = useState(false);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Logo
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item ">
                {/* <a className="nav-link" href="#"> */}
                <button
                  className="btn btn-primary"
                  onClick={() => setstatus(!status)}
                >
                  {" "}
                  Company Info
                </button>
                {status && (
                  <ul>
                    <li> Company: Geeksynergy Technologies Pvt Ltd</li>
                    <li>Address: Sanjayanagar, Bengaluru-56</li>
                    <li>Company: Phone: XXXXXXXXX09 Email: XXXXXX@gmail.com</li>
                  </ul>
                )}

                {/* </a> */}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
