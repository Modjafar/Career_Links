import { Link } from 'react-router-dom';
import { FaExternalLinkAlt, FaBookmark, FaRegBookmark, FaEye, FaClock } from 'react-icons/fa';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import { formatDate, getDaysRemaining } from '../utils/helpers.js';
import { bookmarkService } from '../services/bookmarkService.js';

const OpportunityCard = ({ opportunity, onBookmarkToggle }) => {
    const { isAuthenticated } = useAuth();
    const [isBookmarked, setIsBookmarked] = useState(opportunity.isBookmarked || false);
    const [bookmarkLoading, setBookmarkLoading] = useState(false);

    const handleBookmark = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isAuthenticated) return;

        setBookmarkLoading(true);
        try {
            if (isBookmarked) {
                // Find bookmark ID - in a real implementation you'd pass this
                await bookmarkService.removeBookmark(opportunity.bookmarkId);
                setIsBookmarked(false);
            } else {
                await bookmarkService.addBookmark(opportunity._id, 'opportunity');

                setIsBookmarked(true);
            }
            onBookmarkToggle?.(opportunity._id, !isBookmarked);
        } catch (error) {
            console.error('Bookmark error:', error);
        } finally {
            setBookmarkLoading(false);
        }
    };

    const daysRemaining = getDaysRemaining(opportunity.deadline);
    const isClosingSoon = daysRemaining <= 3 && daysRemaining >= 0;
    const isExpired = daysRemaining < 0;

    const typeColors = {
        'Job': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
        'Internship': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
        'Course': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    };

    return (
        <div className="card group relative">
            {/* Highlighted Badge */}
            {opportunity.isHighlighted && (
                <div className="absolute top-3 right-3 z-10">
                    <span className="badge badge-warning text-xs">
                        ⭐ Featured
                    </span>
                </div>
            )}

            <div className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <span className={`badge text-xs ${typeColors[opportunity.type] || 'bg-gray-100 text-gray-800'}`}>
                                {opportunity.type}
                            </span>
                            <span className="badge badge-info text-xs">
                                {opportunity.category}
                            </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                            <Link to={`/opportunities/${opportunity._id}`}>
                                {opportunity.title}
                            </Link>
                        </h3>
                    </div>
                </div>

                {/* Company */}
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 font-medium">
                    {opportunity.company}
                </p>

                {/* Description */}
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                    {opportunity.description || 'No description available.'}
                </p>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                    {opportunity.stipend && opportunity.stipend !== 'Not Specified' && (
                        <div className="text-gray-600 dark:text-gray-400">
                            <span className="font-medium">💰</span> {opportunity.stipend}
                        </div>
                    )}
                    {opportunity.duration && (
                        <div className="text-gray-600 dark:text-gray-400">
                            <span className="font-medium">📅</span> {opportunity.duration}
                        </div>
                    )}
                    {opportunity.workType && (
                        <div className="text-gray-600 dark:text-gray-400">
                            <span className="font-medium">🏢</span> {opportunity.workType}
                        </div>
                    )}
                </div>

                {/* Deadline Status */}
                <div className={`flex items-center gap-2 text-xs mb-4 ${isExpired
                    ? 'text-red-600 dark:text-red-400'
                    : isClosingSoon
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-green-600 dark:text-green-400'
                    }`}>
                    <FaClock />
                    {isExpired ? (
                        <span>Expired on {formatDate(opportunity.deadline)}</span>
                    ) : (
                        <span>
                            {daysRemaining === 0
                                ? 'Closes today!'
                                : `${daysRemaining} day${daysRemaining !== 1 ? 's' : ''} left`}
                            • Deadline: {formatDate(opportunity.deadline)}
                        </span>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                            <FaEye />
                            {opportunity.views || 0}
                        </span>
                        <span>•</span>
                        <span>{formatDate(opportunity.postedDate || opportunity.createdAt)}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Bookmark Button */}
                        {isAuthenticated && (
                            <button
                                onClick={handleBookmark}
                                disabled={bookmarkLoading}
                                className={`p-2 rounded-lg transition-colors ${isBookmarked
                                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30'
                                    : 'text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                                title={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
                            >
                                {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
                            </button>
                        )}

                        {/* Apply Link */}
                        <a
                            href={opportunity.applyLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                            onClick={(e) => e.stopPropagation()}
                        >
                            Apply
                            <FaExternalLinkAlt className="text-xs" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OpportunityCard;
