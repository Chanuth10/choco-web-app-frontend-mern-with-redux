import { useState, useEffect } from "react";
import axios from "axios";
import "./ReportPromo.css";
import Sidebar from "../Admin/Sidebar";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const Reportpromo = () => {
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [apiData, setData] = useState([]);

  useEffect(() => {
    if (!status && !type) {
      axios.get("http://localhost:4000/promotion").then((getdata) => {
        setData(getdata.data);
      });
    } else if (status && !type) {
      axios
        .get(`http://localhost:4000/promotion/report/bystatus/${status}`)
        .then((getdata) => {
          setData(getdata.data);
        });
    } else if (type && !status) {
      axios
        .get(`http://localhost:4000/promotion/report/bytype/${type}`)
        .then((getdata) => {
          setData(getdata.data);
        });
    } else if (status && type) {
      axios
        .get(`http://localhost:4000/promotion/report/byboth/${status}/${type}`)
        .then((getdata) => {
          setData(getdata.data);
        });
    }
  }, [status, type]);

  const columns = [
    {
      field: "promoID",
      headerName: "Promotion ID",
      flex: 0.5,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "on",
      headerName: "Other Notes",
      flex: 0.5,
    },
    {
      field: "type",
      headerName: "Type",
      flex: 0.5,
    },
    {
      field: "discount",
      headerName: "Discount",
      flex: 0.5,
    },
    {
      field: "condition",
      headerName: "Condition",
      flex: 0.5,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.5,
    },
  ];
  const rows = [];
  apiData &&
    apiData.map((value) => {
      rows.push({
        id: value._id,
        promoID: value.ID,
        name: value.Name,
        on: value.OtherNotes,
        type: value.Type,
        discount: value.Discount,
        condition: value.Conditions,
        status: value.Status,
      });
    });

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboardContainer">
        <div className="promotion">
          <form>
            <h2 className="promotopicrep">Choose</h2>
            <div className="choosereport">
              <label className="repstatus">Status</label>
              <select
                className="reppromoselect"
                name="status"
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              >
                <option disabled selected value />
                <option className="repop" value="Active">
                  Active
                </option>
                <option className="repop" value="Inactive">
                  Inactive
                </option>
              </select>
              <label className="reptype">Type</label>
              <select
                className="reppromoselect"
                name="status"
                onChange={(e) => {
                  setType(e.target.value);
                }}
              >
                <option disabled selected value />
                <option className="repop" value="Advertising">
                  Advertising
                </option>
                <option className="repop" value="Sales">
                  Sales
                </option>
                <option className="repop" value="Sponsorship">
                  Sponsorship
                </option>
                <option className="repop" value="Other">
                  Other
                </option>
              </select>
            </div>
          </form>
          <div className="reportpromo">
            <h2 className="reportpromotopic">Promotion Report</h2>
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
        </div>
      </div>
    </div>
  );
};

export default Reportpromo;
