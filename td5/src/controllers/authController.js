import User from '../models/userModel.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

export async function registerUser(body) {
    try {
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(body.password, salt);
        const user = new User({
            name: body.name,
            email: body.email,
            password: encryptedPassword
        });
        await user.save();
        return { success: true, data: user };
    } catch (err) {
        return { success: false, message: "Error registering user: " + err };
    }
}

export async function loginUser(body) {
    try {
        const user = await User.findOne({ email: body.email });
        if (!user) {
            return { success: false, message: "User not found" };
        }
        const isPasswordValid = await bcrypt.compare(body.password, user.password);
        if (!isPasswordValid) {
            return { success: false, message: "Invalid password" };
        }
        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
        return { success: true, data: user, token: token };
    } catch (err) {
        return { success: false, message: "Error logging in user: " + err };
    }
}