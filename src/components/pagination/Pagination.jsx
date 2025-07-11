const Pagination = ({
    pagination,
    onPageChange,
    generatePageNumbers
}) => {
    return (
        <div className="mx-auto my-12">

            {pagination.currentPage > 1 && (
                <span
                    className="page-nav"
                    onClick={() => onPageChange(1)}
                >
                    {'<<'}
                </span>
            )}

            {pagination.currentPage > 1 && (
                <span
                    className="page-nav"
                    onClick={() => onPageChange(pagination.currentPage - 1)}
                >
                    {'<'}
                </span>
            )}

            {generatePageNumbers().map(pageNum => (
                <span
                    key={pageNum}
                    className={`page-number px-2 ${pagination.currentPage === pageNum ? 'active' : ''}`}
                    onClick={() => onPageChange(pageNum)}
                >
                    {pageNum}
                </span>
            ))}

            {pagination.currentPage < pagination.totalPages && (
                <span
                    className="page-nav"
                    onClick={() => onPageChange(pagination.currentPage + 1)}
                >
                    {'>'}
                </span>
            )}

            {pagination.currentPage < pagination.totalPages && (
                <span
                    className="page-nav"
                    onClick={() => onPageChange(pagination.totalPages)}
                >
                    {'>>'}
                </span>
            )}
        </div>
    )
}

export default Pagination;