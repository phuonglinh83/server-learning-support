'use strict';
module.exports = {
 up: (queryInterface, Sequelize) => {
  return queryInterface.createTable('recommendations', {
   user_id: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.INTEGER,
    references: {
     model: 'users',
     key: 'user_id'
    }
   },
   video_id: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.INTEGER,
    references: {
     model: 'videos',
     key: 'video_id'
    }
   },
   score: {
     type: Sequelize.DOUBLE
   }
  });
 },
 down: (queryInterface, Sequelize) => {
  return queryInterface.dropTable('recommendations');
 }
};
