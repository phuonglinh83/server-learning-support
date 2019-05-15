const db = require('./index');

const getRandomK = (top_k) =>
 db.many(`SELECT video_id, youtube_id, title, description
         FROM videos
         ORDER BY RANDOM()
         LIMIT $1`, [top_k]);

const getSimilarK = (video_id, top_k) =>
 db.many(`SELECT v.video_id, youtube_id, title, description
          FROM videos as v, similar_videos as s
          WHERE s.video_id = $1 AND s.similar_video_id = v.video_id
          ORDER BY score
          LIMIT $2`, [video_id, top_k]);

const getActivity = (video_id, user_id) =>
  db.any(`SELECT video_id, user_id, action, count
          FROM activities
          WHERE video_id = $1 AND user_id = $2`, [video_id, user_id]);

const updateActivity = (video_id, user_id, action, count) =>
  db.none(`INSERT INTO activities (user_id, video_id, action, count, last_modified)
          VALUES ($1, $2, $3, $4, to_timestamp($5))
          ON CONFLICT ON CONSTRAINT activities_pkey
          DO UPDATE SET count=$4, last_modified=to_timestamp($5);`,
          [user_id, video_id, action, count, Date.now()/1000]);

const inserComment = (video_id, user_id, content) =>
  db.none(`INSERT INTO comments (user_id, video_id, created_time, content)
           VALUES ($1, $2, to_timestamp($4), $3);`,
           [user_id, video_id, content, Date.now()/1000]);

const getComments = (video_id, user_id) =>
  db.any(`SELECT username, content, created_time
          FROM comments as c, users as u
          WHERE video_id = $1 AND u.user_id = c.user_id
          ORDER BY created_time DESC;`, [video_id]);

const getCategories = (video_id) =>
  db.any(`SELECT name
          FROM videos_categories as v, categories as c
          WHERE video_id = $1 AND v.category_id = c.category_id
          ORDER BY name;`, [video_id]);

module.exports = {
 getRandomK,
 getSimilarK,
 getActivity,
 updateActivity,
 getComments,
 inserComment,
 getCategories
};
