import React from "react";
import RestaurantView from "./RestaurantView";

import AxiosHelper from "../../lib/AxiosHelper";
import AppConfig from "../../config/AppConfig";

import {
  ONLY_ON_SWIGGY_CATEGORY_NAME,
  RESTAURANTS_DEFAULT_LIMIT,
  RESTAURANTS_PER_ROW,
  SEE_ALL_CATEGORY_NAME,
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
    let categoriesScrollPosition = {};
    if (Array.isArray(response) && response.length > 0) {
      let index = 0;
      let onlyOnSwiggyRestaurants = [];
      let allRestaurants = [];
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
        allRestaurants = [
          ...allRestaurants,
          ...restaurantsList[item.category].restaurants
        ];
        ++index;
      }

      if (onlyOnSwiggyRestaurants.length > 0) {
        restaurantsList[ONLY_ON_SWIGGY_CATEGORY_NAME] = {};
        restaurantsList[
          ONLY_ON_SWIGGY_CATEGORY_NAME
        ].restaurants = onlyOnSwiggyRestaurants;
        restaurantsList[
          ONLY_ON_SWIGGY_CATEGORY_NAME
        ].limit = RESTAURANTS_DEFAULT_LIMIT;
      }

      if (allRestaurants.length > 0) {
        restaurantsList[SEE_ALL_CATEGORY_NAME] = {};
        restaurantsList[SEE_ALL_CATEGORY_NAME].restaurants = allRestaurants;
        restaurantsList[SEE_ALL_CATEGORY_NAME].limit = NaN;
      }
    }
    console.log("rrl");
    console.log(restaurantsList);
    this.setState({
      restaurantsList,
      selectedCategory,
      categoriesScrollPosition
    });
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
