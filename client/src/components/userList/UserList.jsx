import "./userList.css";
import { useState, useEffect } from "react";
import Pagination from "../paginatian/Pagination";

function UserList() {
  const [users, setUsers] = useState([]);

  //  Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/user/get/all");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users?.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="user-list">
      <h1>User List</h1>
      <ul>
        {currentUsers?.map((user) => (
          <li key={user._id}>
            <strong>{user.username}</strong> - {user.email}
          </li>
        ))}
      </ul>

      <Pagination
        currentPage={currentPage}
        itemsPerPage={usersPerPage}
        totalItems={users.length}
        paginate={paginate}
      />
    </div>
  );
}

export default UserList;
