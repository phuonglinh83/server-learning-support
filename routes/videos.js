const express = require('express');
const router = express.Router();
const Video = require('../db/videos');

router.get('/:video_id/similar/:top_k', (req, res) => {
  Video.getSimilarK(req.params.video_id, req.params.top_k).then (result => {
    res.status(200).json(result);
  }).catch (error => {
      res.status(200).json();
      console.log(error);
  });
});

router.get('/:video_id/activity/:user_id', (req, res) => {
  Video.getActivity(req.params.video_id, req.params.user_id).then (result => {
    res.status(200).json(result);
  }).catch (error => {
    console.log(error);
    res.status(200).json();
  });
});

router.post('/:video_id/activity/:user_id', (req, res) => {
  console.log(req.body);
  Video.updateActivity(req.params.video_id, req.params.user_id, req.body.action, req.body.count).then (result => {
    res.status(200).json();
  }).catch (error => {
    console.log("Error");
    res.status(500).json();
  });
});

router.get('/:video_id/comments', (req, res) => {
  Video.getComments(req.params.video_id).then (result => {
    res.status(200).json(result);
  }).catch (error => {
    console.log(error);
    res.status(200).json();
  });
});

router.post('/:video_id/comment/:user_id', (req, res) => {
  console.log(req.body);
  Video.inserComment(req.params.video_id, req.params.user_id, req.body.content).then (result => {
    res.status(200).json();
  }).catch (error => {
    console.log("Error: " + error);
    res.status(500).json();
  });
});

module.exports = router;
