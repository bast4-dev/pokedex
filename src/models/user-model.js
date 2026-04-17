const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    password: String,
    created: {
        type: Date,
        default: new Date()
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;