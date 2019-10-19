/**
 * @author Yatin Gupta
 */
import { Avatar, Container, Grid, Card, CardContent } from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import DragHandleIcon from "@material-ui/icons/DragHandle";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

import RestaurantStyle from "./RestaurantStyle";
import RestaurantCategory from "./shared/RestaurantCategory";
import RestaurantDetail from "./shared/RestaurantDetail";
import ShowMoreCard from "./shared/ShowMoreCard";
import CustomHelper from "../../lib/CustomHelper";
import {
  RESTAURANTS_PER_ROW,
  SEE_ALL_CATEGORY_NAME
} from "./RestaurantConstants";

// Restaurant grid size is made configurable
const restaurantGridSize = parseInt(
  RESTAURANTS_PER_ROW && RESTAURANTS_PER_ROW > 0 ? 12 / RESTAURANTS_PER_ROW : 4,
  10
);

// Material UI Component specific style settings
const useStyles = makeStyles(RestaurantStyle);

/**
 * To render Restaurants Categories(Navigation)
 * @param {Object} restaurantsList Category wise restaurants list
 * @param {string} selectedCategory Selected Category
 * @param {Callback} setSelectedCategory Callback to set selected category state
 * @param {string} idPrefix Prefix used before content ids. Default is empty string
 * @returns JSX Expression Array
 */
function getRestaurantCategoriesView(
  restaurantsList,
  selectedCategory,
  setSelectedCategory,
  idPrefix = ""
) {
  const restaurantCategoryViews = [];
  for (const category in restaurantsList) {
    restaurantCategoryViews.push(
      <RestaurantCategory
        category={category}
        key={category}
        selected={selectedCategory === category ? true : false}
        restaurantLength={restaurantsList[category].restaurants.length}
        onClick={event => {
          event.preventDefault();
          const dashSeperatedCategory = category
            .replace(/\s/g, "-")
            .toLowerCase();
          const element = document.getElementById(
            idPrefix !== ""
              ? idPrefix + dashSeperatedCategory
              : dashSeperatedCategory
          );
          if (element !== null) {
            element.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });
          }
          if (!isNaN(restaurantsList[category].limit)) {
            setSelectedCategory(category);
          }
        }}
      />
    );
  }
  return restaurantCategoryViews;
}

/**
 * To render Restaurants
 * @param {Array} restaurants Restaurants List
 * @param {string} category Category to which restaurants belong
 * @param {number} limit  Maximum Limit upto which restaurants must be shown
 * @param {Callback} setShowMoreLimit To increase category restaurants limit
 * @param {Object} classes Object used to set Material UI classes
 * @param {number} gridSize Grid size to render each restaurant. Default is one set from configurations
 * @returns JSX Expression Array
 */

function getRestaurantsView(
  restaurants,
  category,
  limit,
  setShowMoreLimit,
  classes,
  gridSize = restaurantGridSize
) {
  const restaurantViews = [];
  let restaurantIndex = 0;
  if (!isNaN(limit)) {
    for (const restaurant of restaurants) {
      if (restaurantIndex < limit) {
        restaurantViews.push(
          <Grid item lg={gridSize} key={restaurantIndex}>
            <RestaurantDetail restaurant={restaurant} classes={classes} />
          </Grid>
        );
      } else {
        break;
      }
      ++restaurantIndex;
    }
    if (restaurants.length > restaurantIndex) {
      // If still there left restaurants
      restaurantViews.push(
        <Grid item lg={gridSize} key={restaurantIndex}>
          <ShowMoreCard
            remainingRestaurantsCount={restaurants.length - restaurantIndex}
            onClick={event => {
              event.preventDefault();
              setShowMoreLimit(category);
            }}
          />
        </Grid>
      );
    }
  }
  return restaurantViews;
}

/**
 * To render all restaurants in a category
 * @param {Object} restaurantsList Category wise restaurant list
 * @param {Object} classes Object used to set Material UI classes
 * @param {Callback} setShowMoreLimit Callback to increase category restaurants limit
 * @param {Callback} setCategoryRef Callback to set category ref
 * @param {string} idPrefix Prefix used before content ids. Default is empty string
 */
