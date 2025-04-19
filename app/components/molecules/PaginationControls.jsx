'use client';

const PaginationControls = ({ 
  currentPage, 
  totalPages,
  onPageChange
}) => {
  const handlePrev = () => onPageChange(Math.max(1, currentPage - 1));
  const handleNext = () => onPageChange(Math.min(totalPages, currentPage + 1));

  return (
    <div className="flex justify-center items-center gap-4 mt-4">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded ${
          currentPage === 1 
            ? 'bg-gray-300 cursor-not-allowed' 
            : 'bg-primary text-white hover:bg-primary/90'
        }`}
      >
        Previous
      </button>
      
      <span className="text-dark">
        Page {currentPage} of {totalPages}
      </span>
      
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded ${
          currentPage === totalPages
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-primary text-white hover:bg-primary/90'
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;