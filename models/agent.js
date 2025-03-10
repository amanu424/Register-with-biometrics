const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AgentSchema = new mongoose.Schema({
    name: { type: String, required: true },  
    phone: { type: Number, required: true, unique: true },  
    password: { type: String, required: true },
    
});

// Hash the password before saving the user
AgentSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('Agent', AgentSchema);
