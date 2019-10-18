import { Card, CardContent, CardMedia } from "@material-ui/core";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import React from "react";
import { FOOD_IMAGES } from "../RestaurantConstants";

function RestaurantDetail(props) {
  const currentImageIndex = parseInt(Math.random() * FOOD_IMAGES.length, 10);
  const { classes, restaurant } = props;
  return (
    <React.Fragment>
      <Card className="restaurant-card">
        <CardMedia
          className={classes.cardMedia}
          image={FOOD_IMAGES[currentImageIndex]}
        />
        <CardContent>
          <div className="food-title">{restaurant.name}</div>
          <div className="food-type">{restaurant.food_types.join(", ")}</div>
          <div className="food-other-details">
            <div className="rating">
              <StarBorderIcon />
              <span> __</span>
            </div>
            <div className="seperator">•</div>
            <div className="cooking-time">{restaurant.delivery_time}</div>
            <div className="seperator">•</div>
            <div className="price-description">
              ₹{restaurant.price_for_two} FOR TWO
            </div>
          </div>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}

export default RestaurantDetail;
