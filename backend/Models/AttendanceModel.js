import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true
        },
        date: {
          type: String, // "YYYY-MM-DD"
          required: true
        },
        clockInTime: {
          type: String, // "hh:mm A"
        },
        clockOutTime: {
          type: String
        },
        totalHoursWorked: {
          type: Number
        }
      });

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;