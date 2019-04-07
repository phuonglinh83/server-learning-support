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

module.exports = {
 getRandomK,
 getSimilarK,
 getActivity,
 updateActivity
};
