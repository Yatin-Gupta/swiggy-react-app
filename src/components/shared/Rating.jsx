/**
 * @author Yatin Gupta
 */
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import StarHalfIcon from "@material-ui/icons/StarHalf";
import React from "react";

import "./Rating.css";

/**
 * To render rating
 * This component is put outside, because this is App level shared component i.e it can be used by other components also.
 * @param {Object} props
 */
function Rating(props) {
  /*
  color - success, warning(default is shown colorless)
  size - sm (also default value)
  rating - value or undefined (default is undefined)
  star - full or half (default is shown with only border, neither half nor full)
  */
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
