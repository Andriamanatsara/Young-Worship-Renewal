const Member = require('../models/memberEntity');
const multer = require('multer');
const fs = require('fs');
const { type } = require('os');

var storage = multer.diskStorage({
    destination : function (req,res, cb) {
        cb(null, "./public/pictures");
    },
    filename : function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    },
});

var upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Limite de taille max : 10MB
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Seuls les fichiers image sont autorisés.'));
        }
        cb(null, true);
    },
}).single('screenMember');

exports.rejoign = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.json({ message: err.message, type: 'danger' });
        }

        try {
            const { name, surname, dateOfBirth, adress, facebook, email, phoneNumber, adhesionDate, roleInGroup, engagement } = req.body;

            // Vérification si l'email existe déjà
            const existingEmail = await Member.findOne({ email });
            if (existingEmail) {
                req.session.message = {
                    type: 'danger',
                    message: 'Un membre a été inscrit avec cet email'
                };
                return res.redirect('/rejoindre');  // Retour pour éviter le code suivant
            }

            // Vérification si une photo a été téléchargée
            if (!req.file) {
                req.session.message = {
                    type: 'danger',
                    message: 'Aucune photo n’a été téléversée.'
                };
                return res.redirect('/rejoindre');  // Retour pour éviter le code suivant
            }

            // Si tout est valide, sauvegarder le membre
            const newMember = new Member({
                name,
                surname,
                dateOfBirth,
                adress,
                facebook,
                email,
                phoneNumber,
                adhesionDate: adhesionDate || Date.now(),
                roleInGroup,
                engagement,
                status : 'pending',
                screenMember: req.file ? req.file.filename : null,
            });

            await newMember.save();
            req.session.message = {
                type: 'success',
                message: 'Votre demande a été reçue et sera traitée par un administrateur.',
            };
            return res.redirect('/membres');

        } catch (err) {
            req.session.message = {
                type: 'danger',
                message: 'Une erreur est survenue. Veuillez réessayer plus tard.'
            };
            console.log(err);
            return res.redirect('/rejoindre'); 
        }
    });
};


exports.edit = (req, res) => {
    upload(req, res, async (err) => {
        let new_screenURL = "";

        if (req.file){
            new_screenURL = req.file.filename;

            try{
                fs.unlinkSync("./public/Pictures/" + req.body.old_image);
            }catch (err){
                console.log(err);
            }
        }else{
            new_screenURL = req.body.old_image;
        }
        if(err){
            return res.json({message : err.message, type : 'danger'});
        }

        try{
            const updateData = {
                name : req.body.name,
                surname : req.body.surname,
                dateOfBirth : req.body.dateOfBirth,
                adress : req.body.adress,
                facebook : req.body.facebook,
                email : req.body.email,
                phoneNumber : req.body.phoneNumber,
                adhesionDate : req.body.adhesionDate || Date.now,
                roleInGroup : req.body.roleInGroup,
                engagement : req.body.engagement,
                screenMember: new_screenURL,
            }

            const member = await Member.findByIdAndUpdate(req.params.id, updateData);
            if(!member){
                return res.status(404).json({message : 'Membres non trouvée', type : 'danger'});
            }

            req.session.message = {
                type : 'success',
                message : 'Information d\' un membre modifiée avec succès.'
            };
            res.redirect('/admin/liste-membre');
        }catch (err) {
            res.json({ message: err.message, type: 'danger' });
        }
    });
}



// exports.delete = (req, res) => {
//     let id = req.params.id;
//     const memberDelete = Member.findById(id);
//     if(memberDelete){
//         async (err, result) => {
//             if(result.screenMember = ""){
//                 try{
//                     fs.unlinkSync("./public/Pictures/" + result.screenMember);
//                 }catch(err){
//                     console.log(err);
//                 }
//             }

//             if(err){
//                 res.json({message : err.message});
//             }else{
//                 await Member.findByIdAndDelete(id);
//                 req.session.message = {
//                     type : 'success',
//                     message : 'Supression d\'un membre avec succès.'
//                 }
//                 res.redirect('/admin/liste-membre');
//             }
//         };
//     }

// };

exports.delete = async (req, res) => {
    try {
        await Member.findByIdAndUpdate(req.params.id, {status : 'rejected'});
        req.session.message = {
            type : 'danger',
            message : 'Membre suprimé avec succès.',
        }
        res.redirect('/admin/requests');
    } catch (err) {
        console.log(err);
        res.send('Erreur de requêtes.');
    }
}