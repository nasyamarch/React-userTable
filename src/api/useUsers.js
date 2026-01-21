import {useEffect, useState} from "react";

const URL = "https://dummyjson.com/users";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [originalUsers, setOriginalUsers] = useState([]);

  useEffect(() => {
    fetch(URL)
      .then(response => response.json())
      .then((data) => {
        setUsers(data.users);
        setOriginalUsers(data.users);
      });
  }, []);

  return { users, setUsers, originalUsers}
}

export default useUsers

