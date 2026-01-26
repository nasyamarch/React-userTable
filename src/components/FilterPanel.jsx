
const FilterPanel = ({activeFilters, clearFilters}) => {

  if (!Object.keys(activeFilters).length) return null
  return (
    <button
      onClick={clearFilters}
      className="userTable__clear-filters-button"
    >
      Очистить фильтры
    </button>

  )
}
export default FilterPanel;