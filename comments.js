// Create web server
var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');
// Create route for adding a comment to a post
router.post('/', function(req, res, next) {
    // Create new comment
    var comment = new Comment({
        username: req.body.username,
        content: req.body.content,
        post: req.body.post
    });
    // Save comment to database
    comment.save(function(err, comment) {
        if (err) {
            return next(err);
        }
        // Send response
        res.status(201).json(comment);
    });
});
// Create route for getting all comments for a post
router.get('/:post', function(req, res, next) {
    Comment.find({ post: req.params.post })
        .sort('-date')
        .exec(function(err, comments) {
            if (err) {
                return next(err);
            }
            // Send response
            res.status(200).json(comments);
        });
});
// Export router
module.exports = router;