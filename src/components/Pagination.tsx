export default function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}: {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (value: number) => void;
}) {
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className='flex gap-[10px] items-center justify-center'>
      <button
        onClick={() => handlePrevPage()}
        disabled={currentPage === 1}
        className='px-[15px] py-[8px] bg-red-800 disabled:bg-red-800/50 rounded-lg'
      >
        ◀
      </button>
      <span>
        Страница {currentPage} из {totalPages}
      </span>
      <button
        onClick={() => handleNextPage()}
        disabled={currentPage === totalPages}
        className='px-[15px] py-[8px] bg-red-800 disabled:bg-red-800/50 rounded-lg'
      >
        ▶
      </button>
    </div>
  );
}
