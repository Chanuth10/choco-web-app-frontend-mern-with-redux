import React, { Fragment, useEffect, useState, useRef } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "./AllProducts.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  deleteCategory,
  getAdminCategory,
} from "../../actions/CategoryActions";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Avatar} from '@mui/material';
import SideBar from "./Sidebar";
import { ToastContainer, toast } from "react-toastify";
import { DELETE_CATEGORY_RESET } from "../../constans/CategoryConstans";
import Dialog from "../../more/Dialog";
import AddIcon from "@material-ui/icons/Add";

const AllCategories = ({ history }) => {
  const dispatch = useDispatch();
  const idProductRef = useRef();
  const { error, categories } = useSelector((state) => state.categories);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteCategory
  );
  //You can put all product information into diaglog
  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
  });

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
      toast.success("Category Deleted Successfully");
      dispatch({ type: DELETE_CATEGORY_RESET });
    }
    dispatch(getAdminCategory());
  }, [dispatch, error, deleteError, isDeleted]);

  const columns = [
    {
      field: "images",
      headerName: "Image",
      width: 100,
      flex: 0.3,
      renderCell: (params) => <Avatar src={params.row.images} />,
    },
    {
      field: "name",
      headerName: "Category Name",
      minWidth: 130,
      flex: 0.5,
    },
    {
      field: "description",
      headerName: "Category Description",
      minWidth: 130,
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
            <Link to={`/edit/category/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() => handleDelete(params.getValue(params.id, "id"))}
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  categories &&
    categories.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        description: item.description,
        images: item.images[0].url,
      });
    });

  const areUSureDelete = (choose) => {
    if (choose) {
      dispatch(deleteCategory(idProductRef.current));
      dispatch(getAdminCategory());
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
          <h1 id="productListHeading">ALL CATEGORY</h1>
          <Link to={`/admin/Category`}>
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
        autoClose={2000}
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

export default AllCategories;
