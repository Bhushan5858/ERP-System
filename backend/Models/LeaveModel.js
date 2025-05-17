import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  EID: { type: String, required: true },
  fromDate: { type: String, required: true },
  toDate: { type: String, required: true },
  leaveType: { type: String, enum: ["Sick", "Paid", "Casual"], required: true },
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
  reason: { type: String }
}, { timestamps: true });
const Leave = mongoose.model("Leave", leaveSchema);
export default Leave;