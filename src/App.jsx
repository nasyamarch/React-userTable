import {useState} from 'react'


function App() {
  const [users, setUsers] = useState([])
  const [sortState, setSortState] = useState({
    field: null,
    direction: null,
  })




  return (
    <div className="userTable">
      <h1 className="userTable__title">User Table</h1>
      <table>
        <thead>
        <tr>
          <th>Фамилия</th>
          <th>Имя</th>
          <th>Отчество</th>
          <th>Возраст</th>
          <th>Пол</th>
          <th>Телефон</th>
          <th>Email</th>
          <th>Страна</th>
          <th>Город</th>
        </tr>
        </thead>

        <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.lastName}</td>
            <td>{user.firstName}</td>
            <td>{user.middleName}</td>
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
