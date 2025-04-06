import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <>
      <div className="footer mt-5 p-5">
        <div className="container text-center ">
          <div className="row ">
            <div className="col mt-4">
              <h5> Get Tough With Us </h5>
              <ul style={{ listStyleType: "none" }}>
                <li>
                  <i className="bi bi-telephone"> <a href="#"> +60123456</a> </i>{" "}
                </li>

                <li>
                  {" "}
                  <i className="bi bi-envelope-arrow-down">

                    <a href="#"> crowdfunding@gmail.com  </a>

                  </i>{" "}
                </li>
                <li>
                  {" "}
                  <i className="bi bi-geo-alt">
                    <a href="#" >Menofia.Egypt </a></i> {" "}
                </li>
              </ul>
            </div>
            <div className="col mt-4">
              <h5>Projects</h5>
              <ul style={{ listStyleType: "none" }}>
                <li>
                  {" "}
                  <i className="bi bi-backpack">
                    <a href="#">Education</a>
                  </i>{" "}
                </li>
                <li>
                  {" "}
                  <i className="bi bi-recycle">
                    {" "}
                    <a href="#">Recycling</a>
                  </i>{" "}
                </li>
                <li>
                  {" "}
                  <i className="bi bi-controller">
                    {" "}
                    <a href="#">Gameing</a>
                  </i>{" "}
                </li>
              </ul>
            </div>
            <div className="col" style={{ marginTop: "7rem" }}>
              Copyright © 2025 Best Crowd funding.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;