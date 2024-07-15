const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const flash = require('connect-flash');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const { User, BlogPost } = require('./models');
const dateHelper = require('./helpers/helpers');

const app = express();
const PORT = process.env.APP_PORT || 3001;

// Session middleware setup
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
}));

// Flash middleware setup
app.use(flash());

// Middleware to pass flash messages to views
app.use((req, res, next) => {
  res.locals.successMessage = req.flash('successMessage');
  next();
});

// Create the Handlebars.js engine object including helpers and partials
const hbs = exphbs.create({
  helpers: dateHelper,
  partialsDir: path.join(__dirname, 'views/partials'),
});

// Set the template engine to use Handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Set the server to use the public directory for static assets
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Use the routes defined in the controllers directory
app.use(routes);

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to database was successful.');

    // Start the server after syncing the database
    sequelize.sync({ force: false }).then(() => {
      app.listen(PORT, () => console.log(`Now listening on port ${PORT}!`));
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
