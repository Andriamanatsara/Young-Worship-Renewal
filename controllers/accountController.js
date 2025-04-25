const Account = require('../models/accountEntity');
const AccountGroup = require('../models/accountGroup');

exports.addTransaction = async (req, res) => {
       let { montant, type, categorie, description } = req.body;

    try {
        montant = Number(montant); // Convertir le montant en nombre

        const transaction = new Account({ montant, type, categorie, description });

        let accountGroup = await AccountGroup.findOne(); // Trouver le solde global

        if (!accountGroup) {
            // Si aucun solde n'existe encore, on crée un nouveau solde
            accountGroup = new AccountGroup({ solde: montant });
            await accountGroup.save();
        } else {
            let newSolde = accountGroup.solde;

            if (type === "don" || type === "offrande") {
                newSolde += montant; // Addition correcte
                req.session.message = {
                    type: "success",
                    message: `${montant} Ar a été ajouté au compte.`,
                };
            } else if (type === "dépense") {
                if (newSolde < montant) {
                    // Vérifier si le solde est insuffisant
                    req.session.message = {
                        type: "danger",
                        message: "Solde insuffisant pour cette dépense.",
                    };
                    return res.redirect('/admin/comptabilite'); // Rediriger après l'erreur
                }
                newSolde -= montant; // Soustraction correcte
                req.session.message = {
                    type: "success",
                    message: `$
                    {montant} Ar a été déduit du compte.`,
                };
            }

            // Mettre à jour le solde du groupe
            await AccountGroup.findOneAndUpdate({}, { solde: newSolde });
        }

        await transaction.save();

        return res.redirect("/admin/comptabilite");
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de l'enregistrement de la transaction" });
    }
};




exports.getBalance = async (req, res) => {
    try {
        const transaction = await Account.find();
        let solde = 0;

        transaction.forEach((transaction) => {
            if(transaction.type === "don" || transaction.type === "offrande"){
                solde += transaction.montant;
            }else if(transaction.type === "dépense"){
                solde -= transaction;
                
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du solde', error });
    }
};
