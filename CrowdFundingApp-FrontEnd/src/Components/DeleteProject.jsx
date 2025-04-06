import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function DeleteProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [pr, setpr] = useState([]);

  useEffect(() => {
    const deleteProject = async () => {
      const UserID = localStorage.getItem("userId");
      const formData = new FormData();
      formData.append("UserID", UserID);
      try {
        const response = await axios.post(
          `http://127.0.0.1:8000/api/projects/delete/${id}/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        navigate("/home");
      } catch (error) {
        console.error("Error fetching project:", error);
        setError("Failed to load project data");
      }
    };
    deleteProject();
  }, [id]);
  return (
    <>
      {error && (
        <div className="alert alert-danger mb-4" role="alert">
          {error}
        </div>
      )}
    </>
  );
}
