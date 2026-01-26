import {useState, useCallback, useRef} from "react";

const useFilter = (fetchUsers) => {
  const [activeFilters, setActiveFilters] = useState({})
  const timeoutRef = useRef(null);

  const handleFilter = useCallback((field, value) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      const trimmed = value.trim();
      const newFilters = trimmed ? {[field]: trimmed} : {};

      setActiveFilters(newFilters);
      fetchUsers(null, null, 1, newFilters);
    }, 300)
  }, [fetchUsers])

  const clearFilters = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setActiveFilters({})
    fetchUsers(null, null, 1)
  }, [fetchUsers])

  const cleanup = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, [])

  return {
    activeFilters,
    handleFilter,
    clearFilters,
    cleanup,
  }
}

export default useFilter;