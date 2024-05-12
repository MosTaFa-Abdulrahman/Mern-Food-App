import "./auth.css";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { makeRequest } from "../../requestMethod";
import { toast } from "react-toastify";
import axios from "axios";

function Login() {
  const { authUser, setAuthUser } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const [params] = useSearchParams();
  const returnUrl = params.get("returnUrl");

  useEffect(() => {
    if (!authUser) return;

    returnUrl ? navigate(returnUrl) : navigate("/");
  }, [authUser]);

  // Login
  const handleLogin = async (e) => {
    e.preventDefault();

    if (password.length < 6) return toast.warning("Password must be >6");

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      setAuthUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.success("Login Successful");
    } catch (err) {
      if (err.response && err.response.status === 401) {
        // Unauthorized (incorrect credentials)
        toast.error("Incorrect email or password");
      } else {
        toast.error("An unexpected error occurred");
        // console.error(err.message);
      }
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
                placeholder="Email..."
                required
                onChange={(e) => setEmail(e.target.value)}
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
            <button className="button login__submit" onClick={handleLogin}>
              <span className="button__text">Log In Now</span>
              <i className="button__icon fas fa-chevron-right" />
            </button>
          </form>
          <div className="social-login">
            <h3>Login Pro Food</h3>
            <div className="social-icons">
              <a href="" className="social-login__icon fab fa-instagram" />
              <a href="" className="social-login__icon fab fa-facebook" />
              <a href="" className="social-login__icon fab fa-twitter" />
            </div>
          </div>
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

export default Login;
