import axios from "axios";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import Sidebar from "../Admin/Sidebar";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import DeleteIcon from "@material-ui/icons/Delete";
import "./ViewReview.css";
import AddReview from "./AddReview";
const Review = () => {
  const [apiData, setData] = useState([]);
  const [id, setID] = useState("");
  const [searchID, setSearch] = useState("");
  useEffect(() => {
    axios.get("http://localhost:4000/review").then((getdata) => {
      setData(getdata.data);
    });
  }, []);
  const deletereview = async (id) => {
    let choice = window.confirm("Delete promotion?");
    if (choice) {
      await axios
        .delete(`http://localhost:4000/review/${id}`)
        .then(toast.success("Successfully deleted!"));
      setTimeout(function () {
        window.location.reload();
      }, 2000);
    }
  };
  const searchReview = async () => {
    await axios
      .get(`http://localhost:4000/review/search/${searchID}`)
      .then((getdata) => {
        if (getdata.data.length === 0) {
          toast.error(`No review with the product ID: ${searchID}`);
        } else {
          setData(getdata.data);
        }
      });
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboardContainer">
        <div className="review">
          <h2 className="reviewtopic">Reviews</h2>
          <input
            type="text"
            className="searchreview"
            placeholder="Search by Review ID"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button className="searchreviewbutton" onClick={searchReview}>
            <SearchIcon />
          </button>
          <table className="reviewtable">
            <thead className="reviewtablehead">
              <tr>
                <th>Product ID</th>
                <th>Rating</th>
                <th>Review</th>
                <th className="actions">Actions</th>
              </tr>
            </thead>
            <tbody className="reviewtablebody">
              {apiData.map((data) => {
                return (
                  <tr>
                    <td>{data.ID}</td>
                    <td>{data.Rating}</td>
                    <td>{data.Review}</td>

                    <td>
                      <DeleteIcon
                        className="deleteicon"
                        onClick={() => deletereview(data._id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
          <Link to="/admin/GenReport/review">
            <input
              type="button"
              className="generatereport"
              value="Generate Report"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Review;
