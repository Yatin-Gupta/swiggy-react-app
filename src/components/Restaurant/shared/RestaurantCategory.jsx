import { Avatar } from "@material-ui/core";
import React from "react";
import { ICONS } from "../RestaurantConstants";

import CustomHelper from "../../../lib/CustomHelper";

function RestaurantCategory(props) {
  const { category, restaurantLength, onClick } = props;
  const dashSeperatedCategory = category.replace(/\s/g, "-").toLowerCase();
  const selected = props.selected === undefined ? false : props.selected;

  if (dashSeperatedCategory) {
    return (
      <React.Fragment>
        <nav
          className={`restaurant-category ${selected ? "selected" : ""}`}
          onClick={onClick}
        >
          <Avatar
            src={
              selected
                ? ICONS[dashSeperatedCategory].light
                : ICONS[dashSeperatedCategory].dark
            }
            className="category-avatar"
          />

          <div className={`restaurant-category-navtext`}>
            <div>{CustomHelper.formatToCapitalFirstLetterWords(category)}</div>
            <div>{restaurantLength} options</div>
          </div>
        </nav>
      </React.Fragment>
    );
  } else {
    return <React.Fragment></React.Fragment>;
  }
}

export default RestaurantCategory;
