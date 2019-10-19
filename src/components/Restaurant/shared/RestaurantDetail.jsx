/**
 * @author Yatin Gupta
 */
import { Card, CardContent, CardMedia } from "@material-ui/core";
import React from "react";
import Rating from "../../shared/Rating";

import { FOOD_IMAGES } from "../RestaurantConstants";

/**
 * To render restaurant details
 * Shared Component that can be shared between different Restaurant Components
 * @param {Object} props
 */
function RestaurantDetail(props) {
  const currentImageIndex = parseInt(Math.random() * FOOD_IMAGES.length, 10);
  const { classes, restaurant } = props;
  const restaurantRating = parseFloat(restaurant.ratings);
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
            {isNaN(restaurantRating) ? (
              <Rating />
            ) : restaurantRating >= 4 ? (
              <Rating
                color={"success"}
                star={"full"}
                rating={`${restaurantRating}`}
              />
            ) : (
              <Rating
                color={"warning"}
                star={"full"}
                rating={`${restaurantRating}`}
              />
            )}
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
