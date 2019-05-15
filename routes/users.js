const express = require('express');
const router = express.Router();
const jwt = require('jwt-simple');
const User = require('../db/users');
const Video = require('../db/videos');
const bcrypt = require('bcrypt');
const auth = require('../auth');
const cfg = require('../auth/config.js');

const createToken = (res, id) => {
  const payload = {
      id: id
  };
  const token = jwt.encode(payload, cfg.jwtSecret);
  res.json({
      token: token,
      user_id: id
  });
};

router.post('/login',function(req, res) {
    if (req.body.username && req.body.password) {
        const username = req.body.username;
        const password = req.body.password;
        User.findUsername(username)
        .then((user) => {
          if (bcrypt.compareSync(password, user.password)) {
            console.log("log in success!");
            createToken(res, user.user_id);
          } else {
            res.sendStatus(401);
          }
        })
        .catch(error => {
          console.log(error);
          res.sendStatus(401);
        });
    }
  });

// router.get('/find', auth.authenticate(), (req, res) => {
//   res.json({user:1});
// });

router.post('/find', (req, res) => {
  console.log(req.body);
  User.findUsername(req.body.username).then (user => {
    res.status(200).json({user_id: user.user_id});
  }).catch (error => {
    res.status(200).json({user_id: -1});
  });
});

router.get('/:user_id/recommend/:top_k', (req, res) => {
  User.getRecommendations(req.params.user_id, req.params.top_k).then (result => {
    res.status(200).json(result);
  }).catch (error => {
    Video.getRandomK(req.params.top_k).then(result => {
      res.status(200).json(result);
    }).catch(error => {
      res.status(200).json();
      console.log(error);
    });
  });
});

router.get('/:user_id/history', (req, res) => {
  User.getHistory(req.params.user_id).then (result => {
    res.status(200).json(result);
  }).catch (error => {
    console.log(error);
    res.status(200).json();
  });
});

router.get('/:user_id/favorites', (req, res) => {
  User.getFavorites(req.params.user_id).then (result => {
    res.status(200).json(result);
  }).catch (error => {
    console.log(error);
    res.status(200).json();
  });
});

router.post('/:user_id/search', (req, res) => {
  console.log(req.body);
  query = '%' + req.body.keyword + '%';
  User.searchVideo(req.params.user_id, query).then (result => {
    res.status(200).json(result);
  }).catch (error => {
    console.log(error);
    res.status(200).json();
  });
});

router.post('/register', function (req, res, next) {
 console.log(req.body);
 User.create(req.body.username, req.body.password)
  .then(result => {
    Video.updateActivity(1, result.user_id, 'WATCH', 0);
    Video.updateActivity(2, result.user_id, 'WATCH', 0);
    createToken(res, result.user_id);
  }).catch(error => {
    console.log(error);
    res.sendStatus(401);
  });
});

module.exports = router;
