import classes from "./foodsAdmin.module.css";
import NotFound from "../../components/notFound/NotFound";
import Title from "../../components/title";
import Search from "../../components/search/Search";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { add, getAll, search } from "../../services/foodService";
import { toast } from "react-toastify";
import upload from "../../upload";
import moment from "moment";
import SingleFood from "./SingleFood";

function FoodsAdmin() {
  const [foods, setFoods] = useState();
  const { searchTerm } = useParams();

  // Get Food
  useEffect(() => {
    loadFoods();
  }, [searchTerm]);

  const loadFoods = async () => {
    const foods = searchTerm ? await search(searchTerm) : await getAll();
    setFoods(foods);
  };

  const FoodsNotFound = () => {
    if (foods && foods.length > 0) return;

    return searchTerm ? (
      <NotFound linkRoute="/admin/foods" linkText="Show All" />
    ) : (
      <NotFound linkRoute="/dashboard" linkText="Back to dashboard!" />
    );
  };

  // Modal
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  // MultipleSelect
  const [selectedValuesTags, setSelectedValuesTags] = useState([]);
  const [selectedValuesOrigins, setSelectedValuesOrifins] = useState([]);
  const handleSelectChangeTags = (event) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedValuesTags(selectedOptions);
  };
  const handleSelectChangeOrigins = (event) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedValuesOrifins(selectedOptions);
  };

  // ADD FOOD
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [file, setFile] = useState(null);
  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState(0);
  const [stars, setStars] = useState(0);
  const formateDate = moment(Date.now()).format("YYYY MM DD");

  const handleAddFood = async (e) => {
    e.preventDefault();
    setLoadingAdd(true);

    try {
      let foodImg;
      foodImg = file
        ? await upload(file)
        : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D";

      const food = {
        stars,
        name: foodName,
        price: foodPrice,
        imageUrl: foodImg,
        cookTime: formateDate,
        tags: selectedValuesTags,
        origins: selectedValuesOrigins,
      };

      await add(food);
      closeModal();
      toast.success("food add success 😘");
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoadingAdd(false);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.list}>
        <Title title="Manage Foods" margin="1rem auto" />
        <Search
          searchRoute="/admin/foods/"
          defaultRoute="/admin/foods"
          margin="1rem 0"
          placeholder="Search Foods"
        />

        <div
          className={classes.add_food}
          style={{
            padding: "5px",
            borderRadius: "10PX",
            backgroundColor: "brown",
            color: "white",
            width: "max-content",
          }}
          onClick={openModal}
        >
          <i className="fa-solid fa-plus" style={{ cursor: "pointer" }}></i>
        </div>

        <FoodsNotFound />

        {foods &&
          foods.map((food) => <SingleFood key={food._id} food={food} />)}
      </div>

      {showModal && (
        <div className={classes.modalBackdrop}>
          <div className={classes.modal}>
            <div className={classes.foodCont}>
              <h2 className={classes.addTitle}>Add Food</h2>

              <div className="files">
                <label htmlFor="file">
                  <div className="imgContainer">
                    <img
                      src={
                        file
                          ? URL.createObjectURL(file)
                          : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D"
                      }
                      alt=""
                      className={classes.foodImg}
                    />
                    <i
                      className="fa-solid fa-upload"
                      style={{ marginBottom: "10px" }}
                    ></i>
                  </div>
                </label>
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>

              <div className={classes.inputConta}>
                <input
                  type="text"
                  placeholder="Food Name"
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                  required
                  className={classes.foodInput}
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={foodPrice}
                  onChange={(e) => setFoodPrice(e.target.value)}
                  required
                  className={classes.foodInput}
                  max={100}
                />
                <input
                  type="number"
                  placeholder="Stars"
                  value={stars}
                  onChange={(e) => setStars(e.target.value)}
                  required
                  className={classes.foodInput}
                  max={5}
                />
              </div>

              <select
                multiple
                onChange={handleSelectChangeTags}
                value={selectedValuesTags}
                style={{ marginTop: "10px", padding: "5px" }}
              >
                <option value="FastFood">FastFood</option>
                <option value="Pizza">Pizza</option>
                <option value="Lunch">Lunch</option>
                <option value="SlowFood">SlowFood</option>
                <option value="Soup">Soup</option>
                <option value="Tomato">Tomato</option>
              </select>

              <select
                multiple
                onChange={handleSelectChangeOrigins}
                value={selectedValuesOrigins}
                style={{ margin: "10px 0px", padding: "5px" }}
              >
                <option value="germany">germany</option>
                <option value="us">us</option>
                <option value="belgium">belgium</option>
                <option value="france">france</option>
                <option value="india">india</option>
                <option value="english">english</option>
                <option value="italy">italy</option>
              </select>

              <button onClick={handleAddFood} className={classes.addFoodBtn}>
                {loadingAdd ? "Loading.. " : "Add"}
              </button>
              <button onClick={closeModal} className={classes.closeFoodBtn}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FoodsAdmin;
