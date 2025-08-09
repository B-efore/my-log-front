const Pagination = ({
    pagination,
    onPageChange,
    generatePageNumbers
}) => {
    return (
        <div className="mx-auto my-12">

            {pagination.currentPage > 0 && (
                <span
                    className="mx-[5px] cursor-pointer hover:text-violet-500"
                    onClick={() => onPageChange(0)}
                >
                    {'<<'}
                </span>
            )}

            {pagination.currentPage > 0 && (
                <span
                    className="mx-[5px] cursor-pointer hover:text-violet-500"
                    onClick={() => onPageChange(pagination.currentPage - 1)}
                >
                    {'<'}
                </span>
            )}

            {generatePageNumbers().map(pageNum => (
                <span
                    key={pageNum}
                    className={`mx-[5px] cursor-pointer hover:text-violet-500 ${pagination.currentPage + 1 === pageNum ? 'text-violet-500 font-black' : ''}`}
                    onClick={() => onPageChange(pageNum - 1)}
                >
                    {pageNum}
                </span>
            ))}

            {pagination.currentPage + 1 < pagination.totalPages && (
                <span
                    className="mx-[5px] cursor-pointer hover:text-violet-500"
                    onClick={() => onPageChange(pagination.currentPage + 1)}
                >
                    {'>'}
                </span>
            )}

            {pagination.currentPage + 1 < pagination.totalPages && (
                <span
                    className="mx-[5px] cursor-pointer hover:text-violet-500"
                    onClick={() => onPageChange(pagination.totalPages - 1)}
                >
                    {'>>'}
                </span>
            )}
        </div>
    )
}

export default Pagination;