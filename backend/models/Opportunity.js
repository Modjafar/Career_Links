import mongoose from 'mongoose';

const opportunitySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide an opportunity title'],
            trim: true,
        },
        company: {
            type: String,
            required: [true, 'Please provide a company/platform name'],
        },
        type: {
            type: String,
            enum: ['Job', 'Internship', 'Course', 'Exam'],
            required: [true, 'Please specify the opportunity type'],
        },
        category: {
            type: String,
            enum: ['IT', 'Management', 'Finance', 'E-commerce', 'Government', 'English Learning', 'Education', 'Other'],
            required: [true, 'Please specify a category'],
        },
        description: {
            type: String,
            default: '',
        },
        eligibility: {
            type: String,
            default: '',
        },
        stipend: {
            type: String,
            default: 'Not Specified',
        },
        duration: {
            type: String,
            default: '',
        },
        workType: {
            type: String,
            enum: ['Full-time', 'Part-time', 'Remote', 'On-site', 'Hybrid'],
            default: 'Full-time',
        },
        applyLink: {
            type: String,
            required: [true, 'Please provide an application link'],
        },
        deadline: {
            type: Date,
            required: [true, 'Please provide a deadline'],
        },
        isPaid: {
            type: Boolean,
            default: true,
        },
        postedDate: {
            type: Date,
            default: Date.now,
        },
        isHighlighted: {
            type: Boolean,
            default: false,
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

// Index for search and filtering
opportunitySchema.index({ category: 1 });
opportunitySchema.index({ type: 1 });
opportunitySchema.index({ deadline: 1 });
opportunitySchema.index({ title: 'text', description: 'text', company: 'text' });

const Opportunity = mongoose.model('Opportunity', opportunitySchema);
export default Opportunity;
