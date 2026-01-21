import {useEffect, useState} from 'react'

function App() {

  const [users, setUsers] = useState([]);
  const [originalUsers, setOriginalUsers] = useState([]);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

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
        <thead>
        <tr>
          <th onClick={() => handleSort('lastName')}>
            Last name {renderSortIcon('lastName')}
          </th>
          <th onClick={() => handleSort('firstName')}>
            First name {renderSortIcon('firstName')}
            </th>
          <th onClick={() => handleSort('maidenName')}>
            Middle name {renderSortIcon('maidenName')}
          </th>
          <th onClick={() => handleSort('age')}>
            Age {renderSortIcon('age')}
          </th>
          <th onClick={() => handleSort('gender')}>
            Gender {renderSortIcon('gender')}
          </th>
          <th onClick={() => handleSort('phone')}>
            Phone {renderSortIcon('phone')}
          </th>
          <th>Email</th>
          <th>Country</th>
          <th>City</th>
        </tr>
        </thead>

        <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.lastName}</td>
            <td>{user.firstName}</td>
            <td>{user.maidenName}</td>
            <td>{user.age}</td>
            <td>{user.gender}</td>
            <td>{user.phone}</td>
            <td>{user.email}</td>
            <td>{user.address.country}</td>
            <td>{user.address.city}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
