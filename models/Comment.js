const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    commentid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userid: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'userid',
      },
    },
    blogid: {
      type: DataTypes.INTEGER,
      references: {
        model: 'blog_posts',
        key: 'blogid',
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Comment',
    tableName: 'comments',
  }
);

module.exports = Comment;
