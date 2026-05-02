import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaBookmark, FaBell, FaEdit, FaTrash, FaExternalLinkAlt, FaBriefcase, FaClipboardList } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth.js';
import { userService } from '../services/userService.js';
import { bookmarkService } from '../services/bookmarkService.js';
import { formatDate, getInitials, getAvatarColor } from '../utils/helpers.js';
import LoadingSkeleton from '../components/LoadingSkeleton.jsx';
import { toast } from 'react-toastify';

const Dashboard = () => {
    const { user, updateUser } = useAuth();
    const [profile, setProfile] = useState(null);
    const [bookmarks, setBookmarks] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('bookmarks');

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const [profileRes, bookmarksRes] = await Promise.all([
                    userService.getProfile(),
                    bookmarkService.getBookmarks(),
                ]);
                setProfile(profileRes.data);
                setBookmarks(bookmarksRes.data || []);
                setNotifications(profileRes.data?.notifications || []);
            } catch (error) {
                toast.error('Failed to load dashboard data');
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const handleRemoveBookmark = async (bookmarkId) => {
        try {
            await bookmarkService.removeBookmark(bookmarkId);
            setBookmarks((prev) => prev.filter((b) => b._id !== bookmarkId));
            toast.success('Bookmark removed');
        } catch (error) {
            toast.error('Failed to remove bookmark');
        }
    };

    const handleMarkNotificationRead = async (notificationId) => {
        try {
            await userService.markNotificationAsRead(notificationId);

            setNotifications((prev) =>
                prev.map((n) => (n._id === notificationId ? { ...n, read: true } : n))
            );
        } catch (error) {
            toast.error('Failed to mark notification as read');
        }
    };

    if (loading) {
        return (
            <div className="container-custom py-8">
                <LoadingSkeleton count={3} />
            </div>
        );
    }

    const avatarColor = getAvatarColor(user?.name?.length || 0);

    return (
        <div className="container-custom py-8 fade-in">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">My Dashboard</h1>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Profile Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 text-center">
                        <div className={`w-20 h-20 ${avatarColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                            <span className="text-2xl font-bold text-white">{getInitials(user?.name || 'User')}</span>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{user?.name}</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{user?.email}</p>
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <span className="badge badge-info text-xs capitalize">{user?.role || 'user'}</span>
                        </div>
                        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm">
                            <FaEdit />
                            Edit Profile
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mt-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{bookmarks.length}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Bookmarks</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                    {notifications.filter((n) => !n.read).length}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Unread</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3">
                    {/* Tabs */}
                    <div className="flex items-center gap-4 mb-6 border-b border-gray-200 dark:border-gray-700">
                        <button
                            onClick={() => setActiveTab('bookmarks')}
                            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'bookmarks'
                                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700'
                                }`}
                        >
                            <FaBookmark />
                            Bookmarks ({bookmarks.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('notifications')}
                            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'notifications'
                                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700'
                                }`}
                        >
                            <FaBell />
                            Notifications ({notifications.filter((n) => !n.read).length})
                        </button>
                    </div>

                    {/* Bookmarks Tab */}
                    {activeTab === 'bookmarks' && (
                        <div>
                            {bookmarks.length > 0 ? (
                                <div className="space-y-4">
                                    {bookmarks.map((bookmark) => {
                                        const item = bookmark.opportunityId || bookmark.examId;
                                        const isOpportunity = bookmark.itemType === 'opportunity';
                                        const Icon = isOpportunity ? FaBriefcase : FaClipboardList;

                                        if (!item) return null;

                                        return (
                                            <div
                                                key={bookmark._id}
                                                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 flex items-start gap-4"
                                            >
                                                <div className={`w-12 h-12 ${isOpportunity ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-orange-100 dark:bg-orange-900/30'
                                                    } rounded-lg flex items-center justify-center flex-shrink-0`}>
                                                    <Icon className={`${isOpportunity ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'
                                                        }`} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                                                        <Link
                                                            to={isOpportunity ? `/opportunities/${item._id}` : `/exams/${item._id}`}
                                                            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                                        >
                                                            {item.title || item.examTitle}
                                                        </Link>
                                                    </h3>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                        {item.company || item.organization} • {isOpportunity ? item.type : item.category}
                                                    </p>
                                                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                                        Bookmarked on {formatDate(bookmark.createdAt)}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2 flex-shrink-0">
                                                    <Link
                                                        to={isOpportunity ? `/opportunities/${item._id}` : `/exams/${item._id}`}
                                                        className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                                        title="View details"
                                                    >
                                                        <FaExternalLinkAlt />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleRemoveBookmark(bookmark._id)}
                                                        className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                                        title="Remove bookmark"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl">
                                    <FaBookmark className="text-5xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No bookmarks yet</h3>
                                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                                        Start bookmarking opportunities and exams to see them here
                                    </p>
                                    <div className="flex items-center justify-center gap-3">
                                        <Link to="/jobs" className="btn-primary text-sm">Browse Jobs</Link>
                                        <Link to="/exams" className="btn-outline text-sm">Browse Exams</Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Notifications Tab */}
                    {activeTab === 'notifications' && (
                        <div>
                            {notifications.length > 0 ? (
                                <div className="space-y-3">
                                    {notifications.map((notification) => (
                                        <div
                                            key={notification._id}
                                            className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 flex items-start gap-3 ${!notification.read ? 'border-l-4 border-blue-500' : ''
                                                }`}
                                        >
                                            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${notification.read ? 'bg-gray-300' : 'bg-blue-500'
                                                }`} />
                                            <div className="flex-1">
                                                <p className="text-sm text-gray-900 dark:text-white">{notification.message}</p>
                                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                                    {formatDate(notification.createdAt)}
                                                </p>
                                            </div>
                                            {!notification.read && (
                                                <button
                                                    onClick={() => handleMarkNotificationRead(notification._id)}
                                                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex-shrink-0"
                                                >
                                                    Mark read
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl">
                                    <FaBell className="text-5xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No notifications</h3>
                                    <p className="text-gray-500 dark:text-gray-400">You're all caught up!</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
