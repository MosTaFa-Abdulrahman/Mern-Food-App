import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Food from "./pages/food/Food";
import Cart from "./pages/cart/Cart";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AuthRoute from "./components/AuthRoute";
import Profile from "./pages/profile/Profile";
import Checkout from "./pages/checkout/Checkout";
import Payment from "./pages/payment/Payment";
import OrderTrack from "./pages/orderTrack/OrderTrack";
import Orders from "./pages/orders/Orders";

// Check Admin
import { useAuthContext } from "./context/AuthContext";
import Dashboard from "./pages/dashboard/Dashboard";
import FoodsAdmin from "./pages/foodsAdmin/FoodsAdmin";
import Users from "./pages/users/Users";

function AppRoutes() {
  const { authUser } = useAuthContext();

  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Home />} />
      <Route path="/search/:searchTerm" element={<Home />} />
      <Route path="/tag/:tag" element={<Home />} />

      {/* Food */}
      <Route path="/food/:id" element={<Food />} />

      {/* Cart */}
      <Route path="/cart" element={<Cart />} />

      {/* Auth */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Payment */}
      <Route
        path="/profile/:id"
        element={
          <AuthRoute>
            <Profile />
          </AuthRoute>
        }
      />

      {/* Checkout */}
      <Route
        path="/checkout"
        element={
          <AuthRoute>
            <Checkout />
          </AuthRoute>
        }
      />

      {/* Payment */}
      <Route
        path="/payment"
        element={
          <AuthRoute>
            <Payment />
          </AuthRoute>
        }
      />

      {/* Order Track */}
      <Route
        path="/track/:orderId"
        element={
          <AuthRoute>
            <OrderTrack />
          </AuthRoute>
        }
      />

      {/* Orders */}
      <Route
        path="/orders/:filter?"
        element={
          <AuthRoute>
            <Orders />
          </AuthRoute>
        }
      />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={authUser?.isAdmin ? <Dashboard /> : <Navigate to="/" />}
      />

      {/* Foods Admin */}
      <Route
        path="/admin/foods/:searchTerm?"
        element={authUser?.isAdmin ? <FoodsAdmin /> : <Navigate to="/" />}
      />

      {/* Users */}
      <Route
        path="/admin/users"
        element={authUser?.isAdmin ? <Users /> : <Navigate to="/" />}
      />
    </Routes>
  );
}

export default AppRoutes;
