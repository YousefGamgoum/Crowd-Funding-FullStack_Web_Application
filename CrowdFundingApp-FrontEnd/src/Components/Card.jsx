import React from "react";
import "./Card.css";
import AOS from "aos";
import "bootstrap-icons/font/bootstrap-icons.css";

import { useLocation, useNavigate } from "react-router";

export default function Card(props) {
  const { projectList , onDelete} = props;
    const navigate = useNavigate()
  //   const location = useLocation()
  //   const loc = location.pathname
  //   const NavToDetailes = (id)=>{
  //     navigate(`/product-details/${id}`)
  //     console.log(loc)
  const UserID = localStorage.getItem("userId");
  const onUpdate = (id)=>{
    navigate(`/update/${id}`)
  }
  
  return (
    <>
        <div className="col-3 mb-4 d-flex justify-content-center">
      <div data-aos="fade-right" className="">
          <div className="card shadow-sm border-0 rounded-4 overflow-hidden h-100 " >
            <div className="card-header bg-gradient-primary text-white py-3">
              <h5 className="card-title fs-5 fw-semibold mb-0">
                {projectList.title}
              </h5>
            </div>
            <div className="card-body d-flex flex-column">
              <p className="card-text text-secondary mb-4">
                {projectList.details}
              </p>

              <div className="mt-auto" style={{ justifyContent: "center" }}>
                <div className=" align-items-center mb-3 ">
                  <div className="d-flex justify-content-evenly">
                    <p>Total Target</p>
                    <div className="badge bg-light text-dark fs-6 p-2">
                      <i className="bi bi-currency-dollar me-2"></i>
                      {projectList.total_target}
                    </div>
                  </div>
                  <div className="d-flex justify-content-evenly mt-4">
                    <div className="text-end">
                      <small className="text-muted d-block">Start</small>
                      <span className="fw-medium">
                        {new Date(projectList.start_time).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-end">
                      <small className="text-muted d-block">End</small>
                      <span className="fw-medium">
                        {new Date(projectList.end_time).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className=" gap-2 d-flex justify-content-evenly">
                  <button
                    className="btn btn-sm btn-outline-primary rounded-pill px-3 d-flex align-items-center"
                    onClick={() => onUpdate(projectList.id)}
                    disabled={projectList.owner != UserID}
                  >
                    <i className="bi bi-pencil-square me-1"></i> Update
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger rounded-pill px-3 d-flex align-items-center"
                    onClick={() => onDelete(projectList.id)}
                    disabled={projectList.owner != UserID}
                  >
                    <i className="bi bi-trash me-1"></i> Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

     
    </>
  );
}