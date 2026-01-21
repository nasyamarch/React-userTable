import { useEffect, useState } from 'react';
import useResizableColumns from "./hooks/useResizableColumns.js";
import TableHeader from "./components/TableHeader.jsx";
import { userColumnItems } from "./components/userColumnItems.js";
import TableRow from "./components/TableRow.jsx";

function App() {

  const [users, setUsers] = useState([]);
  const [originalUsers, setOriginalUsers] = useState([]);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  const {columnWidth, startResize} = useResizableColumns();

  const URL = "https://dummyjson.com/users";

  useEffect(() => {
    fetch(URL)
      .then(response => response.json())
      .then((data) => {
        setUsers(data.users);
        setOriginalUsers(data.users);
      });
  }, []);


  const handleSort = (field) => {
    console.log(field);
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

  const renderSortIcon = (field) => {
    if (sortField !== field || sortOrder === "none") return '⇅';
    if (sortOrder === 'asc') return '↑';
    if (sortOrder === 'desc') return '↓';
  };


  return (
    <div className="userTable">
      <h1 className="userTable__title">User Table</h1>
      <table>
        <TableHeader
          columns={userColumnItems}
          columnWidth={columnWidth}
          handleSort={handleSort}
          renderSortIcon={renderSortIcon}
          startResize={startResize}
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
