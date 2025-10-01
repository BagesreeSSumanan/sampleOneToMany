const config = require('./config.js');
const mysql = require('mysql2');
const Sequelize = require('sequelize');
const db = {};
// create db if it doesn't already exist
const { dbhost, dbport, dbuser, dbpassword,database,dbdialect } = config.database;
const pool =  mysql.createPool({ host:dbhost, port:dbport,user: dbuser, password:dbpassword });

pool.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

const sequelize = new Sequelize(database, dbuser, dbpassword,{
  host: dbhost,
  dialect: "mysql"
});

db.tutorials = require("../models/tutorial.js")(sequelize, Sequelize);
db.comments = require("../models/comment.js")(sequelize, Sequelize);

db.tutorials.hasMany(db.comments, { as: "comments" });
db.comments.belongsTo(db.tutorials, {
  foreignKey: "tutorialId",
  as: "tutorial",
});
sequelize.sync() 
sequelize.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});
module.exports = db;

 