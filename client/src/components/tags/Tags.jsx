import classes from "./tags.module.css";
import { Link } from "react-router-dom";

// From ((Home + Food)) Page
function Tags({ tags, forFoodPage }) {
  return (
    <div
      className={classes.container}
      style={{
        justifyContent: forFoodPage ? "start" : "center",
      }}
    >
      {tags.map((tag) => (
        <Link key={tag.name} to={`/tag/${tag.name}`} className="link">
          {tag.name} {!forFoodPage && `(${tag.count})`}
        </Link>
      ))}
    </div>
  );
}

export default Tags;
