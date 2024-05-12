import "./auth.css";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { makeRequest } from "../../requestMethod";
import { toast } from "react-toastify";
import axios from "axios";

function Register() {
  const { authUser, setAuthUser } = useAuthContext();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();
  const [params] = useSearchParams();
  const returnUrl = params.get("returnUrl");

  useEffect(() => {
    if (!authUser) return;

    returnUrl ? navigate(returnUrl) : navigate("/");
  }, [authUser]);

  // Register
  const handleRegister = async (e) => {
    e.preventDefault();

    if (password.length < 6) return toast.warning("Password must be >6");

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          username,
          email,
          password,
          address,
        }
      );
      setAuthUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.success("Register Success 🤩");
    } catch (err) {
      toast.error(err.message);
      console.log(err.message);
    }
  };

  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <form className="login">
            <div className="login__field">
              <i className="login__icon fas fa-user" />
              <input
                type="text"
                className="login__input"
                placeholder="Username..."
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-user" />
              <input
                type="text"
                className="login__input"
                placeholder="Email..."
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-user" />
              <input
                type="text"
                className="login__input"
                placeholder="Address..."
                required
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock" />
              <input
                type="password"
                className="login__input"
                placeholder="Password..."
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              style={{ margin: "7px 0" }}
              className="button login__submit"
              onClick={handleRegister}
            >
              <span className="button__text">Register Now</span>
              <i className="button__icon fas fa-chevron-right" />
            </button>
          </form>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4" />
          <span className="screen__background__shape screen__background__shape3" />
          <span className="screen__background__shape screen__background__shape2" />
          <span className="screen__background__shape screen__background__shape1" />
        </div>
      </div>
    </div>
  );
}

export default Register;
