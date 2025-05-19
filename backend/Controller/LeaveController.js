import User from "../Models/UserModel.js";
import Leave from "../Models/LeaveModel.js";

export const applyLeave = async (req, res) => {
  const userId = req.userData._id;
  const { fromDate, toDate, leaveType } = req.body;

  if (req.userData.role !== "Developer") {
    return res.status(403).json({ message: "You are not Developer" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Validate leave dates
    const todayDate = new Date();
    const from = new Date(fromDate);
    const to = new Date(toDate);
    if (from < todayDate || to < todayDate) {
      return res.status(400).json({ message: "Leave dates cannot be in the past." });
    }
    
    // Check if fromDate is before toDate
    if (from > to) {
      return res.status(400).json({ message: "From date cannot be after To date." });
    }

    //Check if the Leavv already exists
    const existingLeave = await Leave.findOne({
      userId,
      $or: [
        { fromDate: { $gte: fromDate, $lte: toDate } },
        { toDate: { $gte: fromDate, $lte: toDate } }
      ]
    });
    if (existingLeave) {
      return res.status(400).json({ message: "Leave already exists for the selected dates." });
    }
    // Create a new leave request
    const newLeave = new Leave({
      userId,
      EID: user.EID,
      fromDate,
      toDate,
      leaveType
    });

    await newLeave.save();
    res.status(201).json({ message: "Leave applied successfully", leave: newLeave });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

export const getMyLeaves = async (req, res) => {
  const userId = req.userData._id;

  if (req.userData.role !== "Developer") {
    return res.status(403).json({ message: "You are not Developer" });
  }

  try {
    const leaves = await Leave.find({ userId }).populate("userId", "name");
    res.status(200).json(leaves);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

export const getAllPendingLeaves = async (req, res) => {

  if (req.userData.role !== "Admin" &&  req.userData.role !== "Manager") {
    return res.status(403).json({ message: "You are not Admin Or Maneger" });
  }

//get all pending leaves
  try {
    const pendingLeaves = await Leave.find({ status: "Pending" }).populate("userId", "name EID");
    if (pendingLeaves.length === 0) {
      return res.status(404).json({ message: "No pending leave requests found." });
    }
    res.status(200).json(pendingLeaves);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}


export const approveLeave = async (req, res) => {
  const { leaveId} = req.body;

  if (req.userData.role !== "Admin" && req.userData.role !== "Manager") {
    return res.status(403).json({ message: "You are not Admin Or Maneger" });
  }

  if (!leaveId ) {
    return res.status(400).json({ message: "Leave ID is required." });
  }
  
  try {
    const leave = await Leave.findById(leaveId);
    if (!leave) return res.status(404).json({ message: "Leave request not found" });

    // Update the leave status
    leave.status = "Approved";
    await leave.save();

    res.status(200).json({ message: "Leave status Approved successfully", leave });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

export const rejectLeave =async(req,res)=>{
  const {leaveId,reason} = req.body;

  if(req.userData.role !== "Admin" && req.userData.role !== "Manager"){
    res.status(403).json({message:"you are not Admin or manger"})
  }

  if(!leaveId) res.status(400).json({message:"Leave ID is required."});
  
  try {
    const leave = await Leave.findById(leaveId);
    if (!leave) return res.status(404).json({ message: "Leave request not found" });

    // Update the leave status
    leave.status = "Rejected";
    leave.reason = reason;
    await leave.save();

    res.status(200).json({ message: "Leave status Rejected successfully", leave });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}