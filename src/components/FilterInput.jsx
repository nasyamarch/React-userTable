const FilterInput = ({
                       field,
                       value,
                       onFilterChange,
                       placeholder,
                     }) => {
  const handleChange = (e) => {
    onFilterChange(field, e.target.value);
  }
  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={placeholder || "Filter..."}
      className="filter-field"
    />
  )
}

export default FilterInput;