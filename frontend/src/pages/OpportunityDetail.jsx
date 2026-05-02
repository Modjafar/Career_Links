import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaExternalLinkAlt, FaBookmark, FaRegBookmark, FaEye, FaClock, FaBuilding, FaMoneyBillWave, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth.js';
import { opportunityService } from '../services/opportunityService.js';
import { bookmarkService } from '../services/bookmarkService.js';
import { formatDate, getDaysRemaining } from '../utils/helpers.js';
import LoadingSkeleton from '../components/LoadingSkeleton.jsx';
import { toast } from 'react-toastify';

const OpportunityDetail = () => {
    const { id } = useParams();
    const { isAuthenticated } = useAuth();
    const [opportunity, setOpportunity] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        const fetchOpportunity = async () => {
            try {
                setLoading(true);
                const response = await opportunityService.getOpportunity(id);
                setOpportunity(response.data);
            } catch (error) {
                toast.error('Failed to load opportunity details');
            } finally {
                setLoading(false);
            }
        };

        fetchOpportunity();
    }, [id]);

    const handleBookmark = async () => {
        if (!isAuthenticated) {
            toast.info('Please login to bookmark');
            return;
        }

        try {
            if (isBookmarked) {
                await bookmarkService.removeBookmark(opportunity.bookmarkId);
                setIsBookmarked(false);
                toast.success('Bookmark removed');
            } else {
                await bookmarkService.addBookmark(opportunity._id, 'opportunity');
                setIsBookmarked(true);
                toast.success('Bookmark added');
            }
        } catch (error) {
            toast.error('Bookmark action failed');
        }
    };

    if (loading) {
        return (
            <div className="container-custom py-8">
                <LoadingSkeleton count={1} />
            </div>
        );
    }

    if (!opportunity) {
        return (
            <div className="container-custom py-16 text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Opportunity not found</h2>
                <Link to="/jobs" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Back to opportunities
                </Link>
            </div>
        );
    }

    const daysRemaining = getDaysRemaining(opportunity.deadline);
    const isExpired = daysRemaining < 0;
    const isClosingSoon = daysRemaining <= 3 && daysRemaining >= 0;

    const typeColors = {
        'Job': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
        'Internship': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
        'Course': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    };

    return (
        <div className="container-custom py-8 fade-in">
            {/* Back Link */}
            <Link
                to="/jobs"
                className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 transition-colors"
            >
                <FaArrowLeft />
                Back to Opportunities
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 md:p-8">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <div className="flex items-center gap-2 mb-3 flex-wrap">
                                    <span className={`badge text-sm ${typeColors[opportunity.type] || 'bg-gray-100 text-gray-800'}`}>
                                        {opportunity.type}
                                    </span>
                                    <span className="badge badge-info text-sm">{opportunity.category}</span>
                                    {opportunity.isHighlighted && <span className="badge badge-warning text-sm">⭐ Featured</span>}
                                </div>
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                                    {opportunity.title}
                                </h1>
                                <p className="text-lg text-gray-600 dark:text-gray-400 mt-1 flex items-center gap-2">
                                    <FaBuilding />
                                    {opportunity.company}
                                </p>
                            </div>
                            {isAuthenticated && (
                                <button
                                    onClick={handleBookmark}
                                    className={`p-3 rounded-xl transition-colors ${isBookmarked
                                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30'
                                        : 'text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-50 dark:bg-gray-700'
                                        }`}
                                    title={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
                                >
                                    {isBookmarked ? <FaBookmark className="text-xl" /> : <FaRegBookmark className="text-xl" />}
                                </button>
                            )}
                        </div>

                        {/* Description */}
                        {opportunity.description && (
                            <div className="mb-8">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">About this {opportunity.type}</h2>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{opportunity.description}</p>
                            </div>
                        )}

                        {/* Eligibility */}
                        {opportunity.eligibility && (
                            <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                                <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-2">Eligibility</h2>
                                <p className="text-blue-800 dark:text-blue-400">{opportunity.eligibility}</p>
                            </div>
                        )}

                        {/* Apply Button */}
                        <a
                            href={opportunity.applyLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors text-lg"
                        >
                            Apply Now
                            <FaExternalLinkAlt />
                        </a>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 sticky top-24">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Details</h3>
                        <div className="space-y-4">
                            {opportunity.stipend && opportunity.stipend !== 'Not Specified' && (
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <FaMoneyBillWave className="text-green-600 dark:text-green-400 text-sm" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Stipend/Salary</p>
                                        <p className="font-medium text-gray-900 dark:text-white">{opportunity.stipend}</p>
                                    </div>
                                </div>
                            )}

                            {opportunity.duration && (
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <FaCalendarAlt className="text-blue-600 dark:text-blue-400 text-sm" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
                                        <p className="font-medium text-gray-900 dark:text-white">{opportunity.duration}</p>
                                    </div>
                                </div>
                            )}

                            {opportunity.workType && (
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <FaMapMarkerAlt className="text-purple-600 dark:text-purple-400 text-sm" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Work Type</p>
                                        <p className="font-medium text-gray-900 dark:text-white">{opportunity.workType}</p>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-start gap-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isClosingSoon && !isExpired ? 'bg-amber-100 dark:bg-amber-900/30' : 'bg-red-100 dark:bg-red-900/30'
                                    }`}>
                                    <FaClock className={`text-sm ${isClosingSoon && !isExpired ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'
                                        }`} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Application Deadline</p>
                                    <p className={`font-medium ${isClosingSoon && !isExpired ? 'text-amber-600 dark:text-amber-400' : 'text-gray-900 dark:text-white'
                                        }`}>
                                        {formatDate(opportunity.deadline)}
                                    </p>
                                    {!isExpired && (
                                        <p className={`text-xs mt-1 ${isClosingSoon ? 'text-amber-600 dark:text-amber-400 font-medium' : 'text-green-600 dark:text-green-400'
                                            }`}>
                                            {daysRemaining === 0 ? 'Closes today!' : `${daysRemaining} days left`}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <FaEye className="text-gray-600 dark:text-gray-400 text-sm" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Views</p>
                                    <p className="font-medium text-gray-900 dark:text-white">{opportunity.views || 0}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <FaCalendarAlt className="text-gray-600 dark:text-gray-400 text-sm" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Posted On</p>
                                    <p className="font-medium text-gray-900 dark:text-white">
                                        {formatDate(opportunity.postedDate || opportunity.createdAt)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OpportunityDetail;
