import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createCategory } from "../../actions/CategoryActions";
import { Button } from "@material-ui/core";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import DiscountIcon from "@material-ui/icons/LocalOffer";
import SideBar from "./Sidebar";
import { NEW_CATEGORY_RESET } from "../../constans/CategoryConstans";
import { ToastContainer, toast } from "react-toastify";

const CreateCategory = ({ history }) => {
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector(
    (state) => state.createCategory
  );

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Category Created Successfully");
      history.push("/admin/categories");
      dispatch({ type: NEW_CATEGORY_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createCategorySubmitHandler = (e) => {
    e.preventDefault();

    if (description.length < 10 ) {
      toast.error("Description must be at least 10 characters");
      return;
    }
    if (name.length < 5 ) {
      toast.error("name must be at least 5 characters");
      return;
    }
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("description", description);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createCategory(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createCategorySubmitHandler}
          >
            <h1>Create Category</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="String"
                placeholder="Category Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />
              <textarea
                placeholder="Categiry Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Fragment>
  );
};

export default CreateCategory;
