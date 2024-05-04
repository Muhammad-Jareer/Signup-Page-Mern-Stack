const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

EmployeeSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcryptjs.hash(this.password, 10);
    }
    next();
});

EmployeeSchema.methods.isPasswordCorrect = async function (password) {
    return await bcryptjs.compare(password, this.password);
};

const EmployeeModel = mongoose.model("employees", EmployeeSchema);

module.exports = EmployeeModel;
