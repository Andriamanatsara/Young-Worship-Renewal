const mongoose = require('mongoose');

const accoutSchema = new mongoose.Schema({
    date :{type :Date, default: Date.now},
    montant : {type : Number, required : true},
    type : { type : String, enum : ["don", "offrande", "dépense"], required : true },
    categorie : { type : String, required : true },
    description : {type : String},
});

const Account = mongoose.model("Account", accoutSchema);

module.exports = Account;
