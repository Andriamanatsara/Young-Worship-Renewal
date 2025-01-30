const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');
const connectDB = require('./config/db');
const session = require('express-session');

const indexRoute = require('./routes/indexRoute');
const userRoute = require('./routes/userRoute');
const transactionRoutes = require('./routes/transactionRoute');

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended : false }));
app.use(session({
   name : 'sid',
   secret : 'key',
   resave : false,
   saveUninitialized : false,
   cookie : {
    maxAge : 1000 * 60 * 60 * 24 * 7,
    secure : false
   }
}));

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views',path.join(__dirname, 'views'));

app.use((req, res, next) => {
  res.locals.message = req.session.message;
  res.locals.user = req.session.user;
  delete req.session.message;
  next();
});


app.use('/', indexRoute);
app.use('/auth', userRoute);
app.use('/', userRoute);
app.use('/transactions', transactionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
