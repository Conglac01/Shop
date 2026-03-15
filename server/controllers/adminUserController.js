import userModel from "../models/userModel.js";

/* GET ALL USERS */

export const getUsers = async (req, res) => {

try {

const users = await userModel.find({}).select("-password");

res.json({
success: true,
users
});

} catch (error) {

res.json({
success: false,
message: error.message
});

}

};


/* DELETE USER */

export const deleteUser = async (req, res) => {

try {

const { id } = req.params;

await userModel.findByIdAndDelete(id);

res.json({
success: true,
message: "User deleted"
});

} catch (error) {

res.json({
success: false,
message: error.message
});

}

};


/* BLOCK USER */

export const blockUser = async (req, res) => {

try {

const { id } = req.params;

const user = await userModel.findById(id);

user.isBlocked = !user.isBlocked;

await user.save();

res.json({
success: true,
message: user.isBlocked ? "User blocked" : "User unblocked"
});

} catch (error) {

res.json({
success: false,
message: error.message
});

}

};