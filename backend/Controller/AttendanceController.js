
import moment from 'moment';
import Attendance from '../Models/AttendanceModel.js';

export const clockIn = async (req, res) => {
    const userId = req.userData._id; // Assuming userId is obtained from the JWT token
    const today = moment().format("YYYY-MM-DD");
  
    try {
      const existing = await Attendance.findOne({ userId, date: today });
      if (existing) return res.status(400).json({ message: "Already clocked in" });
  
      const attendance = new Attendance({
        userId,
        date: today,
        clockInTime: moment().format("hh:mm A")
      });
  
      await attendance.save();
      res.status(200).json({ message: "Clocked in", attendance });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  };
  


  export const clockOut = async (req, res) => {
    const userId  = req.userData._id; // Assuming userId is obtained from the JWT token
    const today = moment().format("YYYY-MM-DD");
  
    try {
      const attendance = await Attendance.findOne({ userId, date: today });
  
      if (!attendance) return res.status(404).json({ message: "Clock-in not found" });
      if (attendance.clockOutTime) return res.status(400).json({ message: "Already clocked out" });
  
      const clockIn = moment(attendance.clockInTime, "hh:mm A");
      const clockOut = moment(); // or simulate: moment("11:00 AM", "hh:mm A")
      const hoursWorked = moment.duration(clockOut.diff(clockIn)).asHours();
  
      attendance.clockOutTime = clockOut.format("hh:mm A");
      attendance.totalHoursWorked = Number(hoursWorked.toFixed(2));
  
      await attendance.save();
      res.status(200).json({ message: "Clocked out", attendance });
  
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  };

 export const getAttendanceRecord = async (req, res) => {
    const userId = req.userData._id; 
    const startDate = req.query.startDate; // Expecting dates in "YYYY-MM-DD" format
    
  // Automatically set today's date as endDate if not provided
  const endDate = req.query.endDate || moment().format("YYYY-MM-DD");
  console.log("startDate",startDate);
  console.log("endDate",endDate);
  
    try {
        if (!startDate) {
            return res.status(400).json({ message: "startDate is required" });
          }

      const records = await Attendance.find({
        userId,
        date: { $gte: startDate, $lte: endDate }
      });
  
      if (!records.length) return res.status(404).json({ message: "No records found" });
  
      res.status(200).json(records);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
  

  export const getTodayAttendance = async (req, res) => {
    //check if user is admin or manager
    if (req.userData.role !== "Admin" && req.userData.role !== "Manager") {
      return res.status(403).json({ message: "Access Denied" });
    }
//admin and manger can see how many users are clocked in
    const today = moment().format("YYYY-MM-DD");
  
    try {
      const records = await Attendance.find({
        date: today,
        clockInTime: { $exists: true }
      }).populate('userId', 'name role');
  
      if (!records.length) return res.status(404).json({ message: "No records found" });
  
      res.status(200).json(records);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }

  }