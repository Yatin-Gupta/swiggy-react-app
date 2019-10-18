import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import StarHalfIcon from "@material-ui/icons/StarHalf";
import React from "react";

import "./Rating.css";

function Rating(props) {
  const { color, size, rating, star } = props;
  return (
    <div
      className={`rating rating-${color ? color : ""} rating-${
        size ? size : "sm"
      }`}
    >
      {star === "full" ? (
        <StarIcon />
      ) : star === "half" ? (
        <StarHalfIcon />
      ) : (
        <StarBorderIcon />
      )}
      {rating === undefined || rating <= 0 ? (
        <span className="ml-1"> __</span>
      ) : (
        <span className="ml-1"> {rating}</span>
      )}
    </div>
  );
}

export default Rating;
