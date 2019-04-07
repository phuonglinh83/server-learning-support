const bcrypt = require('bcrypt');
const db = require('./index');

const CREATE_QUERY =
 'INSERT INTO users (username, password) VALUES (${username}, ${hash}) RETURNING user_id';

const create = (username, password) =>
 bcrypt.hash(password, 10).then(hash => db.one(CREATE_QUERY, {
  username,
  hash
 }));

const findUsername = username =>
 db.one('SELECT * FROM users WHERE username=${username}', {
  username
 });

const findUserId = id =>
 db.one('SELECT * FROM users WHERE user_id=${id}', {
  id
});

const getRecommendations = (id, top_k) =>
 db.many(`SELECT v.video_id, youtube_id, title, description
         FROM videos as v, recommendations as r
         WHERE r.video_id=v.video_id and r.user_id=$1
         ORDER BY r.score desc
         LIMIT $2`, [id, top_k]);

const getHistory = (id) =>
 db.any(`SELECT v.video_id, youtube_id, title, description, last_modified
          FROM videos as v, activities as a
          WHERE v.video_id=a.video_id and a.user_id=$1 and action = 'WATCH'
          ORDER BY last_modified desc`, [id]);

const getFavorites = (id) =>
  db.any(`SELECT v.video_id, youtube_id, title, description, last_modified
          FROM videos as v, activities as a
          WHERE v.video_id=a.video_id and a.user_id=$1 and action = 'SAVE' and count = 1
          ORDER BY last_modified desc`, [id]);

const searchVideo = (id, query) =>
  db.any(`SELECT v.video_id, youtube_id, title, description, score
          FROM   (SELECT *
                  FROM videos
                  WHERE description ILIKE $2 OR title ILIKE $2) as v
               LEFT JOIN
                (SELECT video_id, max(score) as score
                 FROM recommendations
                 WHERE user_id = $1
                 GROUP BY video_id) as t
               ON v.video_id = t.video_id
          ORDER BY score desc nulls last`, [id, query]);

module.exports = {
 create,
 findUsername,
 findUserId,
 getRecommendations,
 getHistory,
 getFavorites,
 searchVideo
};
