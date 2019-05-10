'use strict';
module.exports = {
 up: (queryInterface, Sequelize) => {
  return queryInterface.createTable('comments', {
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
   created_time: {
     allowNull: false,
     primaryKey: true,
     type: Sequelize.DATE
   },
   content: {
    allowNull: false,
    type: Sequelize.TEXT
   }
  });
 },
 down: (queryInterface, Sequelize) => {
  return queryInterface.dropTable('comments');
 }
};
