// import { Rating } from "@material-ui/lab";
import React from "react";
import profilePng from "../../images/Profile.png";
import ReactStars from "react-rating-stars-component";

const ReviewCard = ({ review }) => {
  const options = {
    edit: false,
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: review.rating,
    isHalf: true,
  };

  return (
    <div className="reviewCard">
      <img src={profilePng} alt="User" />
      <p>{review.name}</p>
      <ReactStars {...options} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;