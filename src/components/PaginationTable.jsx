const PaginationTable = ({page, totalPage, onPageChange}) => {
  return (
    <div>
      <button
        type="button"
        disabled={page === 1}
        onClick={() => {
         onPageChange(1)
        }}
      >
        На первую страницу
      </button>

      <button
        type="button"
        disabled={page === 1}
        onClick={() => {
          onPageChange(page -1)
        }}
      >
        Назад
      </button>

      <span>
          {page} / {totalPage || 1}
        </span>
      <button
        type="button"
        disabled={page >= totalPage}
        onClick={() => {
          onPageChange(page + 1)
        }}
      >
        Вперед
      </button>
    </div>
  )
}

export default PaginationTable;