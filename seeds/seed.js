const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const { User, BlogPost } = require('../models');
const userData = require('./userData.json');

// Load environment variables from .env file
dotenv.config();

// Initialize Sequelize with PostgreSQL database credentials from environment variables
const sequelize = new Sequelize(process.env.DB_URL);

// Verify database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to database successful.');
    seedDatabase();
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
  });

// Define the seed function
const seedDatabase = async () => {
  try {
    // Sync all defined models to the database
    await sequelize.sync({ force: true });

    // Seed users and blog posts
    for (let i = 0; i < userData.length; i++) {
      // Create user record
      const user = await User.create({
        username: userData[i].username,
        firstname: userData[i].firstname,
        lastname: userData[i].lastname,
        email: userData[i].email,
        password: userData[i].password, // The password will be hashed by the beforeCreate hook
      });

      // Create blog posts for the user
      for (let j = 0; j < userData[i].blogPosts.length; j++) {
        await BlogPost.create({
          userid: user.userid, // Assuming userid is the primary key of User model
          title: userData[i].blogPosts[j].title,
          body: userData[i].blogPosts[j].body,
          date: new Date(),
        });
      }
    }

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};
