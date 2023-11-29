import React, { Fragment, useEffect, useState, useRef } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "./AllProducts.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  deleteProduct,
  getAdminProduct,
} from "../../actions/ProductActions";
import { Link } from "react-router-dom";
import { Avatar} from '@mui/material';
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import SideBar from "./Sidebar";
import { ToastContainer, toast } from "react-toastify";
import { DELETE_PRODUCT_RESET } from "../../constans/ProductConstans";
import Dialog from "../../more/Dialog";

const AllProducts = ({ history }) => {
  const dispatch = useDispatch();
  const idProductRef = useRef();
  const { error, products } = useSelector((state) => state.products);

  //You can put all product information into diaglog
  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
  });

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteProduct
  );

  const handleDialog = (message, isLoading) => {
    setDialog({
      message,
      isLoading,
    });
  };

  const handleDelete = (id) => {
    handleDialog("Are you sure you want to delete?", true);
    idProductRef.current = id;
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      console.log("Delete start");
      toast.success("Product Deleted Successfully");
      dispatch({ type: DELETE_PRODUCT_RESET });
      console.log("Delete end");
    }
    dispatch(getAdminProduct());
  }, [dispatch, error, deleteError, isDeleted]);

  const columns = [
    {
      field: "images",
      headerName: "Image",
      width: 60,
      flex: 0.3,
      renderCell: (params) => <Avatar src={params.row.images} />,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 130,
      flex: 0.5,
    },
    {
      field: "description",
      headerName: "Description",
      minWidth: 130,
      flex: 0.5,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price (Rs)",
      type: "number",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Edit/Delete",
      minWidth: 100,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/edit/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                //deleteProductHandler(params.getValue(params.id, "id"))
                handleDelete(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
        description: item.description,
        images: item.images[0].url,
      });
    });

  const areUSureDelete = (choose) => {
    if (choose) {
      dispatch(deleteProduct(idProductRef.current));
      dispatch(getAdminProduct());
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };
  return (
    <Fragment>
      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>
          <Link to={`/admin/product`}>
            <Button
              style={{
                background: "#34251fe1",
                color: "#ffffff",
                float: "right",
                width: "10%",
              }}
            >
              <AddIcon />
              New
            </Button>
          </Link>
          <br />
          <DataGrid
            rows={rows}
            columns={columns}
            components={{
              Toolbar: GridToolbar,
            }}
            pageSize={7}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
          <Button
            style={{
              background: "#34251fe1",
              color: "#ffffff",
              float: "right",
              width: "20%",
            }}
          >
            Generate Report
          </Button>
          {dialog.isLoading && (
            <Dialog onDialog={areUSureDelete} message={dialog.message} />
          )}
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={4000}
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

export default AllProducts;
