import classes from "./foodsAdmin.module.css";
import Price from "../../components/price/Price";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteById } from "../../services/foodService";
import { toast } from "react-toastify";
import upload from "../../upload";
import moment from "moment";
import axios from "axios";

function SingleFood({ food }) {
  const [foods, setFoods] = useState();

  // Delete Food
  const deleteFood = async (food) => {
    const confirmed = window.confirm(`Delete Food ${food.name}?`);
    if (!confirmed) return;

    await deleteById(food._id);
    toast.success(`"${food.name}" Has Been Removed!`);
    setFoods(foods?.filter((f) => f.id !== food._id));
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

  // EDIT FOOD
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [file, setFile] = useState(null);
  const [foodName, setFoodName] = useState(food.name || "");
  const [foodPrice, setFoodPrice] = useState(food.price || 0);
  const [stars, setStars] = useState(food.stars || 0);
  const formateDate = moment(Date.now()).format("YYYY MM DD");

  useEffect(() => {
    setFoodName(food.name);
    setFoodPrice(food.price);
    setStars(food.stars);
  }, [food]);

  const handleEditFood = async (e) => {
    e.preventDefault();
    setLoadingEdit(true);

    try {
      let foodImg;
      foodImg = file
        ? await upload(file)
        : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D";

      const foodData = {
        stars,
        name: foodName,
        price: foodPrice,
        imageUrl: foodImg,
        cookTime: formateDate,
        tags: selectedValuesTags,
        origins: selectedValuesOrigins,
      };

      await axios.put(
        `http://localhost:5000/api/food/update/${food._id}`,
        foodData
      );
      closeModal();
      toast.success("Food Edited success 😎");
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoadingEdit(false);
    }
  };

  return (
    <>
      <div className={classes.list_item}>
        <img src={food.imageUrl} alt={food.name} />
        <Link to={`/food/${food._id}`} className="link">
          {food.name}
        </Link>
        <Price price={food.price} />

        <div className={classes.actions}>
          <Link onClick={openModal}>
            <i
              className="fa-solid fa-pen-to-square"
              style={{ cursor: "pointer" }}
            ></i>
          </Link>
          <Link onClick={() => deleteFood(food)}>
            <i className="fa-solid fa-trash" style={{ color: "red" }}></i>
          </Link>
        </div>
      </div>

      {showModal && (
        <div className={classes.modalBackdrop}>
          <div className={classes.modal}>
            <div className={classes.foodCont}>
              <h2 className={classes.addTitle}>Edit Food</h2>

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

              <button onClick={handleEditFood} className={classes.addFoodBtn}>
                {loadingEdit ? "Loading.. " : "Edit"}
              </button>
              <button onClick={closeModal} className={classes.closeFoodBtn}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SingleFood;
