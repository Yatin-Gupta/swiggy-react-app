import axios from "axios";

const AxiosHelper = {
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
