import classes from "./checkout.module.css";
import Title from "../../components/title";

import { useAuthContext } from "../../context/AuthContext";
import { useCart } from "../../context/useCart";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { createOrder } from "../../services/orderService";
import OrderItemsList from "../../components/orderItemsList/OrderItemsList";
import Map from "../../components/map/Map";

function Checkout() {
  const { authUser } = useAuthContext();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [order, setOrder] = useState({ ...cart });
  const [username, setUsername] = useState(authUser.username || "");
  const [address, setAddress] = useState(authUser.address || "");

  const handleSubmit = async () => {
    if (!order.addressLatLng) {
      toast.warning("Please select your location on the map");
      return;
    }

    await createOrder({
      ...order,
      name: username,
      address,
    });
    navigate("/payment");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={classes.container}>
        <div className={classes.content}>
          <Title title="Order Form" fontSize="1.6rem" />

          <div className={classes.inputs} style={{ marginTop: "15px" }}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              placeholder="Username"
              required
              className={classes.inputUser}
            />

            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              placeholder="User Address"
              required
              className={classes.inputUser}
            />
          </div>
          <OrderItemsList order={order} />
        </div>

        <div>
          <Title title="Choose Your Location" fontSize="1.6rem" />
          <Map
            location={order.addressLatLng}
            onChange={(latlng) => {
              console.log(latlng);
              setOrder({ ...order, addressLatLng: latlng });
            }}
          />
        </div>

        <div className={classes.buttons_container}>
          <div className={classes.buttons}>
            <button
              type="submit"
              style={{
                width: "100%",
                height: "3rem",
                backgroundColor: "orange",
                color: "white",
                border: "none",
                borderRadius: "10px",
                outline: "none",
                cursor: "pointer",
              }}
            >
              Go To Payment
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Checkout;
