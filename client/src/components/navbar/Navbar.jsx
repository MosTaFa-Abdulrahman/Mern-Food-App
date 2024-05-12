import classes from "./navbar.module.css";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useCart } from "../../context/useCart";
import axios from "axios";

function Navbar() {
  const { authUser, setAuthUser } = useAuthContext();
  const { cart } = useCart();

  const handleLogout = async () => {
    await axios.post("http://localhost:5000/api/auth/logout");
    localStorage.removeItem("userInfo");
    setAuthUser(null);
  };

  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <Link to="/" className={`link ${classes.logo}`}>
          Pro Food!
        </Link>
        <nav>
          <ul>
            {authUser ? (
              <li className={classes.menu_container}>
                <Link
                  to={authUser.isAdmin ? "/dashboard" : "/"}
                  className="link"
                >
                  {authUser.username}
                </Link>
                <div className={classes.menu}>
                  <Link to={`/profile/${authUser._id}`} className="link">
                    Profile
                  </Link>
                  <Link to="/orders" className="link">
                    Orders
                  </Link>
                  <a onClick={handleLogout}>Logout</a>
                </div>
              </li>
            ) : (
              <Link to="/login" className="link">
                Login
              </Link>
            )}

            <li>
              <Link to="/cart" className="link">
                Cart
                {cart.totalCount > 0 && (
                  <span className={classes.cart_count}>{cart.totalCount}</span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
