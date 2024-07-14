const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

const User = require('./User');
const BlogPost = require('./BlogPost');

User.hasMany(BlogPost, {
  foreignKey: 'userid',
});

BlogPost.belongsTo(User, {
  foreignKey: 'userid',
});

module.exports = {
  User,
  BlogPost,
  sequelize,
};
