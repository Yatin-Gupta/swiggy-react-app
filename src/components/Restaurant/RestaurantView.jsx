import { Container, Grid, Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

import RestaurantStyle from "./RestaurantStyle";
import RestaurantCategory from "./shared/RestaurantCategory";
import RestaurantDetail from "./shared/RestaurantDetail";
import ShowMoreCard from "./shared/ShowMoreCard";
import CustomHelper from "../../lib/CustomHelper";
import { RESTAURANTS_PER_ROW } from "./RestaurantConstants";

const restaurantGridSize = parseInt(
  RESTAURANTS_PER_ROW && RESTAURANTS_PER_ROW > 0 ? 12 / RESTAURANTS_PER_ROW : 4,
  10
);

const useStyles = makeStyles(RestaurantStyle);

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
              block: "nearest"
            });
          }
          setSelectedCategory(category);
        }}
      />
    );
  }
  return restaurantCategoryViews;
}

function getRestaurantsView(
  restaurants,
  category,
  limit,
  setShowMoreLimit,
  classes
) {
  const restaurantViews = [];
  let restaurantIndex = 0;
  for (const restaurant of restaurants) {
    if (restaurantIndex < limit) {
      restaurantViews.push(
        <Grid item lg={restaurantGridSize} key={restaurantIndex}>
          <RestaurantDetail restaurant={restaurant} classes={classes} />
        </Grid>
      );
    } else {
      break;
    }
    ++restaurantIndex;
  }
  if (restaurants.length > restaurantIndex) {
    restaurantViews.push(
      <Grid item lg={restaurantGridSize} key={restaurantIndex}>
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
  return restaurantViews;
}

function getRestaurantsCategoryWiseView(
  restaurantsList,
  classes,
  setShowMoreLimit,
  idPrefix = ""
) {
  const restaurantsCategoryWiseViews = [];
  for (const category in restaurantsList) {
    restaurantsCategoryWiseViews.push(
      <React.Fragment key={category}>
        <div className="category-heading">
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
  return restaurantsCategoryWiseViews;
}

function RestaurantView(props) {
  const classes = useStyles();
  const {
    restaurantsList,
    selectedCategory,
    setSelectedCategory,
    setShowMoreLimit
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
                  setSelectedCategory
                )}
              </CardContent>
            </Card>
          </section>
          <section id="restaurants" className={`restaurant-main-panel`}>
            {getRestaurantsCategoryWiseView(
              restaurantsList,
              classes,
              setShowMoreLimit
            )}
          </section>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default RestaurantView;
