import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
});

export default mongoose.model("Employee", employeeSchema);
