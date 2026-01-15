import axios from "axios";

// Use environment variable or fallback to localhost
const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const EMPLOYEE_API_URL = `${API_BASE_URL}/employees`;

// Get all employees
export const getAllEmployees = async () => {
  const response = await axios.get(EMPLOYEE_API_URL);
  return response.data;
};

// Get employee by ID
export const getEmployeeById = async (id) => {
  const response = await axios.get(`${EMPLOYEE_API_URL}/${id}`);
  return response.data;
};

// Add a new employee
export const addEmployee = async (employee) => {
  const response = await axios.post(EMPLOYEE_API_URL, employee);
  return response.data;
};

// Update an existing employee
export const updateEmployee = async (id, employee) => {
  const response = await axios.put(`${EMPLOYEE_API_URL}/${id}`, employee);
  return response.data;
};

// Delete an employee
export const deleteEmployee = async (id) => {
  await axios.delete(`${EMPLOYEE_API_URL}/${id}`);
};
