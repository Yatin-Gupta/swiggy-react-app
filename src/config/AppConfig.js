/**
 * @author Yatin Gupta
 * Application specific configuration
 * Usually, I keep endpoints and many client side settings(setting that client may want to change) in public and include it in code
 * by making some settings in webpack configuation. But for this project I have not done that so as to avoid confusion.
 */
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
