import mongoose from 'mongoose';

const examSchema = new mongoose.Schema(
    {
        examTitle: {
            type: String,
            required: [true, 'Please provide exam title'],
            trim: true,
        },
        organization: {
            type: String,
            required: [true, 'Please provide conducting organization'],
        },
        category: {
            type: String,
            enum: [
                'Government',
                'SSC',
                'UPSC',
                'Banking',
                'Railways',
                'State-PSC',
                'Defence',
                'Teaching',
                'Entrance',
                'Private'
            ],
            required: [true, 'Please specify exam category'],
        },
        description: {
            type: String,
            default: '',
        },
        eligibility: {
            type: String,
            required: [true, 'Please provide eligibility criteria'],
        },
        examPattern: {
            type: String,
            default: '',
        },
        syllabusLink: {
            type: String,
            default: '',
        },
        applyLink: {
            type: String,
            required: [true, 'Please provide official apply link'],
        },
        notificationLink: {
            type: String,
            default: '',
        },
        registrationStartDate: {
            type: Date,
            required: [true, 'Please provide registration start date'],
        },
        registrationLastDate: {
            type: Date,
            required: [true, 'Please provide registration last date'],
        },
        examDate: {
            type: Date,
            required: [true, 'Please provide exam date'],
        },
        admitCardDate: {
            type: Date,
            default: null,
        },
        resultDate: {
            type: Date,
            default: null,
        },
        status: {
            type: String,
            enum: ['Active', 'Upcoming', 'Closed', 'Result Declared'],
            default: 'Active',
        },
        notification: {
            type: String,
            enum: ['Active-Form', 'Closing-Soon', 'Upcoming', 'New-Today', 'Result-Declared'],
            default: 'Active-Form',
        },
        isNewlyAdded: {
            type: Boolean,
            default: true,
        },

        views: {
            type: Number,
            default: 0,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
);

// Indexes for search and filtering
examSchema.index({ category: 1 });
examSchema.index({ status: 1 });
examSchema.index({ registrationLastDate: 1 });
examSchema.index({ examDate: 1 });
examSchema.index({ examTitle: 'text', organization: 'text' });

const Exam = mongoose.model('Exam', examSchema);
export default Exam;
