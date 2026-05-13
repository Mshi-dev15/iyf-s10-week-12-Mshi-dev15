const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6
    },
    avatar: {
        type: String,
        default: ''
    },
    bio: {
        type: String,
        default: ''
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    friendRequests: [{
        from: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        status: {
            type: String,
            enum: ['pending', 'accepted', 'rejected'],
            default: 'pending'
        }
    }]
}, { timestamps: true });

// ✅ Fixed: async function WITHOUT next parameter
userSchema.pre('save', async function() {
    // Only hash if password is new or modified
    if (!this.isModified('password')) return;
    
    // Hash the password - Mongoose handles the promise automatically
    this.password = await bcrypt.hash(this.password, 12);
});

// Method to check password
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Don't send password in responses
userSchema.methods.toJSON = function() {
    const user = this.toObject();
    delete user.password;
    return user;
};

module.exports = mongoose.model('User', userSchema);