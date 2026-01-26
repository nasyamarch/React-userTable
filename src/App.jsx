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
import FilterPanel from "./components/FilterPanel.jsx";

function App() {

  const {
    users,
    prevUsers,
    loading,
    total,
    page,
    limit,
    fetchUsers,
    setPage,
  } = useUsers();

  const {sortField, sortOrder, handleSort} = useSort(fetchUsers);
  const {activeFilters, handleFilter, clearFilters, cleanup} = useFilter(fetchUsers);
  const {columnWidth, startResize, endResize, onResize} = useResizableColumns();

  const totalPage = Math.ceil(total / limit);

  useEffect(() => () => {
      cleanup?.();
  }, [cleanup]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchUsers(sortField, sortOrder, newPage, activeFilters);
  }


  return (
    <div className="userTable">
      <h1 className="userTable__title">User Table</h1>

      <FilterPanel
        activeFilters={activeFilters}
        clearFilters={clearFilters}
      />

      {loading && <div className="userTable__loading">Loading...</div>}

      <table>
        <TableHeader
          columns={userColumnItems}
          columnWidth={columnWidth}
          handleSort={handleSort}
          renderSortIcon={(field) => renderSortIcon(field, sortField, sortOrder)}
          startResize={startResize}
          onResize={onResize}
          endResize={endResize}
          activeFilters={activeFilters}
          handleFilter={handleFilter}
        />
        <tbody>
        {(loading ? prevUsers : users).map((user) => (
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
