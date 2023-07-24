import React, { Fragment, useEffect, useState, useRef } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "./AllProducts.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  deleteBrand,
  getAdminBrand,
} from "../../actions/BrandActions";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { Avatar} from '@mui/material';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { ToastContainer, toast } from "react-toastify";
import { DELETE_BRAND_RESET } from "../../constans/BrandConstans";
import Dialog from "../../more/Dialog";
import AddIcon from "@material-ui/icons/Add";

const AllBrands = ({ history }) => {
  const dispatch = useDispatch();
  const idProductRef = useRef();
  const { error, brands } = useSelector((state) => state.brands);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteBrand
  );
  //You can put all brand information into diaglog
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
      toast.success("Brand Deleted Successfully");
      dispatch({ type: DELETE_BRAND_RESET });
    }
    dispatch(getAdminBrand());
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
      headerName: "Brand Name",
      minWidth: 130,
      flex: 0.5,
    },
    {
      field: "description",
      headerName: "Brand Description",
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
            <Link to={`/edit/brand/${params.getValue(params.id, "id")}`}>
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

  brands &&
    brands.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        description: item.description,
        images: item.images[0].url,
      });
    });

  const areUSureDelete = (choose) => {
    if (choose) {
      dispatch(deleteBrand(idProductRef.current));
      dispatch(getAdminBrand());
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
          <h1 id="productListHeading">ALL BRAND</h1>
          <Link to={`/admin/Brand`}>
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

export default AllBrands;
