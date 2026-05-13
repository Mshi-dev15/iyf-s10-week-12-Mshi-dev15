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
    },
    // Add these fields before the closing }, { timestamps: true });
isMarketplace: {
    type: Boolean,
    default: false
},
category: {
    type: String,
    enum: ['clothing', 'shoes', 'accessories', 'electronics', 'other', 'general'],
    default: 'general'
},
price: {
    type: Number,
    min: 0
},
seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
},
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);