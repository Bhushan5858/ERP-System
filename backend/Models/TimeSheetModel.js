import mongoose from "mongoose";

const timesheetSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    EID: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    clockIn: {
        type: String,
        required: true
    },
    clockOut: {
        type: String,
    },
    totalHours: {
        type: Number,
    },
    workSummary: {
        type: String,
    },
},
{
    timestamps: true
});
const Timesheet = mongoose.model("Timesheet", timesheetSchema);
export default Timesheet;
