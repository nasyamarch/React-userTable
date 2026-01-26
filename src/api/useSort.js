import {useState} from "react";

const useSort = (fetchUsers) => {
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

    fetchUsers(
      newSortOrder === "none" ? null : field,
      newSortOrder === "none" ? null : newSortOrder,
      1
    )
  }
  return {sortField, sortOrder, handleSort};
}

export default useSort


