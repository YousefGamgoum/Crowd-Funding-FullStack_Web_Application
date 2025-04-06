import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Row, Col } from "react-bootstrap";
import {
  redirect,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

const UpdateProject = () => {
  // { onCancel, onUpdateSuccess }
  const [success,issuccess] = useState(false)
  const { id } = useParams();

  const onCancel = () => {
    navigate("/home");
  };

  const [project, setProject] = useState({
    title: "",
    details: "",
    total_target: "",
    startDate: "",
    endDate: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [pr, setpr] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/projects/${id}/`
        );
        const projectData = response.data;
        setpr(projectData);
        setProject({
          title: projectData.title,
          details: projectData.details,
          total_target: projectData.total_target,
          startDate: projectData.start_time
            ? projectData.start_time.slice(0, 16)
            : "",
          endDate: projectData.end_time
            ? projectData.end_time.slice(0, 16)
            : "",
        });
      } catch (error) {
        console.error("Error fetching project:", error);
        setError("Failed to load project data");
      }
    };

    fetchProject();
  }, [id]);

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const UserID = localStorage.getItem("userId");
  useEffect(() => {
    if (pr.owner) {
      if (pr.owner != UserID) {
        navigate("/notfound");
      }
    }
  }, [pr]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData();
    formData.append("title", project.title);
    formData.append("details", project.details);
    formData.append("total_target", project.total_target);
    formData.append("start_time", project.startDate);
    formData.append("end_time", project.endDate);
    formData.append("UserID", UserID);

    try {
      await axios.put(
        `http://127.0.0.1:8000/api/projects/update/${id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

     
    } catch (error) {
      console.error("Error updating project:", error);
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
      <h1 className="mb-4 text-center">Update Project</h1>
      <div className="col-md-8 col-lg-6 mx-auto">
        {error && (
          <div className="alert alert-danger mb-4" role="alert">
            {error}
          </div>
        )}
        {success && (
              <div class="alert alert-success" role="alert">
                Updateed Successfully - Redirecting.....
              </div>
            )}

        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 rounded shadow-sm"
        >
          <div className="mb-3">
            <label className="form-label fw-bold">Project Title</label>
            <input
              type="text"
              name="title"
              value={project.title}
              onChange={handleChange}
              className="form-control"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Details</label>
            <textarea
              name="details"
              value={project.details}
              onChange={handleChange}
              className="form-control"
              rows={5}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Total Target</label>
            <input
              type="number"
              name="total_target"
              value={project.total_target}
              onChange={handleChange}
              className="form-control"
              required
              disabled={isSubmitting}
            />
          </div>

          <Row className="mb-3">
            <Col md={6}>
              <div className="mb-3">
                <label className="form-label fw-bold">Start Date & Time</label>
                <input
                  type="datetime-local"
                  name="startDate"
                  value={project.startDate}
                  onChange={handleChange}
                  className="form-control"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <label className="form-label fw-bold">End Date & Time</label>
                <input
                  type="datetime-local"
                  name="endDate"
                  value={project.endDate}
                  onChange={handleChange}
                  className="form-control"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </Col>
          </Row>

          <div className="d-flex gap-2">
            <Button
              variant="secondary"
              type="button"
              className="w-50 py-2"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              className="w-50 py-2"
              disabled={isSubmitting}
              style={{
                background: "rgb(204, 0, 204)",
                border: "none",
                color: "white",
              }}
            >
              {isSubmitting ? "Updating..." : "Update Project"}
            </Button>
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProject;
