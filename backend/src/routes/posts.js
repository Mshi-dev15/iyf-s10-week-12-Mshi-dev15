const express = require('express');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const { protect } = require('../middleware/auth');

const router = express.Router();

// GET /api/posts - Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('author', 'name avatar')
            .populate({
                path: 'comments',
                populate: { path: 'author', select: 'name avatar' }
            })
            .sort({ createdAt: -1 });

        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/posts/:id - Get single post
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate('author', 'name avatar')
            .populate({
                path: 'comments',
                populate: { path: 'author', select: 'name avatar' }
            });

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/posts - Create post (protected)
router.post('/', protect, async (req, res) => {
    try {
        const { content, image, feeling, visibility } = req.body;

        const post = await Post.create({
            author: req.user._id,
            content,
            image,
            feeling,
            visibility
        });

        await post.populate('author', 'name avatar');

        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /api/posts/:id - Update post (protected)
router.put('/:id', protect, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Make sure user owns the post
        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Not authorized' });
        }

        const { content, image, feeling, visibility } = req.body;
        post.content = content || post.content;
        post.image = image || post.image;
        post.feeling = feeling || post.feeling;
        post.visibility = visibility || post.visibility;

        await post.save();
        await post.populate('author', 'name avatar');

        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /api/posts/:id - Delete post (protected)
router.delete('/:id', protect, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Not authorized' });
        }

        await post.deleteOne();

        res.json({ message: 'Post deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/posts/:id/like - Like/Unlike post (protected)
router.post('/:id/like', protect, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Compare as strings for reliable matching
        const userIdStr = req.user._id.toString();
        const alreadyLiked = post.likes?.some(likeId => 
            likeId?.toString() === userIdStr
        );

        if (alreadyLiked) {
            // Unlike: filter out this user's like
            post.likes = post.likes.filter(likeId => 
                likeId?.toString() !== userIdStr
            );
        } else {
            // Like: add user's ObjectId
            if (!Array.isArray(post.likes)) post.likes = [];
            post.likes.push(req.user._id);
        }

        await post.save();

        // Return simple likeCount as NUMBER (frontend expects this)
        res.json({ 
            success: true, 
            likeCount: post.likes?.length || 0 
        });
    } catch (error) {
        console.error('Like error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// POST /api/posts/:id/comments - Add comment (protected)
router.post('/:id/comments', protect, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const comment = await Comment.create({
            post: post._id,
            author: req.user._id,
            content: req.body.content
        });

        post.comments.push(comment._id);
        await post.save();

        await comment.populate('author', 'name avatar');

        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /api/posts/:postId/comments/:commentId - Delete comment (protected)
router.delete('/:postId/comments/:commentId', protect, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);

        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        if (comment.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Not authorized' });
        }

        await comment.deleteOne();

        // Remove from post
        await Post.findByIdAndUpdate(req.params.postId, {
            $pull: { comments: req.params.commentId }
        });

        res.json({ message: 'Comment deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;