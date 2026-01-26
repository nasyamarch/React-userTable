
const FilterInput = ({
  field,
  value,
  onFilterChange,
  placeholder = "Фильтр...",
}) => {
  const handleChange = (e) => {
    onFilterChange(field, e.target.value);
  }
  return (
    <div
    className="filter-input">
      <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className="filter-field"
      />

    </div>
  )
}

export default FilterInput;