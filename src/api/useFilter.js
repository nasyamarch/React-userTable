import {useState, useCallback} from "react";

const useFilter = (fetchUsers) => {
  const [filters, setFilters] = useState({
    lastName: '',
    firstName: '',
    maidenName: '',
    age: '',
    gender: '',
    phone: '',
  })

  const [activeFilters, setActiveFilters] = useState({})

  const handleFilter = useCallback((field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }))

    const newActiveFilters = {...activeFilters};
    if (value.trim() === '') {
      delete newActiveFilters[field];
    } else {
      newActiveFilters[field] = value.trim();
    }

    setActiveFilters(newActiveFilters);

    const timeoutId = setTimeout(() => {
      fetchUsers(null, null, 1, newActiveFilters);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [activeFilters, fetchUsers])

const clearFilters = useCallback(() => {
  setFilters({
    lastName: '',
    firstName: '',
    maidenName: '',
    age: '',
    gender: '',
    phone: '',
  })
  setActiveFilters({})
  fetchUsers(null, null, 1)
}, [fetchUsers])

return {
  filters,
  activeFilters,
  handleFilter,
  clearFilters,
}
}

export default useFilter;





