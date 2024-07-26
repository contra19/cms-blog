const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const flash = require('connect-flash');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.APP_PORT || 3001;

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.use(session({
  secret: process.env.SECRET_KEY || 'SuperSecret',
  store: new SequelizeStore({
    db: sequelize,
  }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 5 * 60 * 1000, // 5 mins
  },
}));

app.use(flash());

app.use((req, res, next) => {
  res.locals.successMessage = req.flash('successMessage');
  res.locals.errorMessage = req.flash('errorMessage');
  res.locals.logged_in = req.session.logged_in;
  res.locals.user_id = req.session.user_id;
  next();
});

const hbs = exphbs.create({
  helpers: helpers,
  partialsDir: path.join(__dirname, 'views/partials'),
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to database was successful.');

    sequelize.sync({ force: false }).then(() => {
      app.listen(PORT, () => console.log(`Now listening on port ${PORT}!`));
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
