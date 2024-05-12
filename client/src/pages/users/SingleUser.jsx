import classes from "./users.module.css";

import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { makeRequest } from "../../requestMethod";
import { toast } from "react-toastify";

function SingleUser({ user, getAllUsers }) {
  const { authUser } = useAuthContext();

  // Modal
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  // Handle Edit User
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [username, setUsername] = useState(user.username || "");
  const [email, setEmail] = useState(user.email || "");
  const [address, setAddress] = useState(user.address || "");

  useEffect(() => {
    setUsername(user.username);
    setEmail(user.email);
    setAddress(user.address);
  }, [user]);

  const handleEditUser = async (e) => {
    e.preventDefault();
    setLoadingEdit(true);

    try {
      const UserData = {
        username,
        email,
        address,
      };

      await makeRequest.put(`/user/update/${user._id}`, UserData);
      closeModal();
      toast.success("User Edited Success 😎");
      getAllUsers();
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoadingEdit(false);
    }
  };

  // handleToggleBlock
  const handleToggleBlock = async (userId) => {
    try {
      await makeRequest.put(`/user/toggleBlock/${userId}`);
      toast.success("Success 😏");
      getAllUsers();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div key={user._id} className={classes.list_item}>
        <span>{user.username}</span>
        <span>{user.email}</span>
        <span>{user.address}</span>
        <span>{user?.isAdmin ? "✅" : "❌"}</span>
        <span className={classes.actions}>
          <Link onClick={openModal} className="link">
            <i
              className="fa-solid fa-pen-to-square"
              style={{ cursor: "pointer" }}
            ></i>
          </Link>

          {authUser._id !== user._id && (
            <Link onClick={() => handleToggleBlock(user._id)} className="link">
              {user?.isBlocked ? "Unblock" : "Block"}
            </Link>
          )}
        </span>
      </div>

      {showModal && (
        <div className={classes.modalBackdrop}>
          <div className={classes.modal}>
            <div className={classes.foodCont}>
              <h2 className={classes.addTitle}>Edit User</h2>

              <div className={classes.inputConta}>
                <input
                  type="text"
                  placeholder="Username... "
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className={classes.foodInput}
                />
                <input
                  type="email"
                  placeholder="Email... "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={classes.foodInput}
                />
                <input
                  type="text"
                  placeholder="Address... "
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className={classes.foodInput}
                />
              </div>

              <button onClick={handleEditUser} className={classes.addFoodBtn}>
                {loadingEdit ? "Loading.. " : "Edit"}
              </button>
              <button onClick={closeModal} className={classes.closeFoodBtn}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SingleUser;
