import axios from "axios";

// Base API URL (from environment variable or default to localhost)
const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const DEPARTMENT_API_URL = `${API_BASE_URL}/departments`;

// Get all departments
export const getAllDepartments = async () => {
  const response = await axios.get(DEPARTMENT_API_URL);
  return response.data;
};

// Get department by ID
export const getDepartmentById = async (id) => {
  const response = await axios.get(`${DEPARTMENT_API_URL}/${id}`);
  return response.data;
};

// Add a new department
export const addDepartment = async (department) => {
  const response = await axios.post(DEPARTMENT_API_URL, department);
  return response.data;
};

// Update an existing department
export const updateDepartment = async (id, department) => {
  const response = await axios.put(`${DEPARTMENT_API_URL}/${id}`, department);
  return response.data;
};

// Delete a department
export const deleteDepartment = async (id) => {
  await axios.delete(`${DEPARTMENT_API_URL}/${id}`);
};
