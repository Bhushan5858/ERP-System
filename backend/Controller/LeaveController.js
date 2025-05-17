import Leave from "../Models/LeaveModel.js";
import User from "../Models/UserModel.js";

export const applyLeave = async (req, res) => {
    const userId = req.userData._id;
  const {  fromDate, toDate, leaveType} = req.body;

  if (req.userData.role !== "Developer") {
    return res.status(403).json({ message: "You are not Developer" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if the start date is before the end date
    if (new Date(fromDate) > new Date(toDate)) {
      return res.status(400).json({ message: "Start date must be before end date" });
    }
    // check if the leave already exists
    const leaveExists = await Leave.findOne({
      userId,
      fromDate,
      toDate,
      leaveType
    });
    if (leaveExists) {
      return res.status(400).json({ message: "Leave already exists" });
    }

    const newLeave = new Leave({
      userId,
      EID: user.EID,
      fromDate,
      toDate,
      leaveType,
      status: "Pending"
    });

    await newLeave.save();
    res.status(201).json({ message: "Leave application submitted", leave: newLeave });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}




export const getLeave = async (req, res) => {
  const userId = req.userData._id;

  if (req.userData.role !== "Developer") {
    return res.status(403).json({ message: "You are not Developer" });
  }

  try {
    const leaves = await Leave.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(leaves);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}
