import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Admin/Sidebar";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import SearchIcon from "@material-ui/icons/Search";
import { toast, ToastContainer } from "react-toastify";
import "./ReportReview.css";
const ReportReview = () => {
  const [rating, setRating] = useState("");
  const [searchID, setSearch] = useState("");
  const [apiData, setData] = useState([]);

  useEffect(() => {
    console.log("I enter");
    if (rating) {
      console.log("I too");
      axios
        .get(`http://localhost:4000/review/search/rating/${rating}`)
        .then((getdata) => {
          setData(getdata.data);
        });
    } else {
      axios.get("http://localhost:4000/review").then((getdata) => {
        setData(getdata.data);
      });
    }
  }, [rating]);

  const startSearch = () => {
    if (rating) {
      axios
        .get(
          `http://localhost:4000/review/search/idrating/${searchID}/${rating}`
        )
        .then((getdata) => {
          if (getdata.data.length === 0) {
            toast.error(`No review with the ID: ${searchID}`);
          } else {
            setData(getdata.data);
          }
        });
    } else {
      axios
        .get(`http://localhost:4000/review/search/${searchID}`)
        .then((getdata) => {
          if (getdata.data.length === 0) {
            toast.error(`No review with the ID: ${searchID}`);
          } else {
            setData(getdata.data);
          }
        });
    }
  };
  const columns = [
    {
      field: "prodID",
      headerName: "Product ID",
      flex: 0.5,
    },
    {
      field: "rating",
      headerName: "Rating",
      flex: 0.5,
    },
    {
      field: "review",
      headerName: "Review",
      flex: 0.5,
    },
  ];
  const rows = [];
  {
    apiData &&
      apiData.map((value) => {
        rows.push({
          id: value._id,
          prodID: value.ID,
          rating: value.Rating,
          review: value.Review,
        });
      });
  }
  console.log(rows);
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboardContainer">
        <div className="review">
          <h2 className="promotopicrep">Choose</h2>
          <div className="choosereport">
            <label className="repstatus">Rating</label>
            <select
              className="reppromoselect"
              name="status"
              onChange={(e) => {
                setRating(e.target.value);
              }}
            >
              <option disabled selected value />
              <option className="repop" value="1">
                1
              </option>
              <option className="repop" value="2">
                2
              </option>
              <option className="repop" value="3">
                3
              </option>
              <option className="repop" value="4">
                4
              </option>
              <option className="repop" value="5">
                5
              </option>
            </select>

            <label className="repstatus">Product ID</label>
            <input
              type="text"
              className="searchproductID"
              placeholder="Search by Product ID"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <button onClick={startSearch} className="searchReport">
              <SearchIcon />
            </button>
          </div>
          <div className="reportpromo">
            <h2 className="reviewtopic">Review Report</h2>

            <DataGrid
              rows={rows}
              columns={columns}
              components={{
                Toolbar: GridToolbar,
              }}
              pageSize={7}
              className="productListTable"
              autoHeight
            />
          </div>

          <ToastContainer
            position="bottom-center"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </div>
    </div>
  );
};
export default ReportReview;
