import "./Home.css";
import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import AOS from "aos";
import Card from "../Components/Card";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
const Home = () => {
  const [projects, setProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()
    useEffect(() => {
      axios
        .get(`http://127.0.0.1:8000/api/projects/`)
        .then((res) => {
          setProjects(res.data);
          setAllProjects(res.data);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);

  useEffect(() => {
    AOS.init();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");

    if (!startDate || !endDate) {
      return setError("Please select both start and end dates.");
    }

    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/projects/search/?start_date=${startDate}&end_date=${endDate}`
      );
      setProjects(res.data);
    } catch (err) {
      setError("Error during search.");
    }
  };

const deleteFun = (id)=>{
  navigate(`/delete/${id}`)
}

  const clearFilter = () => {
    setStartDate("");
    setEndDate("");
    setProjects(allProjects);
    setError("");
  };

  return (
    <>
      <div className="home">
        <div data-aos="fade-up">
          <div className="first ">
            <h1> Best Crowdfunding</h1>
            <p style={{ width: "70%", marginLeft: "18rem", marginTop: "3rem" }}>
              Crowdfunding is a powerful way to bring ideas to life by gathering
              financial support from a large number of people, typically through
              online platforms. It allows entrepreneurs, creatives, and
              innovators to raise funds for their projects without relying on
              traditional investors or loans.
              <br />
              Whether it's a tech startup, a social cause, or a creative
              endeavor, crowdfunding enables direct engagement with supporters
              who believe in the vision.
              <br />
              This model not only provides financial backing but also validates
              ideas, builds a community, and fosters innovation. With the rise
              of digital connectivity, crowdfunding has revolutionized the way
              dreams turn into reality.
              <br />
              Before you start crowdfunding, find the best platform for your
              needs. GoFundMe has compiled this list to help you compare the
              best online fundraising platform by fees, features, support, and
              more.
            </p>

            <button className="btn btn-info mt-3">Read More..!</button>
          </div>
        </div>
      </div>
      <div className="previous">
        <h2> SOME OF OUR PERVIOUS PROJECTS</h2>
        <p style={{ marginTop: "2rem" }}>
          There are samples from our previous projects in many fields, these
          projects could help you to know more
        </p>
        <div data-aos="fade-up">
          <div id="carouselExample" className="carousel slide">
            <div
              className="carousel-inner"
              style={{ width: "87%", height: "70%", marginLeft: "5.5rem" }}
            >
              <div className="carousel-item active">
                <img
                  src="/assets/images/slidone.jpg"
                  className="d-block w-100"
                  alt=" "
                />
              </div>
              <div className="carousel-item">
                <img
                  src="/assets/images/slidetwo.jpg"
                  className="d-block w-100"
                  alt=" "
                />
              </div>
              <div className="carousel-item">
                <img
                  src="/assets/images/slidethree.jpg"
                  className="d-block w-100"
                  alt=" "
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>

      <div className="projects">
        <div className="search container">
          <form onSubmit={handleSearch} className="row g-3 mb-4">
            <div className="col-md-4">
              <label>Start Date</label>
              <input
                type="date"
                className="form-control"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label>End Date</label>
              <input
                type="date"
                className="form-control"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="col-md-2 d-flex align-items-end">
              <Button type="submit" className="btn btn-primary w-100">
                Search
              </Button>
            </div>
            <div className="col-md-2 d-flex align-items-end">
              <Button
                type="button"
                className="btn btn-secondary w-100"
                onClick={clearFilter}
              >
                Clear
              </Button>
            </div>
          </form>

          {error && (
            <div className="alert alert-danger text-center">{error}</div>
          )}
        </div>
        
        <h2 className="mb-5"> OUR PROJECTS</h2>

        <div className="row m-0">
          {projects.map((value) => {
            return (
              <Fragment key={value.id}>
                <Card projectList={value} onDelete={deleteFun} />
              </Fragment>
            )
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
