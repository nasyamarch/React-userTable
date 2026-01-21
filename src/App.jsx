import useResizableColumns from "./hooks/useResizableColumns.js";
import TableHeader from "./components/TableHeader.jsx";
import TableRow from "./components/TableRow.jsx";
import {userColumnItems} from "./components/userColumnItems.js";
import useUsers from "./api/useUsers.js";
import useSort from "./hooks/useSort.js";
import renderSortIcon from "./hooks/renderSortIcon.js";

function App() {

  const { users, setUsers, originalUsers } = useUsers();
  const {sortField, sortOrder, handleSort} = useSort(users, setUsers, originalUsers);
  const {
    columnWidth,
    startResize,
    endResize,
    onResize,
  }
    = useResizableColumns();


  return (
    <div className="userTable">
      <h1 className="userTable__title">User Table</h1>
      <table>
        <TableHeader
          columns={userColumnItems}
          columnWidth={columnWidth}
          handleSort={handleSort}
          renderSortIcon={(field) => renderSortIcon(field, sortField, sortOrder)}
          startResize={startResize}
          onResize={onResize}
          endResize={endResize}
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
    </div>
  )
}

export default App
