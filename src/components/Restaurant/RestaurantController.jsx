/**
 * @author Yatin Gupta
 */
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

/**
 * Controller Component which manage all states and business logic
 */
class RestaurantController extends React.Component {
  state = {
    restaurantsList: {},
    selectedCategory: "",
    lastSelectedCategory: ""
  };

  categoryRefs = {};
  seeAllParentElementRef = null;
  scrollTimer = null;

  /**
   * React Lifecycle method
   */
  async componentDidMount() {
    // Get axios response
    const response = await AxiosHelper.axiosGetAction(
      AppConfig.ENDPOINTS.restaurants
    );
    const restaurantsList = {};
    let selectedCategory = "";
    let categoriesScrollPosition = {};
    // Format API response to usable data
    if (Array.isArray(response) && response.length > 0) {
      let index = 0;
      let onlyOnSwiggyRestaurants = [];
      let allRestaurants = [];
      for (const item of response) {
        // Ensure by default first index category will be selected
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
    // Attaching event listeners
    window.addEventListener("scroll", this.scrollHandler);
    // Initializing data into states
    this.setState({
      restaurantsList,
      selectedCategory,
      categoriesScrollPosition
    });
  }

  /**
   * React Lifecycle Method
   */
  render() {
    const {
      restaurantsList,
      lastSelectedCategory,
      selectedCategory
    } = this.state;
    return (
      <React.Fragment>
        <RestaurantView
          moveToLastCategory={this.moveToLastCategory}
          restaurantsList={restaurantsList}
          selectedCategory={selectedCategory}
          lastSelectedCategory={lastSelectedCategory}
          setSelectedCategory={this.setSelectedCategory}
          setShowMoreLimit={this.setShowMoreLimit}
          setCategoryRef={this.setCategoryRef}
          setRef={this.setRef}
        />
      </React.Fragment>
    );
  }

  /**
   * Event handler for scroll
   */
  scrollHandler = event => {
    // scrollTimer is used to run scroll action only when scroll stops.
    if (this.scrollTimer !== null) {
      clearTimeout(this.scrollTimer);
    }
    this.scrollTimer = setTimeout(() => {
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
        this.setSelectedCategory(tempCategory);
      }
    }, 150);
  };

  /**
   * Set Category wise ref elements
   */
  setCategoryRef = (category, element) => {
    this.categoryRefs[category] = element;
  };

  /**
   * Set Ref element provided with ref element name(must be same as set as this component properties) and element
   */
  setRef = (refName, element) => {
    this[refName] = element;
  };

  /**
   * Set selected category to provided category
   */
  setSelectedCategory = category => {
    this.setState({
      lastSelectedCategory: this.state.selectedCategory,
      selectedCategory: category
    });
  };

  /**
   * Increase display limit of restaurants in given category
   */
  setShowMoreLimit = category => {
    let { restaurantsList } = this.state;
    restaurantsList[category].limit += SHOW_MORE_ROWS * RESTAURANTS_PER_ROW;
    this.setState({ restaurantsList });
  };

  /**
   * Set current selected category to last selected category
   */
  moveToLastCategory = () => {
    this.setSelectedCategory(this.state.lastSelectedCategory);
  };
}

export default RestaurantController;
