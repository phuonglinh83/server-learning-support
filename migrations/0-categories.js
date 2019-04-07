'use strict';
module.exports = {
 up: (queryInterface, Sequelize) => {
  return queryInterface.createTable('categories', {
    category_id: {
     allowNull: false,
     autoIncrement: true,
     primaryKey: true,
     type: Sequelize.INTEGER
    },
   name: {
     allowNull: false,
     type: Sequelize.TEXT
   }
  });
 },
 down: (queryInterface, Sequelize) => {
  return queryInterface.dropTable('categories');
 }
};
