import {useState} from "react";

const useSort = (users, setUsers, originalUsers) => {
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  const handleSort = (field) => {
    let newSortOrder = "asc";

    if (sortField === field) {
      if (sortOrder === 'asc') newSortOrder = 'desc';
      else if (sortOrder === 'desc') newSortOrder = 'none';
      else newSortOrder = 'asc';
    }

    setSortField(field);
    setSortOrder(newSortOrder);

    if (newSortOrder === 'none') {
      setUsers([...originalUsers]);
      return;
    }

    const sourceArray = sortOrder === 'none' ? [...originalUsers] : [...users];

    const sorted = sourceArray.sort((a, b) => {
      const getValue = (obj, path) => {
        return path.split('.').reduce((acc, key) => acc?.[key], obj);
      };

      const aValue = getValue(a, field);
      const bValue = getValue(b, field);

      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return 1;
      if (bValue == null) return -1;

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue, undefined, {
          sensitivity: 'base',
          numeric: true
        });
        return newSortOrder === 'asc' ? comparison : -comparison;
      }

      const comparison = (aValue < bValue ? -1 : (aValue > bValue ? 1 : 0));
      return newSortOrder === 'asc' ? comparison : -comparison;
    });

    setUsers(sorted);
  }

  return { sortField, sortOrder, handleSort };

}

export default useSort;


