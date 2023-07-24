import axios from "axios";
import {
  ADMIN_BRAND_FAIL,
  ADMIN_BRAND_REQUEST,
  ADMIN_BRAND_SUCCESS,
  CLEAR_ERRORS,
  DELETE_BRAND_FAIL,
  DELETE_BRAND_REQUEST,
  DELETE_BRAND_SUCCESS,
  NEW_BRAND_FAIL,
  NEW_BRAND_REQUEST,
  NEW_BRAND_SUCCESS,
  UPDATE_BRAND_FAIL,
  UPDATE_BRAND_REQUEST,
  UPDATE_BRAND_SUCCESS,
  BRAND_DETAILS_FAIL,
  BRAND_DETAILS_REQUEST,
  BRAND_DETAILS_SUCCESS,
} from "../constans/BrandConstans";

// Create Brand --------Admin
export const createBrand = (brandData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_BRAND_REQUEST });
    console.log(brandData);
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `https://choco-e-app.onrender.com/api/v2/brand/new`,
      brandData,
      config
    );
    console.log(data);
    dispatch({
      type: NEW_BRAND_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_BRAND_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Admin Brands -----Admin
export const getAdminBrand = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_BRAND_REQUEST });

    const { data } = await axios.get("https://choco-e-app.onrender.com/api/v2/admin/brands");

    dispatch({
      type: ADMIN_BRAND_SUCCESS,
      payload: data.brands,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_BRAND_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Brand ------Admin
export const deleteBrand = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_BRAND_REQUEST });

    const { data } = await axios.delete(`https://choco-e-app.onrender.com/api/v2/brand/${id}`);

    dispatch({
      type: DELETE_BRAND_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_BRAND_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Product
export const updateBrand = (id, brandData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_BRAND_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `https://choco-e-app.onrender.com/api/v2/brand/${id}`,
      brandData,
      config
    );

    dispatch({
      type: UPDATE_BRAND_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_BRAND_FAIL,
      payload: error.response.data.message,
    });
  }
};

//   Clearing errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

// Get All Brands Details
export const getBrandDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: BRAND_DETAILS_REQUEST });

    const { data } = await axios.get(`https://choco-e-app.onrender.com/api/v2/brand/${id}`);
    dispatch({
      type: BRAND_DETAILS_SUCCESS,
      payload: data.brand,
    });
  } catch (error) {
    dispatch({
      type: BRAND_DETAILS_FAIL,
      payload: error.response.message,
    });
  }
};
