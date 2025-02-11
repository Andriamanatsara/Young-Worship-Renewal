const User = require('../models/userEntity');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Vérifier si l'utilisateur ou l'email existe déjà
        const existingEmail = await User.findOne({ email });
        const existingUsername = await User.findOne({ username });

        if (existingEmail) {
            req.session.message = {
                type: 'danger',
                message: 'Cet email est déjà utilisé.'
            };
            return res.redirect('/auth/register');
        }

        if (existingUsername) {
            req.session.message = {
                type: 'danger',
                message: 'Ce nom d\'utilisateur est déjà pris.'
            };
            return res.redirect('/auth/register');
        }

        // Créer un nouvel utilisateur
        const user = new User({
            username,
            email,
            password, // Le mot de passe sera automatiquement haché grâce à `userSchema.pre('save')`
        });

        await user.save();

        req.session.message = {
            type: 'success',
            message: 'Inscription réussie. Vous pouvez vous connecter.'
        };
        res.redirect('/auth/login');
    } catch (error) {
        console.error('Erreur lors de l\'inscription :', error);
        req.session.message = {
            type: 'danger',
            message: 'Une erreur est survenue. Veuillez réessayer.'
        };
        res.redirect('/auth/register');
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ email });
        if (!user) {
            req.session.message = {
                type: 'danger',
                message: 'Aucun compte n\'est associé à cet email. Veuillez vous inscrire.'
            };
            
            return res.redirect('/auth/login');
        }

        // Vérifier le mot de passe
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            req.session.message = {
                type: 'danger',
                message: 'Mot de passe incorrect.'
            };
            return res.redirect('/auth/login');
        }

        // Stocker les informations de l'utilisateur dans la session
        req.session.user = {
            id: user._id,
            username: user.username,
            email: user.email
        };
        req.session.userId = user._id;

        req.session.message = {
            type: 'success',
            message: 'Connexion réussie.'
        };

        res.redirect('/admin/tableau-de-bord'); 
    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        req.session.message = {
            type: 'danger',
            message: 'Une erreur est survenue. Veuillez réessayer.'
        };
        res.redirect('/auth/login');
    }
};

exports.userConected = (req, res, next) => {
    if(req.session && req.session.userId){
        return next();
    }
    req.session.message = {
        type: 'danger',
        message: 'Vous devez vous connécté d\'abord'
    };
    res.redirect('/auth/login');
};

exports.logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/');
        }
        res.clearCookie('connect.sid');
        res.redirect('/login');
    });
};
