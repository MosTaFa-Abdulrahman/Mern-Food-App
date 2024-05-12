import classes from "./profile.module.css";
import { useEffect, useState } from "react";
import Title from "../../components/title";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { makeRequest } from "../../requestMethod";
import { toast } from "react-toastify";

function Profile() {
  const { authUser, setAuthUser } = useAuthContext();
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState(authUser.username || "");
  const [email, setEmail] = useState(authUser.email || "");
  const [address, setAddress] = useState(authUser.address || "");

  useEffect(() => {
    setUsername(authUser.username);
    setEmail(authUser.email);
    setAddress(authUser.address);
  }, [authUser]);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await makeRequest.put(`/user/update/${id}`, {
        username,
        email,
        address,
      });
      localStorage.setItem("userInfo", JSON.stringify({ ...data }));
      setAuthUser({ ...data });
      toast.success("Update Success 😍");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.details}>
        <Title title="Update Profile" />

        <form onSubmit={handleUpdateUser} className={classes.inputsCont}>
          <input
            type="text"
            className={classes.inputCurrentUser}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            className={classes.inputCurrentUser}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            className={classes.inputCurrentUser}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <button type="submit" className={classes.btnUpdate}>
            {isLoading ? "Loading... " : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
