const Joi = require('joi');
const bcrypt = require('bcryptjs');
const User = require("../Model/User");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const register = async (req, res) => {
    const body = req.body;

    const schema = Joi.object({
        firstname: Joi.string().min(1).required(),
        lastname: Joi.string().min(1).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        role: Joi.string().required(),
    });

    const { error } = schema.validate(body);
    if (error) {
        return res.status(400).json({ msg: error.details[0].message });
    }

    try {
        const existingUser = await User.findOne({ email: body.email });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" ,success:false});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(body.password, salt); 

        const user = await User.create({
            firstname: body.firstname,
            lastname: body.lastname,
            email: body.email,
            password: hashedPassword,
            role: body.role,
        });

        return res.status(201).json({ msg: "User registered successfully", user: user,success:true });
    } catch (err) {
        return res.status(500).json({ msg: "Server error", error: err.message });
    }
};
const login = async (req, res) => {
    const body = req.body;

    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(body);
    if (error) {
        return res.status(400).json({ msg: error.details[0].message });
    }

    try {
        const user = await User.findOne({ email: body.email });
        if (!user) {
            return res.status(400).json({ msg: "Please Login with the correct credentials",success:false });
        }

        const isMatch = await bcrypt.compare(body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Please Login with the correct credentials",success:false });
        }

        const data = {
            id: user._id,
            role: user.role,
        };
        const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ msg: "Login successful", token,role:user.role,success:true });
    } catch (err) {
        return res.status(500).json({ msg: "Server error", error: err.message });
    }
};

module.exports = { register,login };
