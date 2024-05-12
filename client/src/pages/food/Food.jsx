import classes from "./food.module.css";

// For Styling
import Price from "../../components/price/Price";
import Tags from "../../components/tags/Tags";
import StarRating from "../../components/starRating/StarRating";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getById } from "../../services/foodService";
import NotFound from "../../components/notFound/NotFound";
import { useCart } from "../../context/useCart";

function Food() {
  const [food, setFood] = useState({});
  const { id } = useParams();
  const { addToCart } = useCart();

  const navigate = useNavigate();

  useEffect(() => {
    getById(id).then(setFood);
  }, [id]);

  const handleAddToCart = () => {
    addToCart(food);
    navigate("/cart");
  };

  return (
    <>
      {!food ? (
        <NotFound message="Food Not Found!" linkText="Back To Homepage" />
      ) : (
        <div className={classes.container}>
          <img
            className={classes.image}
            src={
              food.imageUrl
                ? food.imageUrl
                : "https://media.istockphoto.com/id/1455160776/photo/selection-of-healthy-food.webp?b=1&s=170667a&w=0&k=20&c=lDqbqjMVAii5xbw2cMay7x33Gm4Y3bOdjaf5Z0ehrPU="
            }
            alt={food.name}
          />

          <div className={classes.details}>
            <div className={classes.header}>
              <span className={classes.name}>{food.name}</span>
              <span
                className={`${classes.favorite} ${
                  food.favorite ? "" : classes.not
                }`}
                style={{ cursor: "pointer" }}
              >
                ❤
              </span>
            </div>
            <div className={classes.rating}>
              <StarRating stars={food.stars} size={25} />
            </div>

            <div className={classes.origins}>
              {food.origins?.map((origin) => (
                <span key={origin}>{origin}</span>
              ))}
            </div>

            <div className={classes.tags}>
              {food.tags && (
                <Tags
                  tags={food.tags.map((tag) => ({ name: tag }))}
                  forFoodPage={true}
                />
              )}
            </div>

            <div className={classes.cook_time}>
              <span>
                Time to cook about <strong>{food.cookTime}</strong> minutes
              </span>
            </div>

            <div className={classes.price}>
              <Price price={food.price} />
            </div>

            <button onClick={handleAddToCart}>Add To Cart</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Food;
