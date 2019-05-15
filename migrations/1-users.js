'use strict';
module.exports = {
 up: (queryInterface, Sequelize) => {
  return queryInterface.createTable('users', {
   user_id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
   },
   username: {
    allowNull: false,
    type: Sequelize.TEXT,
    unique: true
   },
   password: {
    allowNull: false,
    type: Sequelize.TEXT
   },
   role: {
    type: Sequelize.TEXT
   }
  });
 },
 down: (queryInterface, Sequelize) => {
  return queryInterface.dropTable('users');
 }
};
