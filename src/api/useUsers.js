import {useCallback, useEffect, useRef, useState} from "react";

const BASE_URL = "https://dummyjson.com/users";
const FILTER_URL = "https://dummyjson.com/users/filter";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(10)

  const prevUsersRef = useRef([]);

  const transformFiltersForServer = (filters) => {
    const transformed = {};

    const fieldMapping = {
      lastName: "lastName",
      firstName: "firstName",
      maidenName: "maidenName",
      age: "age",
      gender: "gender",
      phone: "phone",
    }

    Object.entries(filters).forEach(([key, value]) => {
      if (value && value.trim() !== "" && fieldMapping[key]) {
       transformed[fieldMapping[key]] = value.trim();
      }
    })

    return transformed;
  }

  const fetchUsers = useCallback(async (
    sortBy = null,
    order = null,
    targetPage = page,
    filters = {}
  ) => {

    const hasFilters = Object.keys(filters).length > 0;

    const isOnlyPageChanged =
      targetPage !== page &&
      sortBy === null &&
      order === null &&
      !hasFilters;

    if (!isOnlyPageChanged) {
      prevUsersRef.current = users;
      setLoading(true);
    }

    try {
      const transformedFilters = transformFiltersForServer(filters);
      const hasServerFilters = Object.entries(transformedFilters).length > 0;

      if (hasServerFilters) {
        const firstFilterKey = Object.keys(transformedFilters)[0];
        const firstFilterValue = transformedFilters[firstFilterKey];

        const params = new URLSearchParams();
        params.append("key", firstFilterKey);
        params.append("value", firstFilterValue);
        params.append("limit", limit);
        params.append("skip", (targetPage - 1) * limit)

        if (sortBy && order && order !== "none") {
          params.append("sortBy", sortBy);
          params.append("order", order);
        }

        const URL = `${FILTER_URL}?${params.toString()}`;
        console.log("Filter URL:", URL);

        const response = await fetch(URL);
        const data = await response.json();

        setUsers(data.users || []);
        setTotal(data.total || 0);
        setPage(targetPage)

      } else {
        const params = new URLSearchParams();
        params.append("limit", limit);
        params.append("skip", (targetPage - 1) * limit)

        if (sortBy && order && order !== "none") {
          params.append("sortBy", sortBy);
          params.append("order", order);
        }

        const URL = `${BASE_URL}?${params.toString()}`;
        const response = await fetch(URL);
        const data = await response.json();

        setUsers(data.users || []);
        setTotal(data.total || 0);
        setPage(targetPage)
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
      setTotal(0);
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

