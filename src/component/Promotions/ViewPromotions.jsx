import { useState, useEffect } from "react";
import "./ViewPromotion.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../Admin/Sidebar";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";
import { toast, ToastContainer } from "react-toastify";

const Promotions = () => {
  const [apiData, setData] = useState([]);
  const [status, setStatus] = useState("");
  const [id, setID] = useState("");
  const [searchID, setSearch] = useState("");

  useEffect(() => {
    if (status) {
      axios
        .put(`http://localhost:4000/promotion/${id}/${status}`)
        .then(toast.success("Status changed!"));
      setTimeout(function () {
       window.location.reload();
      }, 2000);
    }
    axios.get(`http://localhost:4000/promotion`).then((getdata) => {
      setData(getdata.data);
    });
  }, [id, status]);

  const changeStatus = (ID, stat) => {
    if (stat === "Active") {
      setStatus("Inactive");
    } else if (stat === "Inactive") {
      setStatus("Active");
    }
    setID(ID);
  };
  const setCSS = (status) => {
    if (status === "Active") {
      return "promoStatusActive";
    } else {
      return "promoStatusInactive";
    }
  };
  const deletepromotion = async (id) => {
    let choice = window.confirm("Delete promotion?");
    if (choice) {
      await axios
        .delete(`http://localhost:4000/promotion/${id}`)
        .then(toast.success("Successfully deleted!"));
      setTimeout(function () {
        window.location.reload();
      }, 2000);
    }
  };

  const searchPromo = async () => {
    await axios
      .get(`http://localhost:4000/promotion/search/${searchID}`)
      .then((getdata) => {
        if (getdata.data.length === 0) {
          toast.error(`No promotion with the ID: ${searchID}`);
        } else {
          setData(getdata.data);
        }
      });
  };

  const setupdateID = (id, pid) => {
    localStorage.setItem("ID", id);
    localStorage.setItem("PromoID", pid);
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboardContainer">
        <div className="promotion">
          <h2 className="promotopic">Promotions</h2>
          <Link to="/admin/AddPromotions">
            <input
              type="button"
              className="addnewpromo"
              value="Add New Promotion"
            />
          </Link>
          <input
            type="text"
            className="searchpromo"
            placeholder="Search by Promotion ID"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button className="searchpromobutton" onClick={searchPromo}>
            <SearchIcon />
          </button>
          <table className="promotable">
            <thead className="promohead">
              <tr>
                <th>Promotion ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Discount</th>
                <th>Condition</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="promotbody">
              {apiData.map((data) => {
                return (
                  <tr>
                    <td>{data.ID}</td>
                    <td>{data.Name}</td>
                    <td>{data.Type}</td>
                    <td>{data.Discount}</td>
                    <td>{data.Conditions}</td>
                    <td>
                      <input
                        type="button"
                        className={setCSS(data.Status)}
                        onClick={() => changeStatus(data._id, data.Status)}
                        value={data.Status}
                      />
                    </td>
                    <td>
                      <Link to="/admin/UpdatePromotions">
                        <EditIcon
                          className="Editicon"
                          onClick={() => setupdateID(data._id, data.ID)}
                        />
                      </Link>
                      <DeleteIcon
                        className="deleteicon"
                        onClick={() => deletepromotion(data._id)}
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
          <Link to="/admin/GenReport">
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

export default Promotions;
