import { useState, useEffect, useCallback } from 'react';
import { FaBriefcase } from 'react-icons/fa';
import OpportunityCard from '../components/OpportunityCard.jsx';
import FilterBar from '../components/FilterBar.jsx';
import Pagination from '../components/Pagination.jsx';
import LoadingSkeleton from '../components/LoadingSkeleton.jsx';
import { opportunityService } from '../services/opportunityService.js';
import { OPPORTUNITY_CATEGORIES, ITEMS_PER_PAGE } from '../utils/constants.js';
import { toast } from 'react-toastify';

const Internships = () => {
    const [opportunities, setOpportunities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
    });
    const [filters, setFilters] = useState({
        page: 1,
        category: 'all',
        search: '',
    });

    const fetchOpportunities = useCallback(async () => {
        try {
            setLoading(true);
            const response = await opportunityService.getOpportunities({
                ...filters,
                type: 'Internship',
            });
            setOpportunities(response.data || []);
            setPagination(response.pagination || { currentPage: 1, totalPages: 1, totalItems: 0 });
        } catch (error) {
            toast.error('Failed to load internships');
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        fetchOpportunities();
    }, [fetchOpportunities]);

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
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                        <FaBriefcase className="text-green-600 dark:text-green-400" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Internships</h1>
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                    Find internships to kickstart your career and gain valuable experience
                </p>
            </div>

            <FilterBar
                filters={filters}
                onFilterChange={handleFilterChange}
                onSearch={handleSearch}
                categories={OPPORTUNITY_CATEGORIES}
                showType={false}
                placeholder="Search internships..."
            />

            {loading ? (
                <LoadingSkeleton count={6} />
            ) : opportunities.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {opportunities.map((opp) => (
                            <OpportunityCard key={opp._id} opportunity={opp} />
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
                    <FaBriefcase className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No internships found</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                        Try adjusting your filters or search query
                    </p>
                </div>
            )}
        </div>
    );
};

export default Internships;
