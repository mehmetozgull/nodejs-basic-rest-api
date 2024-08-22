import Auth from '../models/auth.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const register = async(req, res) => {
    try {
        const { username, email, password } = req.body; 
        const user = await Auth.findOne({ email });
        if(user){
            return res.status(500).json({ message: 'User already exists' });
        }

        if(password.length < 6){
            return res.status(500).json({ message: 'Password must be at least 6 characters' });
        }

        const hashedPassword = await bcryptjs.hash(password, 12);
        const newUser = new Auth({ username, email, password: hashedPassword });
        await newUser.save();
        const userToken = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ status: "OK", user: newUser, token: userToken });
    }catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const login = async(req, res) => {
    try{
        const { email, password } = req.body;
        const user = await Auth.findOne({ email });
        if(!user){
            return res.status(500).json({ message: 'User not found' });
        }

        const comparePassword = await bcryptjs.compare(password, user.password);
        if(!comparePassword){
            return res.status(500).json({ message: 'Password is incorrect' });
        }

        const userToken = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ status: "OK", user, token: userToken });
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}

export { register, login };