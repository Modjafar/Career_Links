import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaExternalLinkAlt, FaCalendarAlt, FaClock, FaBookmark, FaRegBookmark, FaFileAlt, FaClipboardList } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth.js';
import { examService } from '../services/examService.js';
import { bookmarkService } from '../services/bookmarkService.js';
import { formatDate, getDaysRemaining } from '../utils/helpers.js';
import LoadingSkeleton from '../components/LoadingSkeleton.jsx';
import { toast } from 'react-toastify';

const ExamDetail = () => {
    const { id } = useParams();
    const { isAuthenticated } = useAuth();
    const [exam, setExam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        const fetchExam = async () => {
            try {
                setLoading(true);
                const response = await examService.getExam(id);
                setExam(response.data);
            } catch (error) {
                toast.error('Failed to load exam details');
            } finally {
                setLoading(false);
            }
        };

        fetchExam();
    }, [id]);

    const handleBookmark = async () => {
        if (!isAuthenticated) {
            toast.info('Please login to bookmark');
            return;
        }

        try {
            if (isBookmarked) {
                await bookmarkService.removeBookmark(exam.bookmarkId);
                setIsBookmarked(false);
                toast.success('Bookmark removed');
            } else {
                await bookmarkService.addBookmark(exam._id, 'exam');
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

    if (!exam) {
        return (
            <div className="container-custom py-16 text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Exam not found</h2>
                <Link to="/exams" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Back to exams
                </Link>
            </div>
        );
    }

    const regDaysRemaining = getDaysRemaining(exam.registrationLastDate);
    const isRegExpired = regDaysRemaining < 0;
    const isRegClosingSoon = regDaysRemaining <= 3 && regDaysRemaining >= 0;

    const statusColors = {
        'Active': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
        'Upcoming': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
        'Closed': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
        'Result Declared': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    };

    return (
        <div className="container-custom py-8 fade-in">
            {/* Back Link */}
            <Link
                to="/exams"
                className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 transition-colors"
            >
                <FaArrowLeft />
                Back to Exams
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 md:p-8">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <div className="flex items-center gap-2 mb-3 flex-wrap">
                                    <span className={`badge text-sm ${statusColors[exam.status] || 'bg-gray-100 text-gray-800'}`}>
                                        {exam.status}
                                    </span>
                                    <span className="badge badge-info text-sm">{exam.category}</span>
                                    {exam.isNew && <span className="badge badge-warning text-sm">🆕 New</span>}
                                </div>
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                                    {exam.examTitle}
                                </h1>
                                <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">{exam.organization}</p>
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
                        {exam.description && (
                            <div className="mb-8">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">About this Exam</h2>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{exam.description}</p>
                            </div>
                        )}

                        {/* Eligibility */}
                        {exam.eligibility && (
                            <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                                <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-2 flex items-center gap-2">
                                    <FaClipboardList />
                                    Eligibility Criteria
                                </h2>
                                <p className="text-blue-800 dark:text-blue-400">{exam.eligibility}</p>
                            </div>
                        )}

                        {/* Exam Pattern */}
                        {exam.examPattern && (
                            <div className="mb-8">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Exam Pattern</h2>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{exam.examPattern}</p>
                            </div>
                        )}

                        {/* Important Links */}
                        <div className="flex flex-wrap gap-3">
                            <a
                                href={exam.applyLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
                            >
                                Apply Online
                                <FaExternalLinkAlt />
                            </a>
                            {exam.syllabusLink && (
                                <a
                                    href={exam.syllabusLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                                >
                                    <FaFileAlt />
                                    Syllabus
                                </a>
                            )}
                            {exam.notificationLink && (
                                <a
                                    href={exam.notificationLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                                >
                                    <FaFileAlt />
                                    Official Notification
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 sticky top-24">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Important Dates</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <FaCalendarAlt className="text-blue-600 dark:text-blue-400 text-sm" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Registration Starts</p>
                                    <p className="font-medium text-gray-900 dark:text-white">{formatDate(exam.registrationStartDate)}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isRegClosingSoon && !isRegExpired ? 'bg-amber-100 dark:bg-amber-900/30' : 'bg-red-100 dark:bg-red-900/30'
                                    }`}>
                                    <FaClock className={`text-sm ${isRegClosingSoon && !isRegExpired ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'
                                        }`} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Registration Ends</p>
                                    <p className={`font-medium ${isRegClosingSoon && !isRegExpired ? 'text-amber-600 dark:text-amber-400' : 'text-gray-900 dark:text-white'
                                        }`}>
                                        {formatDate(exam.registrationLastDate)}
                                    </p>
                                    {!isRegExpired && (
                                        <p className={`text-xs mt-1 ${isRegClosingSoon ? 'text-amber-600 dark:text-amber-400 font-medium' : 'text-green-600 dark:text-green-400'
                                            }`}>
                                            {regDaysRemaining === 0 ? 'Closes today!' : `${regDaysRemaining} days left`}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <FaCalendarAlt className="text-purple-600 dark:text-purple-400 text-sm" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Exam Date</p>
                                    <p className="font-medium text-gray-900 dark:text-white">{formatDate(exam.examDate)}</p>
                                </div>
                            </div>

                            {exam.admitCardDate && (
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <FaCalendarAlt className="text-orange-600 dark:text-orange-400 text-sm" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Admit Card</p>
                                        <p className="font-medium text-gray-900 dark:text-white">{formatDate(exam.admitCardDate)}</p>
                                    </div>
                                </div>
                            )}

                            {exam.resultDate && (
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <FaCalendarAlt className="text-green-600 dark:text-green-400 text-sm" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Result Date</p>
                                        <p className="font-medium text-gray-900 dark:text-white">{formatDate(exam.resultDate)}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExamDetail;
