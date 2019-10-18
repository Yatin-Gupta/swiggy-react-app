import { Container, Grid, Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

import RestaurantStyle from "./RestaurantStyle";
import RestaurantCategory from "./shared/RestaurantCategory";
import RestaurantDetail from "./shared/RestaurantDetail";
import CustomHelper from "../../lib/CustomHelper";

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

function getRestaurantsView(restaurants, classes) {
  const restaurantViews = [];
  let restaurantIndex = 0;
  for (const restaurant of restaurants) {
    restaurantViews.push(
      <Grid item lg={4} key={restaurantIndex}>
        <RestaurantDetail restaurant={restaurant} classes={classes} />
      </Grid>
    );
    ++restaurantIndex;
  }
  return restaurantViews;
}

function getRestaurantsCategoryWiseView(
  restaurantsList,
  classes,
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
          {getRestaurantsView(restaurantsList[category].restaurants, classes)}
        </Grid>
      </React.Fragment>
    );
  }
  return restaurantsCategoryWiseViews;
}

function RestaurantView(props) {
  const classes = useStyles();
  const { restaurantsList, selectedCategory, setSelectedCategory } = props;

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
            {getRestaurantsCategoryWiseView(restaurantsList, classes)}
          </section>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default RestaurantView;
