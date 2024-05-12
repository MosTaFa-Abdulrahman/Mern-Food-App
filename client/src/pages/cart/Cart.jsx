import classes from "./cart.module.css";

// For Styling
import Price from "../../components/price/Price";

import NotFound from "../../components/notFound/NotFound";
import { Link } from "react-router-dom";
import { useCart } from "../../context/useCart";
import Title from "../../components/title";

function Cart() {
  const { cart, removeFromCart, changeQuantity } = useCart();

  return (
    <>
      <Title title="Cart Page" margin="1.5rem 0 0 2.5rem" />

      {cart.items.length === 0 ? (
        <NotFound message="Cart Page Is Empty!" />
      ) : (
        <div className={classes.container}>
          <ul className={classes.list}>
            {cart.items.map((item) => (
              <li key={item.food._id}>
                <div>
                  <img
                    src={
                      item.food?.imageUrl
                        ? item.food?.imageUrl
                        : "https://media.istockphoto.com/id/1455160776/photo/selection-of-healthy-food.webp?b=1&s=170667a&w=0&k=20&c=lDqbqjMVAii5xbw2cMay7x33Gm4Y3bOdjaf5Z0ehrPU="
                    }
                    alt={item.food.name}
                  />
                </div>
                <div>
                  <Link to={`/food/${item.food._id}`} className="link">
                    {item.food.name}
                  </Link>
                </div>

                <div>
                  <select
                    value={item.quantity}
                    onChange={(e) =>
                      changeQuantity(item, Number(e.target.value))
                    }
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                  </select>
                </div>

                <div>
                  <Price price={item.price} />
                </div>

                <div>
                  <button
                    className={classes.remove_button}
                    onClick={() => removeFromCart(item.food.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className={classes.checkout}>
            <div>
              <div className={classes.foods_count}>{cart.totalCount}</div>
              <div className={classes.total_price}>
                <Price price={cart.totalPrice} />
              </div>
            </div>

            <Link to="/checkout" className="link">
              Proceed To Checkout
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
