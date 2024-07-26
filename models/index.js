const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

const User = require('./User');
const BlogPost = require('./BlogPost');
const Comment = require('./Comment');

User.hasMany(BlogPost, {
  foreignKey: 'userid',
});

BlogPost.belongsTo(User, {
  foreignKey: 'userid',
});

BlogPost.hasMany(Comment, {
  foreignKey: 'blogid',
});

Comment.belongsTo(BlogPost, {
  foreignKey: 'blogid',
});

Comment.belongsTo(User, {
  foreignKey: 'userid',
});

User.hasMany(Comment, {
  foreignKey: 'userid',
});

module.exports = {
  User,
  BlogPost,
  Comment,
  sequelize,
};
 