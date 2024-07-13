const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');


const app = express();
const PORT = process.env.APP_PORT || 3001;

// Create the Handlebars.js engine object including helpers and partials
const hbs = exphbs.create({
  helpers,
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

// Start the server after syncing the database
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}!`));
});
