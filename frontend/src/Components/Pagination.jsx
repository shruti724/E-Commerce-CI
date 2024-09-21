import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
      console.log("totalPages: ", totalPages);
    }
  };

  return (
    <div className="mt-4 flex items-center justify-between">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`rounded-md px-4 py-2 ${
          currentPage === 1
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-700"
        } font-semibold text-white`}
        aria-label="Previous page"
      >
        Previous
      </button>

      <span>
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`rounded-md px-4 py-2 ${
          currentPage === totalPages
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-700"
        } font-semibold text-white`}
        aria-label="Next page"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