function getRestaurantsCategoryWiseView(
  restaurantsList,
  classes,
  setShowMoreLimit,
  setCategoryRef,
  idPrefix = ""
) {
  const restaurantsCategoryWiseViews = [];
  for (const category in restaurantsList) {
    if (!isNaN(restaurantsList[category].limit)) {
      restaurantsCategoryWiseViews.push(
        <React.Fragment key={category}>
          <div
            className="category-heading"
            ref={element => setCategoryRef(category, element)}
          >
            {CustomHelper.formatToCapitalFirstLetterWords(category)}
          </div>
          <Grid
            container
            spacing={2}
            className="restaurants-list"
            id={`${idPrefix}${category.replace(/\s/g, "-").toLowerCase()}`}
          >
            {getRestaurantsView(
              restaurantsList[category].restaurants,
              category,
              restaurantsList[category].limit,
              setShowMoreLimit,
              classes
            )}
          </Grid>
        </React.Fragment>
      );
    }
  }
  return restaurantsCategoryWiseViews;
}

/**
 * Restaurant View Component which manages only view, not business logic(like event handlers, states)
 * @param {Object} props
 * @returns JSX Expression
 */
function RestaurantView(props) {
  const classes = useStyles();
  const {
    idPrefix,
    moveToLastCategory,
    lastSelectedCategory,
    restaurantsList,
    selectedCategory,
    setCategoryRef,
    setSelectedCategory,
    setShowMoreLimit,
    setRef
  } = props;

  return (
    <React.Fragment>
      <Container fixed>
        <Grid container>
          <section className={`restaurant-side-panel`}>
            <Card className="restaurant-categories">
              <CardContent className="pl-1 pr-1">
                {getRestaurantCategoriesView(
                  restaurantsList,
                  selectedCategory,
                  setSelectedCategory,
                  idPrefix ? idPrefix : ""
                )}
              </CardContent>
            </Card>
          </section>
          <section id="restaurants" className={`restaurant-main-panel`}>
            {getRestaurantsCategoryWiseView(
              restaurantsList,
              classes,
              setShowMoreLimit,
              setCategoryRef,
              idPrefix ? idPrefix : ""
            )}
          </section>
        </Grid>
      </Container>
      <div
        className="all-restaurants"
        ref={element => setRef("seeAllParentElementRef", element)}
      >
        <div className="all-restaurants-heading">
          <span className="icon">
            <ArrowDownwardIcon />
          </span>{" "}
          ALL RESTAURANTS
        </div>
        <Container>
          <Card>
            <CardContent>
              <Grid container>
                <Grid
                  item
                  lg={12}
                  className="all-restaurants-header"
                  id={`${
                    idPrefix ? idPrefix : ""
                  }${SEE_ALL_CATEGORY_NAME.replace(/\s/g, "-").toLowerCase()}`}
                >
                  <Avatar
                    className="icon"
                    onClick={event => {
                      event.preventDefault();
                      const lastSelectedCategoryId = lastSelectedCategory
                        .replace(/\s/g, "-")
                        .toLowerCase();
                      const lastSelectedElement = document.getElementById(
                        lastSelectedCategoryId
                      );
                      if (lastSelectedElement !== null) {
                        lastSelectedElement.scrollIntoView({
                          behavior: "smooth",
                          block: "start"
                        });
                        moveToLastCategory();
                      }
                    }}
                  >
                    <DragHandleIcon />
                  </Avatar>
                  <span className="header-title">
                    {restaurantsList[SEE_ALL_CATEGORY_NAME]
                      ? restaurantsList[SEE_ALL_CATEGORY_NAME].restaurants
                          .length
                      : 0}{" "}
                    Restaurants
                  </span>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                className="restaurants-list"
                ref={element => setCategoryRef(SEE_ALL_CATEGORY_NAME, element)}
              >
                {restaurantsList[SEE_ALL_CATEGORY_NAME] ? (
                  getRestaurantsView(
                    restaurantsList[SEE_ALL_CATEGORY_NAME].restaurants,
                    SEE_ALL_CATEGORY_NAME,
                    restaurantsList[SEE_ALL_CATEGORY_NAME].restaurants.length,
                    () => {},
                    classes,
                    3
                  )
                ) : (
                  <React.Fragment />
                )}
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default RestaurantView;
