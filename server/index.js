const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
const EmployeeModel = require('./models/Employee');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/employee");

app.post('/', (req, res) => {
    EmployeeModel.create(req.body)
        .then(employee => res.json(employee))
        .catch(err => res.json(err));
});

app.post('/login', 
    [
        body('email').isEmail().withMessage('Invalid email format'),
        body('password').notEmpty().withMessage('Password is required')
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, errors: errors.array() });
            }

            const { email, password } = req.body;
            const user = await EmployeeModel.findOne({ email });

            if (!user) {
                return res.json({ success: false, message: "User not found" });
            }

            const isPasswordCorrect = await user.isPasswordCorrect(password);
            if (isPasswordCorrect) {
                return res.json({ success: true, message: "Login Successfully", user });
            } else {
                return res.json({ success: false, message: "Password didn't match" });
            }
        } catch (error) {
            console.error("Error during login", error);
            return res.status(500).json({ success: false, message: "An error occurred during login" });
        }
    }
);

app.listen(3001, () => {
    console.log("server is running");
});
