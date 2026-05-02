import { Link } from 'react-router-dom';
import { FaExternalLinkAlt, FaBookmark, FaRegBookmark, FaEye, FaClock, FaCalendarAlt } from 'react-icons/fa';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import { formatDate, getDaysRemaining } from '../utils/helpers.js';
import { bookmarkService } from '../services/bookmarkService.js';

const ExamCard = ({ exam, onBookmarkToggle }) => {
  const { isAuthenticated } = useAuth();
  const [isBookmarked, setIsBookmarked] = useState(exam.isBookmarked || false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);

  const handleBookmark = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) return;

    setBookmarkLoading(true);
    try {
      if (isBookmarked) {
        await bookmarkService.removeBookmark(exam.bookmarkId);
        setIsBookmarked(false);
      } else {
        await bookmarkService.addBookmark(exam._id, 'exam');

        setIsBookmarked(true);
      }
      onBookmarkToggle?.(exam._id, !isBookmarked);
    } catch (error) {
      console.error('Bookmark error:', error);
    } finally {
      setBookmarkLoading(false);
    }
  };

  const regDaysRemaining = getDaysRemaining(exam.registrationLastDate);
  const isRegClosingSoon = regDaysRemaining <= 3 && regDaysRemaining >= 0;
  const isRegExpired = regDaysRemaining < 0;
  const examDaysRemaining = getDaysRemaining(exam.examDate);

  const statusColors = {
    'Active': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    'Upcoming': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    'Closed': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    'Result Declared': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  };

  const notificationColors = {
    'Active-Form': 'badge-success',
    'Closing-Soon': 'badge-warning',
    'Upcoming': 'badge-info',
    'New-Today': 'badge-info',
    'Result-Declared': 'badge-success',
  };

  return (
    <div className="card group relative">
      {exam.isNew && (
        <div className="absolute top-3 left-3 z-10">
          <span className="badge badge-warning text-xs animate-pulse">🆕 New</span>
        </div>
      )}

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className={`badge text-xs ${statusColors[exam.status] || 'bg-gray-100 text-gray-800'}`}>
                {exam.status}
              </span>
              <span className={`badge text-xs ${notificationColors[exam.notification] || 'badge-info'}`}>
                {exam.notification?.replace('-', ' ')}
              </span>
              <span className="badge badge-info text-xs">{exam.category}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
              <Link to={`/exams/${exam._id}`}>{exam.examTitle}</Link>
            </h3>
          </div>
        </div>

        {/* Organization */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 font-medium">{exam.organization}</p>

        {/* Description */}
        {exam.description && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">{exam.description}</p>
        )}

        {/* Eligibility */}
        {exam.eligibility && (
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-xs font-semibold text-blue-800 dark:text-blue-300 mb-1">Eligibility</p>
            <p className="text-xs text-blue-700 dark:text-blue-400 line-clamp-2">{exam.eligibility}</p>
          </div>
        )}

        {/* Dates */}
        <div className="space-y-2 mb-4 text-sm">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <FaCalendarAlt className="text-blue-500" />
            <span>
              Registration: {formatDate(exam.registrationStartDate)} -{' '}
              <span className={isRegClosingSoon && !isRegExpired ? 'text-amber-600 dark:text-amber-400 font-medium' : ''}>
                {formatDate(exam.registrationLastDate)}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <FaCalendarAlt className="text-purple-500" />
            <span>Exam Date: {formatDate(exam.examDate)}</span>
          </div>
          {exam.admitCardDate && (
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <FaCalendarAlt className="text-orange-500" />
              <span>Admit Card: {formatDate(exam.admitCardDate)}</span>
            </div>
          )}
        </div>

        {/* Countdown */}
        <div className={`mb-4 p-3 rounded-lg flex items-center gap-2 ${isRegExpired
          ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
          : isRegClosingSoon
            ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400'
            : 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
          }`}>
          <FaClock className={isRegClosingSoon && !isRegExpired ? 'animate-pulse' : ''} />
          <span className="text-sm font-medium">
            {isRegExpired ? (
              <>Registration Closed ({formatDate(exam.registrationLastDate)})</>
            ) : regDaysRemaining === 0 ? (
              <>⏰ Registration closes TODAY!</>
            ) : (
              <>
                <span className="font-bold">{regDaysRemaining}</span> day{regDaysRemaining !== 1 ? 's' : ''} left to apply
              </>
            )}
          </span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <FaEye />
              {exam.views || 0}
            </span>
            <span>•</span>
            <span>{formatDate(exam.createdAt)}</span>
          </div>

          <div className="flex items-center gap-2">
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

            <a
              href={exam.applyLink}
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

export default ExamCard;
