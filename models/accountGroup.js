const mongoose = require('mongoose');

const accoutGroupSchema = new mongoose.Schema({
    solde : {type : Number},
    date : {type: Date, default : Date.now}
});

const AccountGroup = mongoose.model("AccountGroup", accoutGroupSchema);

module.exports = AccountGroup;