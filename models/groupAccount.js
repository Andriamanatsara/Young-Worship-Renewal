// models/groupAccount.js
const mongoose = require('mongoose');

const groupAccountSchema = new mongoose.Schema({
    balance: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('GroupAccount', groupAccountSchema);
