import { useState } from "react";
import axios from "axios";
import "./AddReview.css";
import { Rating } from "@material-ui/lab";
import { toast, ToastContainer } from "react-toastify";

const AddReview = (props) => {
  const [id, setid] = useState( props.name ||"Cadbury Milk");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");

  const addReview = async () => {
    
    setid(props.name);
    let { data } = await axios.post("http://localhost:4000/review", {
      id,
      rating,
      review,
    });
    if (data.message === "Success") {
      toast.success("Successfully added!");
    }
  };
  return (
    <div>
      <div className="topcontainer">
        <button className="addreview">Review</button>

        <br />
        <label className="ratingReview">Rating</label>
        <br />
        <Rating
          name="simple-controlled"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
          className="stars"
        />
        <br />

        <label className="addreviewlabel">Add Review</label>
        <br />
        <textarea
          className="textfield"
          onChange={(e) => setReview(e.target.value)}
        />
        <input
          type="button"
          value="Add Review"
          className="addReviewbutton"
          onClick={addReview}
        />
      </div>
      {/* <ToastContainer
        position="bottom-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> */}
    </div>
  );
};

export default AddReview;
