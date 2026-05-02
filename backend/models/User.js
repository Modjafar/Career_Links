import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a name'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Please provide an email'],
            unique: true,
            lowercase: true,
            match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
        },
        password: {
            type: String,
            required: [true, 'Please provide a password'],
            minlength: 6,
            select: false, // Don't return password by default
        },
        phone: {
            type: String,
            default: '',
        },
        avatar: {
            type: String,
            default: '',
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        bookmarkedOpportunities: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Opportunity',
            },
        ],
        bookmarkedExams: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Exam',
            },
        ],
        notifications: [
            {
                type: {
                    type: String,
                },
                message: {
                    type: String,
                },
                read: {
                    type: Boolean,
                    default: false,
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Remove sensitive data when converting to JSON
userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

const User = mongoose.model('User', userSchema);
export default User;
