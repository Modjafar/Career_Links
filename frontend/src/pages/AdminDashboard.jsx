import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    FaUsers, FaBriefcase, FaClipboardList, FaChartBar,
    FaPlus, FaEdit, FaTrash, FaExternalLinkAlt, FaCrown
} from 'react-icons/fa';
import { adminService } from '../services/adminService.js';
import { opportunityService } from '../services/opportunityService.js';
import { examService } from '../services/examService.js';
import { formatDate } from '../utils/helpers.js';
import LoadingSkeleton from '../components/LoadingSkeleton.jsx';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [recentOpportunities, setRecentOpportunities] = useState([]);
    const [recentExams, setRecentExams] = useState([]);
    const [topCategories, setTopCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState('overview');

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const response = await adminService.getDashboardStats();
                setStats(response.data.stats);
                setRecentOpportunities(response.data.recentOpportunities || []);
                setRecentExams(response.data.recentExams || []);
                setTopCategories(response.data.topCategories || []);
            } catch (error) {
                toast.error('Failed to load admin dashboard');
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const handleDeleteOpportunity = async (id) => {
        if (!confirm('Are you sure you want to delete this opportunity?')) return;
        try {
            await opportunityService.deleteOpportunity(id);
            setRecentOpportunities((prev) => prev.filter((o) => o._id !== id));
            toast.success('Opportunity deleted');
        } catch (error) {
            toast.error('Failed to delete opportunity');
        }
    };

    const handleDeleteExam = async (id) => {
        if (!confirm('Are you sure you want to delete this exam?')) return;
        try {
            await examService.deleteExam(id);
            setRecentExams((prev) => prev.filter((e) => e._id !== id));
            toast.success('Exam deleted');
        } catch (error) {
            toast.error('Failed to delete exam');
        }
    };

    const handleHighlight = async (id) => {
        try {
            await adminService.highlightOpportunity(id);
            setRecentOpportunities((prev) =>
                prev.map((o) => (o._id === id ? { ...o, isHighlighted: !o.isHighlighted } : o))
            );
            toast.success('Highlight toggled');
        } catch (error) {
            toast.error('Failed to toggle highlight');
        }
    };

    if (loading) {
        return (
            <div className="container-custom py-8">
                <LoadingSkeleton count={3} />
            </div>
        );
    }

    const statCards = [
        { icon: FaUsers, label: 'Total Users', value: stats?.totalUsers || 0, color: 'bg-blue-500' },
        { icon: FaBriefcase, label: 'Opportunities', value: stats?.totalOpportunities || 0, color: 'bg-green-500' },
        { icon: FaClipboardList, label: 'Exams', value: stats?.totalExams || 0, color: 'bg-orange-500' },
        { icon: FaChartBar, label: 'Active', value: (stats?.activeOpportunities || 0) + (stats?.activeExams || 0), color: 'bg-purple-500' },
    ];

    return (
        <div className="container-custom py-8 fade-in">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                        <FaCrown className="text-yellow-500" />
                        Admin Dashboard
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Manage opportunities, exams, and users</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link to="/jobs" className="btn-primary text-sm flex items-center gap-2">
                        <FaPlus />
                        Add Opportunity
                    </Link>
                    <Link to="/exams" className="btn-outline text-sm flex items-center gap-2">
                        <FaPlus />
                        Add Exam
                    </Link>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <div key={card.label} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{card.label}</p>
                                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{card.value}</p>
                                </div>
                                <div className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center`}>
                                    <Icon className="text-white text-xl" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Top Categories */}
            {topCategories.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Categories</h2>
                    <div className="space-y-3">
                        {topCategories.map((cat) => (
                            <div key={cat._id} className="flex items-center gap-4">
                                <span className="text-sm text-gray-600 dark:text-gray-400 w-32">{cat._id}</span>
                                <div className="flex-1 h-4 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-500 rounded-full transition-all duration-500"
                                        style={{
                                            width: `${Math.min(100, (cat.count / (topCategories[0]?.count || 1)) * 100)}%`,
                                        }}
                                    />
                                </div>
                                <span className="text-sm font-medium text-gray-900 dark:text-white w-12 text-right">
                                    {cat.count}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Recent Opportunities */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden mb-8">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Opportunities</h2>
                    <Link to="/jobs" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                        View All
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Title</th>
                                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Type</th>
                                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Category</th>
                                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Deadline</th>
                                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {recentOpportunities.map((opp) => (
                                <tr key={opp._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {opp.isHighlighted && <FaCrown className="text-yellow-500 text-sm" />}
                                            <span className="font-medium text-gray-900 dark:text-white">{opp.title}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="badge text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                            {opp.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{opp.category}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                        {formatDate(opp.deadline)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleHighlight(opp._id)}
                                                className={`p-2 rounded-lg transition-colors ${opp.isHighlighted
                                                    ? 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30'
                                                    : 'text-gray-400 hover:text-yellow-600'
                                                    }`}
                                                title="Toggle highlight"
                                            >
                                                <FaCrown />
                                            </button>
                                            <Link
                                                to={`/opportunities/${opp._id}`}
                                                className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                                                title="View"
                                            >
                                                <FaExternalLinkAlt />
                                            </Link>
                                            <button
                                                onClick={() => handleDeleteOpportunity(opp._id)}
                                                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                                                title="Delete"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Recent Exams */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Exams</h2>
                    <Link to="/exams" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                        View All
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Title</th>
                                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Category</th>
                                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
                                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Exam Date</th>
                                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {recentExams.map((exam) => (
                                <tr key={exam._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{exam.examTitle}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{exam.category}</td>
                                    <td className="px-6 py-4">
                                        <span className={`badge text-xs ${exam.status === 'Active'
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                            : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {exam.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                        {formatDate(exam.examDate)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Link
                                                to={`/exams/${exam._id}`}
                                                className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                                                title="View"
                                            >
                                                <FaExternalLinkAlt />
                                            </Link>
                                            <button
                                                onClick={() => handleDeleteExam(exam._id)}
                                                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                                                title="Delete"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
