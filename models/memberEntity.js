const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new Schema({
    name: String,
    surname: String,
    dateOfBirth: Date,
    adress: String,
    facebook: String,
    email: String,
    phoneNumber: {
        type: String,
        required: [true, 'Le numéro de téléphone est requis'],
        validate: {
            validator: function(v) {
                return /^\+?(\d{1,3})?[-.\s]?\(?\d+\)?[-.\s]?\d+[-.\s]?\d+/.test(v);
            },
            message: props => `${props.value} n'est pas un numéro valide!`
        }
    },
    adhesionDate: {
        type: Date,
        default : Date.now
    },
    roleInGroup: {
        type: String,
        default: 'Membre'
    },
    status : {
        type: String,
        default : 'pending',
        enum : ['pending', 'accepted', 'rejected']
    },
    engagement: String,
    screenMember: String // Photo de profil
}, { timestamps: true });

const Member = mongoose.model('Member', memberSchema);
module.exports = Member;
