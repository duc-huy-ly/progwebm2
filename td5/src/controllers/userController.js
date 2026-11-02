import User from '../models/userModel.js'

export async function getAllUsers() {
    try {
        const users = await User.find();
        return { success: true, data: users };
    } catch (err) {
        return { success: false, message: "Error fetching users: " + err };
    }
}