import classes from "./users.module.css";
import Title from "../../components/title";

import { useEffect, useState } from "react";
import SingleUser from "./SingleUser";
import { makeRequest } from "../../requestMethod";
import { toast } from "react-toastify";

function Users() {
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const { data } = await makeRequest.get("user/get");
      setUsers(data);
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.list}>
        <Title title="Manage Users" />

        <div className={classes.list_item}>
          <h3>Name</h3>
          <h3>Email</h3>
          <h3>Address</h3>
          <h3>Admin</h3>
          <h3>Actions</h3>
        </div>

        {users &&
          users.map((user) => (
            <SingleUser key={user._id} user={user} getAllUsers={getAllUsers} />
          ))}
      </div>
    </div>
  );
}

export default Users;
