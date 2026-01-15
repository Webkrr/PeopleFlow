import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, CircularProgress, Box, Typography } from "@mui/material";

const NewDepartmentForm = () => {
  const [department, setDepartment] = useState({ name: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setDepartment({ ...department, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${process.env.REACT_APP_API_URL || "http://localhost:5000/api"}/departments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: JSON.stringify(department),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create department");
      }

      navigate("/departments");
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to create department. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        "& .MuiTextField-root": { marginBottom: "1rem", width: "100%" },
        maxWidth: "400px",
        margin: "2rem auto",
        padding: "2rem",
        backgroundColor: "#fff",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" textAlign="center" sx={{ mb: 2 }}>
        Create New Department
      </Typography>

      <TextField
        label="Department Name"
        name="name"
        value={department.name}
        onChange={handleChange}
        required
        fullWidth
      />

      {error && (
        <Typography color="error" variant="body2" textAlign="center">
          {error}
        </Typography>
      )}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : "Save"}
      </Button>
    </Box>
  );
};

export default NewDepartmentForm;
