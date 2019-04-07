'use strict';
module.exports = {
 up: (queryInterface, Sequelize) => {
  return queryInterface.createTable('activities', {
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
   action: {
     allowNull: false,
     primaryKey: true,
     type: Sequelize.TEXT
   },
   count: {
     allowNull: false,
     type: Sequelize.INTEGER
   },
   last_modified: {
     allowNull: false,
     type: Sequelize.DATE
   }
  });
 },
 down: (queryInterface, Sequelize) => {
  return queryInterface.dropTable('activities');
 }
};
