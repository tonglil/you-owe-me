/*
 *Model and database initiation
 */

var Sequelize = require('sequelize');
var env = require('../config').env;
var config = require('../config').database;

var db = new Sequelize(config.name, config.username, config.password, config[env]);

var data = {};

var models = [
  'User',
  'Tab',
];

models.forEach(function(model) {
  data[model] = db.import(__dirname + '/' + model);
});

Object.keys(data).forEach(function(modelName) {
  if (data[modelName].options.hasOwnProperty('associate')) {
    data[modelName].options.associate(data);
  }
});

data.Sequelize = Sequelize;
data.db = db;

module.exports = data;
