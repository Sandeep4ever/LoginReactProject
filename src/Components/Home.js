import React, { useState } from "react";
import "./Home.css";
import Nav from "./Nav";
const Home = () => {
  const [userData, setUserData] = useState({
    category: "",
    language: "",
    genre: "",
  });
  const [allarryData, setallarryData] = useState([]);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleData = () => {
    const fetchData = () => {
      fetch("https://hoblist.com/api/movieList", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.result);
          setallarryData(data.result);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    fetchData();
    console.log(userData);
  };

  return (
    <>
      <Nav />
      <div className="card" style={{ width: "30rem" }}>
        <div className="card-body">
          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              className="form-control"
              onChange={handleInputChange}
              required
              value={userData.category ?? ""}
            >
              <option disabled value="">
                Choose...
              </option>
              <option value="movies">movies</option>
            </select>
          </div>
          <div className="form-group">
            <label>Language</label>
            <select
              name="language"
              className="form-control"
              onChange={handleInputChange}
              required
              value={userData.language ?? ""}
            >
              <option disabled value="">
                Choose...
              </option>
              <option value="Hindi">Hindi</option>
              <option value="Tamil">Tamil</option>
              <option value="English">English</option>
              <option value="kanada">kanada</option>
            </select>
          </div>
          <div className="form-group">
            <label>Genre</label>
            <select
              name="genre"
              className="form-control"
              onChange={handleInputChange}
              required
              value={userData.genre ?? ""}
            >
              <option disabled value="">
                Choose...
              </option>
              <option value="action">action</option>
              <option value="adventure">adventure</option>
              <option value="drama">drama</option>
              <option value="fantasy">fantasy</option>
            </select>
          </div>
          <button className="btn btn-primary" onClick={handleData}>
            Find Movies
          </button>
        </div>
      </div>
      <div className="wrapData">
        {allarryData?.map((item) => (
          <div className="card" style={{ width: "18rem" }}>
            <img src={item.poster} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Title: {item.title}</h5>
              <p className="card-text">Director: {item.director[0]}</p>
              <p className="card-text">Language: {item.language}</p>
              <p className="card-text">Genre: {item.genre}</p>
              <p className="card-text">Voting: {item.voting}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
