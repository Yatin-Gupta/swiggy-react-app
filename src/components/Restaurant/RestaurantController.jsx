import React from "react";
import RestaurantView from "./RestaurantView";

import AxiosHelper from "../../lib/AxiosHelper";
import AppConfig from "../../config/AppConfig";

import {
  ONLY_ON_SWIGGY_CATEGORY_NAME,
  RESTAURANTS_DEFAULT_LIMIT,
  RESTAURANTS_PER_ROW,
  SEE_ALL_CATEGORY_NAME,
  SHOW_MORE_ROWS,
  COLORS
} from "./RestaurantConstants";

import "./Restaurant.css";

class RestaurantController extends React.Component {
  state = {
    restaurantsList: {},
    selectedCategory: ""
  };

  categoryRefs = {};
  seeAllParentElementRef = null;

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
        this.categoryRefs[item.category] = null;
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
    window.addEventListener("scroll", this.scrollHandler);
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
          setCategoryRef={this.setCategoryRef}
          setRef={this.setRef}
        />
      </React.Fragment>
    );
  }

  scrollHandler = event => {
    const { selectedCategory } = this.state;
    let tempCategory = selectedCategory;
    let topDistance = undefined;
    for (const category in this.categoryRefs) {
      if (this.categoryRefs[category]) {
        const elementCoords = this.categoryRefs[
          category
        ].getBoundingClientRect();
        if (elementCoords.top <= 0) {
          if (topDistance === undefined || elementCoords.top > topDistance) {
            topDistance = elementCoords.top;
            tempCategory = category;
          }
        }
      }
    }
    if (selectedCategory !== tempCategory) {
      if (this.seeAllParentElementRef !== null) {
        this.seeAllParentElementRef.style.backgroundColor =
          tempCategory === SEE_ALL_CATEGORY_NAME ? COLORS.white : COLORS.red;
      }
      this.setState({ selectedCategory: tempCategory });
    }
  };

  setCategoryRef = (category, element) => {
    this.categoryRefs[category] = element;
  };

  setRef = (refName, element) => {
    this[refName] = element;
  };

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
