/**
 * @author Yatin Gupta
 * Axios Helper library - This library is made by me in my inhouse project. This library allows to set axios configuration, exception callback(that I had used
 * to log error on third party app Sentry), mustCallback(callback that should run in any case even if exception comes)
 */
import axios from "axios";

const AxiosHelper = {
  /**
   * Method used to run DELETE request
   */
  axiosDeleteAction: async (
    url,
    config = axios.defaults,
    exceptionCallback = error => {},
    mustCallback = () => {}
  ) => {
    let returnValue;
    try {
      const response = await axios.delete(url, config);
      returnValue = response.data;
    } catch (error) {
      exceptionCallback(error);
    } finally {
      mustCallback();
    }
    return returnValue;
  },

  /**
   * Method used to run GET request
   */
  axiosGetAction: async (
    url,
    config = axios.defaults,
    exceptionCallback = error => {},
    mustCallback = () => {}
  ) => {
    let returnValue;
    try {
      const response = await axios.get(url, config);
      returnValue = response.data;
    } catch (error) {
      exceptionCallback(error);
    } finally {
      mustCallback();
    }
    return returnValue;
  },

  /**
   * Method used to run POST request
   */
  axiosPostAction: async (
    url,
    data,
    config = axios.defaults,
    exceptionCallback = error => {},
    mustCallback = () => {}
  ) => {
    let returnValue;
    try {
      const response = await axios.post(url, data, config);
      returnValue = response.data;
    } catch (error) {
      exceptionCallback(error);
    } finally {
      mustCallback();
    }
    return returnValue;
  },

  /**
   * Method used to run PUT request
   */
  axiosPutAction: async (
    url,
    data,
    config = axios.defaults,
    exceptionCallback = error => {},
    mustCallback = () => {}
  ) => {
    let returnValue;
    try {
      const response = await axios.put(url, data, config);
      returnValue = response.data;
    } catch (error) {
      exceptionCallback(error);
    } finally {
      mustCallback();
    }
    return returnValue;
  }
};

export default AxiosHelper;
