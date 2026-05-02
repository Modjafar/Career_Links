import { FaChevronLeft, FaChevronRight, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';

const Pagination = ({ currentPage, totalPages, totalItems, onPageChange, itemsPerPage = 10 }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return { pages, showStartEllipsis: start > 1, showEndEllipsis: end < totalPages };
  };

  const { pages, showStartEllipsis, showEndEllipsis } = getPageNumbers();

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
      {/* Info */}
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Showing <span className="font-medium">{startItem}</span>–<span className="font-medium">{endItem}</span> of{' '}
        <span className="font-medium">{totalItems}</span> results
      </p>

      {/* Navigation */}
      <nav className="flex items-center gap-1" aria-label="Pagination">
        {/* First Page */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          title="First page"
        >
          <FaAngleDoubleLeft className="text-sm" />
        </button>

        {/* Previous Page */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          title="Previous page"
        >
          <FaChevronLeft className="text-sm" />
        </button>

        {/* Start Ellipsis */}
        {showStartEllipsis && (
          <span className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">...</span>
        )}

        {/* Page Numbers */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`min-w-[2.5rem] px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === page
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
          >
            {page}
          </button>
        ))}

        {/* End Ellipsis */}
        {showEndEllipsis && (
          <span className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">...</span>
        )}

        {/* Next Page */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          title="Next page"
        >
          <FaChevronRight className="text-sm" />
        </button>

        {/* Last Page */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          title="Last page"
        >
          <FaAngleDoubleRight className="text-sm" />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
