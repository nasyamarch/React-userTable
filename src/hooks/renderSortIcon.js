const renderSortIcon = (field, sortField, sortOrder) => {
  if (sortField !== field || sortOrder === "none") return '⇅';
  if (sortOrder === 'asc') return '↑';
  if (sortOrder === 'desc') return '↓';
};

export default renderSortIcon;