import classes from "./dashboard.module.css";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

function Dashboard() {
  const { authUser } = useAuthContext();

  const allItems = [
    {
      title: "Orders",
      imageUrl:
        "data:image/png;base64,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",
      url: "/orders",
      bgColor: "#ec407a",
      color: "white",
    },
    {
      title: "Profile",
      imageUrl:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
      url: `/profile/${authUser._id}`,
      bgColor: "#1565c0",
      color: "white",
    },
    {
      title: "Users",
      imageUrl:
        "https://cdn.pixabay.com/photo/2013/07/12/19/23/padlock-154684_640.png",
      url: "/admin/users",
      forAdmin: true,
      bgColor: "#00bfa5",
      color: "white",
    },
    {
      title: "Foods",
      imageUrl:
        "https://cdn.pixabay.com/photo/2015/05/04/10/16/vegetables-752153_640.jpg",
      url: "/admin/foods",
      forAdmin: true,
      bgColor: "#e040fb",
      color: "white",
    },
  ];

  return (
    <div className={classes.container}>
      <div className={classes.menu}>
        {allItems
          .filter((item) => authUser.isAdmin || !item.forAdmin)
          .map((item) => (
            <Link
              key={item.title}
              to={item.url}
              style={{
                backgroundColor: item.bgColor,
                color: item.color,
                textDecoration: "none",
              }}
            >
              <img src={item.imageUrl} alt={item.title} />
              <h2>{item.title}</h2>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Dashboard;
