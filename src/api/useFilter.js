import {useState, useCallback, useRef} from "react";

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
  const timeoutRef = useRef(null);

  const handleFilter = useCallback((field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }))

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      setFilters(prevFilters => {
        const currentValue = prevFilters[field];
        const trimmedValue = currentValue.trim();

        const updateActiveFilters = {...activeFilters};

        if (trimmedValue === "") {
          delete updateActiveFilters[field];
        } else {
          updateActiveFilters[field] = trimmedValue;
        }

        setActiveFilters(updateActiveFilters);

        fetchUsers(null, null, 1, newActiveFilters);

        return prevFilters;
      })
    }, 300)
  }, [fetchUsers, activeFilters])

  const clearFilters = useCallback(() => {

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

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

  const cleanup = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, [])

  return {
    filters,
    activeFilters,
    handleFilter,
    clearFilters,
    cleanup,
  }
}

export default useFilter;