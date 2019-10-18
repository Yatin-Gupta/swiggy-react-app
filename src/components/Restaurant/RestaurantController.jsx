import React from "react";
import RestaurantView from "./RestaurantView";

import AxiosHelper from "../../lib/AxiosHelper";
import AppConfig from "../../config/AppConfig";

import { RESTAURANTS_DEFAULT_LIMIT } from "./RestaurantConstants";

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
      for (const item of response) {
        if (index === 0) {
          selectedCategory = item.category;
        }
        restaurantsList[item.category] = {};
        restaurantsList[item.category].restaurants = item.restaurantList;
        restaurantsList[item.category].limit = RESTAURANTS_DEFAULT_LIMIT;
        ++index;
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
        />
      </React.Fragment>
    );
  }

  setSelectedCategory = category => {
    this.setState({ selectedCategory: category });
  };
}

export default RestaurantController;
