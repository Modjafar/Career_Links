import mongoose from 'mongoose';

const bookmarkSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        opportunityId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Opportunity',
            default: null,
        },
        examId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Exam',
            default: null,
        },
        itemType: {
            type: String,
            enum: ['opportunity', 'exam'],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Ensure user can't bookmark same item twice
bookmarkSchema.index({ userId: 1, opportunityId: 1, examId: 1 }, { unique: true, sparse: true });

// Pre-save validation
bookmarkSchema.pre('save', function (next) {
    if (this.itemType === 'opportunity' && !this.opportunityId) {
        next(new Error('opportunityId is required when itemType is opportunity'));
    } else if (this.itemType === 'exam' && !this.examId) {
        next(new Error('examId is required when itemType is exam'));
    } else {
        next();
    }
});

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);
export default Bookmark;
