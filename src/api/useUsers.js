import {useCallback, useEffect, useRef, useState} from "react";

const BASE_URL = "https://dummyjson.com/users";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(10)

  const prevUsersRef = useRef([]);

  const fetchUsers = useCallback(async (
    sortBy = null,
    order = null,
    targetPage = page,
    filters = {}
  ) => {

    const isOnlyPageChanged =
      targetPage !== page &&
      sortBy === null &&
      order === null &&
      Object.keys(filters).length === 0;

    if (!isOnlyPageChanged) {
      setLoading(true);
    }

    try {

      const params = new URLSearchParams();
      params.append("limit", limit);
      params.append("skip", (targetPage - 1) * limit)

      if (sortBy && order && order !== "none") {
        params.append("sortBy", sortBy);
        params.append("order", order);
      }

      Object.entries(filters).forEach(([key, value]) => {
        if (value && value.trim() !== "") {
          params.append(key, value.trim());
        }
      })

      const URL = `${BASE_URL}?${params.toString()}`;
      console.log("Fetching from:", URL);

      const response = await fetch(URL);
      const data = await response.json();

      prevUsersRef.current = users;

      setUsers(data.users || []);
      setTotal(data.total || 0);
      setPage(targetPage)
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, [page, limit, users]);

  useEffect(() => {
    fetchUsers()
  }, [])

  return {
    users,
    prevUsers: prevUsersRef.current,
    loading,
    total,
    page,
    limit,
    fetchUsers,
    setPage,
  }
}

export default useUsers

