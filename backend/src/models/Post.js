const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: [true, 'Post content is required'],
        trim: true
    },
    image: {
        type: String,
        default: ''
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    feeling: {
        type: String,
        default: ''
    },
    visibility: {
        type: String,
        enum: ['public', 'friends', 'only me'],
        default: 'public'
    }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);