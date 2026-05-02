import { useState } from 'react';
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa';

const FilterBar = ({
  filters,
  onFilterChange,
  onSearch,
  categories = [],
  types = [],
  statuses = [],
  showSearch = true,
  showCategory = true,
  showType = false,
  showStatus = false,
  placeholder = 'Search...',
}) => {
  const [localSearch, setLocalSearch] = useState(filters.search || '');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch?.(localSearch);
  };

  const clearFilters = () => {
    setLocalSearch('');
    onFilterChange?.({ category: 'all', type: 'all', status: 'all', search: '' });
    onSearch?.('');
  };

  const hasActiveFilters =
    (filters.category && filters.category !== 'all') ||
    (filters.type && filters.type !== 'all') ||
    (filters.status && filters.status !== 'all') ||
    localSearch;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-6 transition-colors duration-300">
      {/* Search Bar - Always visible */}
      {showSearch && (
        <form onSubmit={handleSearchSubmit} className="mb-4">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder={placeholder}
              className="input-field pl-12 pr-4 py-3"
            />
            {localSearch && (
              <button
                type="button"
                onClick={() => { setLocalSearch(''); onSearch?.(''); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            )}
          </div>
        </form>
      )}

      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-2">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg w-full justify-center"
        >
          <FaFilter />
          {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {/* Filter Controls */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 ${!showMobileFilters ? 'hidden lg:grid' : ''}`}>
        {/* Category Filter */}
        {showCategory && categories.length > 0 && (
          <select
            value={filters.category || 'all'}
            onChange={(e) => onFilterChange?.({ category: e.target.value })}
            className="input-field py-2.5 text-sm"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        )}

        {/* Type Filter */}
        {showType && types.length > 0 && (
          <select
            value={filters.type || 'all'}
            onChange={(e) => onFilterChange?.({ type: e.target.value })}
            className="input-field py-2.5 text-sm"
          >
            <option value="all">All Types</option>
            {types.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        )}

        {/* Status Filter */}
        {showStatus && statuses.length > 0 && (
          <select
            value={filters.status || 'all'}
            onChange={(e) => onFilterChange?.({ status: e.target.value })}
            className="input-field py-2.5 text-sm"
          >
            <option value="all">All Statuses</option>
            {statuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        )}

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
          >
            <FaTimes />
            Clear Filters
          </button>
        )}
      </div>

      {/* Active Filters Tags */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Active:</span>
          {filters.search && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full">
              Search: {filters.search}
              <button onClick={() => { setLocalSearch(''); onSearch?.(''); }} className="hover:text-blue-600">
                <FaTimes />
              </button>
            </span>
          )}
          {filters.category && filters.category !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded-full">
              {categories.find((c) => c.value === filters.category)?.label || filters.category}
              <button onClick={() => onFilterChange?.({ category: 'all' })} className="hover:text-green-600">
                <FaTimes />
              </button>
            </span>
          )}
          {filters.type && filters.type !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-xs rounded-full">
              {types.find((t) => t.value === filters.type)?.label || filters.type}
              <button onClick={() => onFilterChange?.({ type: 'all' })} className="hover:text-purple-600">
                <FaTimes />
              </button>
            </span>
          )}
          {filters.status && filters.status !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 text-xs rounded-full">
              {statuses.find((s) => s.value === filters.status)?.label || filters.status}
              <button onClick={() => onFilterChange?.({ status: 'all' })} className="hover:text-orange-600">
                <FaTimes />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterBar;
