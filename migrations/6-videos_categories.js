'use strict';
module.exports = {
 up: (queryInterface, Sequelize) => {
  return queryInterface.createTable('videos_categories', {
   video_id: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.INTEGER,
    references: {
     model: 'videos',
     key: 'video_id'
    }
   },
   category_id: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.INTEGER,
    references: {
     model: 'categories',
     key: 'category_id'
    }
   }
  });
 },
 down: (queryInterface, Sequelize) => {
  return queryInterface.dropTable('videos_categories');
 }
};
