'use strict';
module.exports = {
 up: (queryInterface, Sequelize) => {
  return queryInterface.createTable('videos', {
   video_id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
   },
   youtube_id: {
     allowNull: false,
     type: Sequelize.TEXT
   },
   title: {
     type: Sequelize.TEXT
   },
   description: {
     type: Sequelize.TEXT
   }
  });
 },
 down: (queryInterface, Sequelize) => {
  return queryInterface.dropTable('videos');
 }
};
