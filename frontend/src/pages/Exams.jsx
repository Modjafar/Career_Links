import { useState, useEffect, useCallback } from 'react';
import { FaClipboardList } from 'react-icons/fa';
import ExamCard from '../components/ExamCard.jsx';
import FilterBar from '../components/FilterBar.jsx';
import Pagination from '../components/Pagination.jsx';
import LoadingSkeleton from '../components/LoadingSkeleton.jsx';
import { examService } from '../services/examService.js';
import { EXAM_CATEGORIES, EXAM_STATUSES, ITEMS_PER_PAGE } from '../utils/constants.js';
import { toast } from 'react-toastify';

const Exams = () => {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
    });
    const [filters, setFilters] = useState({
        page: 1,
        category: 'all',
        status: 'all',
        search: '',
    });

    const fetchExams = useCallback(async () => {
        try {
            setLoading(true);
            const response = await examService.getExams(filters);
            setExams(response.data || []);
            setPagination(response.pagination || { currentPage: 1, totalPages: 1, totalItems: 0 });
        } catch (error) {
            toast.error('Failed to load exams');
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        fetchExams();
    }, [fetchExams]);

    const handleFilterChange = (newFilters) => {
        setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
    };

    const handleSearch = (search) => {
        setFilters((prev) => ({ ...prev, search, page: 1 }));
    };

    const handlePageChange = (page) => {
        setFilters((prev) => ({ ...prev, page }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="container-custom py-8 fade-in">
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                        <FaClipboardList className="text-orange-600 dark:text-orange-400" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Competitive Exams</h1>
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                    Stay updated with government, banking, SSC, UPSC, and other competitive exams
                </p>
            </div>

            <FilterBar
                filters={filters}
                onFilterChange={handleFilterChange}
                onSearch={handleSearch}
                categories={EXAM_CATEGORIES}
                statuses={EXAM_STATUSES}
                showCategory={true}
                showStatus={true}
                placeholder="Search exams..."
            />

            {loading ? (
                <LoadingSkeleton count={6} />
            ) : exams.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {exams.map((exam) => (
                            <ExamCard key={exam._id} exam={exam} />
                        ))}
                    </div>
                    <Pagination
                        currentPage={pagination.currentPage}
                        totalPages={pagination.totalPages}
                        totalItems={pagination.totalItems}
                        itemsPerPage={ITEMS_PER_PAGE}
                        onPageChange={handlePageChange}
                    />
                </>
            ) : (
                <div className="text-center py-16">
                    <FaClipboardList className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No exams found</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                        Try adjusting your filters or search query
                    </p>
                </div>
            )}
        </div>
    );
};

export default Exams;
