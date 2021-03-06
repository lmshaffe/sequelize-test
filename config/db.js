'use strict';

const Sequelize = require('sequelize');
const {Config, Logger} = require('microservice_core');  
Config.load();
const env = Config.env; 
const sequelize = new Sequelize(env.DATABASE_NAME, env.DATABASE_USERNAME, env.DATABASE_PASSWORD, {  
  host: env.DATABASE_HOST,
  port: +env.DATABASE_PORT,
  dialect: env.DATABASE_DIALECT,
  dialectOptions: {
    encrypt: true
  },
  define: {
    underscored: true
  },
  schema: 'dbo'
});

// Connect all the models/tables in the database to a db object, 
//so everything is accessible via one object
const db = {};

db.Sequelize = Sequelize;  
db.sequelize = sequelize;

//Models/tables
db.users = require('../models/users.js')(sequelize, Sequelize);  
db.comments = require('../models/comments.js')(sequelize, Sequelize);  
db.posts = require('../models/posts.js')(sequelize, Sequelize);

//Relations
db.comments.belongsTo(db.posts);  
db.posts.hasMany(db.comments);  
db.posts.belongsTo(db.users);  
db.users.hasMany(db.posts);

module.exports = db;  