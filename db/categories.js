const db = require('./index');

const getAll = () =>
 db.any(`SELECT *
         FROM categories
         ORDER BY name`);

const getCategoryVideos = (category_id) =>
 db.any(`SELECT v.video_id, youtube_id, title, description
         FROM videos as v, videos_categories as vc
         WHERE vc.category_id = $1 AND v.video_id = vc.video_id
         ORDER BY title`,
         [category_id]);

module.exports = {
 getAll,
 getCategoryVideos
};
