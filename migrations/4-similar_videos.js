'use strict';
module.exports = {
 up: (queryInterface, Sequelize) => {
  return queryInterface.createTable('similar_videos', {
   video_id: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.INTEGER,
    references: {
     model: 'videos',
     key: 'video_id'
    }
   },
   similar_video_id: {
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
  return queryInterface.dropTable('similar_videos');
 }
};
