import classes from "./order.module.css";
import NotFound from "../../components/notFound/NotFound";
import Title from "../../components/title";
import Price from "../../components/price/Price";

import { useEffect, useReducer } from "react";
import { getAll, getAllStatus } from "../../services/orderService";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { makeRequest } from "../../requestMethod";

const initialState = {};
const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ALL_STATUS_FETCHED":
      return { ...state, allStatus: payload };
    case "ORDERS_FETCHED":
      return { ...state, orders: payload };
    default:
      return state;
  }
};

function Orders() {
  const [{ allStatus, orders }, dispatch] = useReducer(reducer, initialState);

  const { filter } = useParams();

  useEffect(() => {
    getAllStatus().then((status) => {
      dispatch({ type: "ALL_STATUS_FETCHED", payload: status });
    });
    getAll(filter).then((orders) => {
      dispatch({ type: "ORDERS_FETCHED", payload: orders });
    });
  }, [filter]);

  // handleDeleteOrder
  const handleDeleteOrder = async (order) => {
    const confirmed = window.confirm(`Delete Order ${order.name}?`);
    if (!confirmed) return;
    try {
      await makeRequest.delete(`/order/delete/${order._id}`);
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={classes.container}>
      <Title title="Orders" margin="1.5rem 0 0 .2rem" fontSize="1.9rem" />

      {allStatus && (
        <div className={classes.all_status}>
          <Link
            to="/orders"
            className={!filter ? classes.selected : ""}
            style={{ textDecoration: "none" }}
          >
            All
          </Link>
          {allStatus?.map((state) => (
            <Link
              key={state}
              className={state === filter ? classes.selected : ""}
              to={`/orders/${state}`}
              style={{ textDecoration: "none" }}
            >
              {state}
            </Link>
          ))}
        </div>
      )}

      {orders?.length === 0 && (
        <NotFound
          linkRoute={filter ? "/orders" : "/"}
          linkText={filter ? "Show All" : "Go To Home Page"}
        />
      )}

      {orders &&
        orders.map((order) => (
          <div key={order._id} className={classes.order_summary}>
            <div className={classes.header}>
              <span>{order.id}</span>
              <span>{moment(order.createdAt).format("YYYY MM DD")}</span>
              <span>{order.status}</span>
            </div>

            <i
              className="fa-solid fa-trash"
              onClick={() => handleDeleteOrder(order)}
              style={{ color: "tomato", cursor: "pointer" }}
            ></i>

            <div className={classes.items}>
              {order.items.map((item) => (
                <Link
                  key={item.food._id}
                  to={`/food/${item.food._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <img src={item.food?.imageUrl} alt={item.food.name} />
                </Link>
              ))}
            </div>
            <div className={classes.footer}>
              <div>
                <Link
                  to={`/track/${order._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Show Order
                </Link>
              </div>
              <div>
                <span className={classes.price}>
                  <Price price={order.totalPrice} />
                </span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Orders;
