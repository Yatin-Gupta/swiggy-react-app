import RestaurantController from "../components/Restaurant/RestaurantController";

const ROUTES = {
  root: {
    path: "/",
    component: RestaurantController
  }
};

const ENDPOINTS = {
  restaurants: "/reactTask.json"
};

export default {
  ENDPOINTS,
  ROUTES
};
