import moment from "moment";
import User from "../Models/UserModel.js";
import Timesheet from "../Models/TimesheetModel.js";

export const clockIn = async (req, res) => {
    if (req.userData.role !== "Developer") {
      return res.status(403).json({ message: "You are not Developer" });
    }
  
    try {
      const userId = req.userData._id;
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      const todayDate = moment().format("YYYY-MM-DD"); // Only date
      const alreadyClockedIn = await Timesheet.findOne({
        userId,
        date: todayDate
      });
  
      if (alreadyClockedIn) {
        return res.status(400).json({ message: "You already clocked in today." });
      }
  
      const clockInTime = moment().format("HH:mm:ss");
  
      const newTimesheet = new Timesheet({
        userId,
        EID: user.EID,
        date: todayDate,
        clockIn: clockInTime,
        clockOut: null,
        totalHours: 0,
        workSummary: ""
      });
  
      await newTimesheet.save();
      res.status(201).json({ message: "Clock-in successful", timesheet: newTimesheet });
  
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };
  




  export const clockOut = async (req, res) => {
    const userId = req.userData._id;
    const { workSummary } = req.body;
  
    if (req.userData.role !== "Developer") {
      return res.status(403).json({ message: "You are not Developer" });
    }
  
    try {
      if (!workSummary) {
        return res.status(400).json({ message: "Work summary is required." });
      }
  
      const todayDate = moment().format("YYYY-MM-DD");
      const timesheet = await Timesheet.findOne({
        userId,
        date: todayDate
      });
  
      if (!timesheet) {
        return res.status(404).json({ message: "No clock-in record found for today." });
      }
  
      if (timesheet.clockOut) {
        return res.status(400).json({ message: "You already clocked out today." });
      }
  
      const clockOutTime = moment();
      const clockInTime = moment(timesheet.clockIn, "HH:mm:ss");
  
      const duration = moment.duration(clockOutTime.diff(clockInTime));
      const hoursWorked = parseFloat((duration.asHours()).toFixed(2)); // Round to 2 decimals
  
      timesheet.clockOut = clockOutTime.format("HH:mm:ss");
      timesheet.workSummary = workSummary;
      timesheet.totalHours = hoursWorked;
  
      await timesheet.save();
      res.status(200).json({ message: "Clock-out successful", timesheet });
  
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };

  


  export const getAttendance = async (req, res) => {
    const userId = req.userData._id;
    //check if the user is developer
    if(req.userData.role !== "Developer"){
      return res.status(403).json({ message: "You are not Developer" });
    }
    
    //get the all the documents between range of dates
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      return res.status(400).json({ message: "Start date and end date are required." });
    }
    try {
      const attendance = await Timesheet.find({
        userId,
        date: { $gte: startDate, $lte: endDate }
      }).sort({ date: -1 });
  
      if (attendance.length === 0) {
        return res.status(404).json({ message: "No attendance records found." });
      }
  
      res.status(200).json(attendance);
  
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
    }


    export const presentAtDate = async (req, res) => { 
      //check if the user is admin or manager
      if (req.userData.role !== "Admin" && req.userData.role !== "Manager") {
        return res.status(403).json({ message: "You are not authorized to view this." });
      }
      //getting the list of who is present today and returning name and EID and role only include those who clocked in today
      try {
        //if date is not given from query so take the today date

         let{ date } = req.query;

         if(!date) {
         date = moment().format("YYYY-MM-DD");
         }
        const attendance = await Timesheet.find({
          date: date,
          clockIn: { $ne: null }  // Ensure clockIn is not null
        }).populate("userId", "name EID role");
  
        if (attendance.length === 0) {
          return res.status(404).json({ message: "No attendance records found for today." });
        }
  
        const presentUsers = attendance.map(record => ({
          name: record.userId.name,
          EID: record.EID,
          role: record.userId.role
        }));
  
        res.status(200).json(presentUsers);
  
      } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
      }

    }


    export const getTimeSheetAtDate = async (req, res) => {
      //chek if the user is admin or manger
      if (req.userData.role !== "Admin" && req.userData.role !== "Manager") {
        return res.status(403).json({ message: "You are not authorized to view this." });
      }

      //getting the list of Time sheet at date and returning all the data
      try{
        //if the date is not given from query so take the today date
        let{ date } = req.query;
        if(!date) {
          date = moment().format("YYYY-MM-DD");
        }
        //return the timesheet data and developers name 
        const timesheet = await Timesheet.find({
          date: date,
          clockIn: { $ne: null }  // Ensure clockIn is not null
        }).populate("userId", "name EID role");
        if (timesheet.length === 0) {
          return res.status(404).json({ message: "No timesheet records found for today." });
        }
        const timesheetData = timesheet.map(record => ({
          name: record.userId.name,
          EID: record.EID,
          date: record.date,
          clockIn: record.clockIn,
          clockOut: record.clockOut,
          totalHours: record.totalHours,
          workSummary: record.workSummary
        }));
        res.status(200).json(timesheetData);
      
      }catch(err){
        res.status(500).json({ message: "Server error", error: err.message });
      }
    }
