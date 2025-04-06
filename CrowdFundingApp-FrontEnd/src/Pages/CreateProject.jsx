import React, { useState } from "react";
import axios from "axios";
import { Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router";

const CreateProject = () => {
  const [success,issuccess] = useState(false)
  const navigate = useNavigate()
  const [project, setProject] = useState({
    title: "",
    details: "",
    total_target: "",
    startDate: "",
    endDate: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    const userID = localStorage.getItem("userId");
    const formData = new FormData();
    formData.append("title", project.title);
    formData.append("details", project.details);
    formData.append("total_target", project.total_target);
    formData.append("start_time", project.startDate);
    formData.append("end_time", project.endDate);
    formData.append("userID", userID);
    try {
        const response = await axios.post(
            "http://127.0.0.1:8000/api/projects/create/",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data", 
                // Add CSRF token if required (Django's default CSRF protection)
                  // If you have a function to get CSRF token from cookies
            },
                 
            }
        );

        // alert("Project created successfully!");
        // setProject({
        //     title: "",
        //     details: "",
        //     total_target: "",
        //     startDate: "",
        //     endDate: "",
        // });
    } catch (error) {
        console.error("Error creating project:", error);
        if (error.response) {
            setError(`Server error: ${JSON.stringify(error.response.data)}`);
        } else {
            setError("Network error - is the Django server running?");
        }
    } finally {
        issuccess(true)
        setTimeout(()=>{
        setIsSubmitting(false);
        navigate("/home")
        issuccess(false)
      },2000)
    }
};

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center">Create New Project</h1>
      <div className="col-md-8 col-lg-6 mx-auto">
      {success && (
              <div class="alert alert-success" role="alert">
                Updateed Successfully - Redirecting.....
              </div>
            )}
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm">
          <div className="mb-3">
            <label className="form-label fw-bold">Project Title</label>
            <input type="text" name="title" value={project.title} onChange={handleChange} className="form-control"
             required disabled={isSubmitting}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Details</label>
            <textarea
              name="details" value={project.details} onChange={handleChange} className="form-control" rows={5}
              required disabled={isSubmitting}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Total Target </label>
            <input
              type="number" name="total_target" value={project.total_target}  onChange={handleChange} className="form-control"
              required  disabled={isSubmitting}
            />
          </div>

          <Row className="mb-3">
            <Col md={6}>
              <div className="mb-3">
                <label className="form-label fw-bold">Start Date & Time </label>
                <input
                  type="datetime-local"  name="startDate" value={project.startDate}  onChange={handleChange} 
                   className="form-control"  required  disabled={isSubmitting}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <label className="form-label fw-bold">End Date & Time </label>
                <input
                  type="datetime-local"  name="endDate"  value={project.endDate}  onChange={handleChange} 
                   className="form-control"  required  disabled={isSubmitting}
                />
              </div>
            </Col>
          </Row>

          <Button 
  variant="primary" 
  type="submit" 
  className="w-100 py-2" 
  disabled={isSubmitting} 
  style={{ 
    background: 'rgb(204, 0, 204)', 
    border: 'none' 
  }}
>
  {isSubmitting ? "Creating..." : "Create Project"}
</Button>

        </form>
      </div>
    </div>
  );
};

export default CreateProject;
