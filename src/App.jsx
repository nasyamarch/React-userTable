import useResizableColumns from "./hooks/useResizableColumns.js";
import TableHeader from "./components/TableHeader.jsx";
import TableRow from "./components/TableRow.jsx";
import {userColumnItems} from "./components/userColumnItems.js";
import useUsers from "./api/useUsers.js";
import useSort from "./api/useSort.js";
import useFilter from "./api/useFilter.js";
import renderSortIcon from "./hooks/renderSortIcon.js";
import {useEffect} from "react";
import PaginationTable from "./components/PaginationTable.jsx";

function App() {

  const {
    users,
    loading,
    total,
    page,
    limit,
    fetchUsers,
    setPage,
  } = useUsers();

  const {sortField, sortOrder, handleSort} = useSort(fetchUsers);
  const {filters, activeFilters, handleFilter, clearFilters, cleanup} = useFilter(fetchUsers);
  const {columnWidth, startResize, endResize, onResize} = useResizableColumns();

  const totalPage = Math.ceil(total / limit);

  useEffect(() => {
    return () => {
      cleanup?.();
    }
  }, [cleanup]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchUsers(sortField, sortOrder, newPage, activeFilters);
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="userTable">
      <h1 className="userTable__title">User Table</h1>
      {Object.keys(activeFilters).length > 0 && (
        <button
        onClick={clearFilters}
        className="clear-filters-button"
        >
          Очистить фильтры
        </button>
      )}

      <table>
        <TableHeader
          columns={userColumnItems}
          columnWidth={columnWidth}
          handleSort={handleSort}
          renderSortIcon={(field) => renderSortIcon(field, sortField, sortOrder)}
          startResize={startResize}
          onResize={onResize}
          endResize={endResize}
          filters={filters}
          handleFilter={handleFilter}
        />
        <tbody>
        {users.map((user) => (
          <TableRow
            key={user.id}
            user={user}
          />
        ))}
        </tbody>
      </table>
      <PaginationTable
      page={page}
      totalPage={totalPage}
      onPageChange={handlePageChange}
      />
    </div>
  )
}

export default App
