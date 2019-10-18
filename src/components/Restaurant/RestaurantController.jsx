import React from "react";
import RestaurantView from "./RestaurantView";

import AxiosHelper from "../../lib/AxiosHelper";
import AppConfig from "../../config/AppConfig";

import {
  RESTAURANTS_DEFAULT_LIMIT,
  RESTAURANTS_PER_ROW,
  SHOW_MORE_ROWS
} from "./RestaurantConstants";

import "./Restaurant.css";

class RestaurantController extends React.Component {
  state = {
    restaurantsList: {},
    selectedCategory: ""
  };

  async componentDidMount() {
    const response = await AxiosHelper.axiosGetAction(
      AppConfig.ENDPOINTS.restaurants
    );
    const restaurantsList = {};
    let selectedCategory = "";
    if (Array.isArray(response) && response.length > 0) {
      let index = 0;
      let onlyOnSwiggyRestaurants = [];
      for (const item of response) {
        if (index === 0) {
          selectedCategory = item.category;
        }
        restaurantsList[item.category] = {};
        restaurantsList[item.category].restaurants = item.restaurantList;
        restaurantsList[item.category].limit = RESTAURANTS_DEFAULT_LIMIT;
        onlyOnSwiggyRestaurants = [
          ...onlyOnSwiggyRestaurants,
          ...restaurantsList[item.category].restaurants.filter(
            restaurant => restaurant.isExlusive
          )
        ];
        ++index;
      }

      if (onlyOnSwiggyRestaurants.length > 0) {
        restaurantsList["only on swiggy"] = {};
        restaurantsList["only on swiggy"].restaurants = onlyOnSwiggyRestaurants;
        restaurantsList["only on swiggy"].limit = RESTAURANTS_DEFAULT_LIMIT;
      }
    }
    this.setState({ restaurantsList, selectedCategory });
  }

  render() {
    const { restaurantsList, selectedCategory } = this.state;
    return (
      <React.Fragment>
        <RestaurantView
          restaurantsList={restaurantsList}
          selectedCategory={selectedCategory}
          setSelectedCategory={this.setSelectedCategory}
          setShowMoreLimit={this.setShowMoreLimit}
        />
      </React.Fragment>
    );
  }

  setSelectedCategory = category => {
    this.setState({ selectedCategory: category });
  };

  setShowMoreLimit = category => {
    let { restaurantsList } = this.state;
    restaurantsList[category].limit += SHOW_MORE_ROWS * RESTAURANTS_PER_ROW;
    this.setState({ restaurantsList });
  };
}

export default RestaurantController;
