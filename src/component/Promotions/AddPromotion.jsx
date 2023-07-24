import { useState } from "react";
import "./AddPromotion.css";
import axios from "axios";
import Sidebar from "../Admin/Sidebar";
import { toast, ToastContainer } from "react-toastify";

const Addpromo = () => {
  const [promoid, setID] = useState("");
  const [name, setName] = useState("");
  const [othernotes, setON] = useState("");
  const [type, setType] = useState("");
  const [discount, setDis] = useState("");
  const [conditions, setCon] = useState("");
  const [error, setError] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    console.log(promoid, name, othernotes, type, discount, conditions);
    let { data } = await axios.post("http://localhost:4000/promotion", {
      promoid,
      name,
      othernotes,
      type,
      discount,
      conditions,
    });
    if (data.message === "Success") {
      toast.success("Successfully added!");
      setTimeout(function () {
        window.location.assign("/admin/Promotions");
      }, 2500);
    } else {
      setError(data.message);
    }
  };
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboardContainer">
        <div className="promotionform">
          <form className="addpromoform">
            <div className="maintopicform">New promotion</div>

            <h2 className="addpromotopic">Promotion Details</h2>
            <br />
            <label className="addpromolabel">
              ID <label className="asterix">*</label>
            </label>
            <br />
            <input
              type="text"
              placeholder="ID1234"
              className="addpromoinput"
              onChange={(e) => {
                setID(e.target.value);
              }}
            />
            <br />
            <label className="addpromolabel">
              Name <label className="asterix">*</label>
            </label>
            <br />
            <input
              type="text"
              placeholder="Name here"
              className="addpromoinput"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <br />
            <label className="addpromolabel">Other Notes</label>
            <br />
            <textarea
              placeholder="Other notes here"
              className="addpromoinputON"
              onChange={(e) => {
                setON(e.target.value);
              }}
            />

            <h2 className="addpromotopic">Discount Details</h2>
            <br />
            <label className="addpromolabel">
              Type <label className="asterix">*</label>
            </label>
            <br />
            <input
              type="radio"
              name="typepromo"
              className="addpromoinputradio"
              onChange={() => {
                setType("Advertising");
              }}
            />
            <label className="typeradio">Advertising</label>
            <br />
            <input
              type="radio"
              name="typepromo"
              className="addpromoinputradio"
              onChange={() => {
                setType("Sales");
              }}
            />
            <label className="typeradio">Sales</label>
            <br />
            <input
              type="radio"
              name="typepromo"
              className="addpromoinputradio"
              onChange={() => {
                setType("Sponsorship");
              }}
            />
            <label className="typeradio">Sponsorship</label>
            <br />
            <input
              type="radio"
              name="typepromo"
              className="addpromoinputradio"
              onChange={() => {
                setType("Other");
              }}
            />
            <label className="typeradio">Other</label>
            <br />
            <br />
            <label className="addpromolabel">
              Discount <label className="asterix">*</label>
            </label>
            <br />
            <input
              type="text"
              placeholder="Discount here"
              className="addpromoinput"
              onChange={(e) => {
                setDis(e.target.value);
              }}
            />
            <br />
            <label className="addpromolabel">
              Conditions <label className="asterix">*</label>
            </label>
            <br />
            <textarea
              placeholder="Conditions here"
              className="addpromoinputC"
              onChange={(e) => {
                setCon(e.target.value);
              }}
            />
            <br />
            {error && <div className="formerror">{error}</div>}
            <div className="formbutton">
              <input
                type="button"
                className="submitnewpromo"
                value="Submit New Promotion"
                onClick={submit}
              />
            </div>
          </form>
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

export default Addpromo;
