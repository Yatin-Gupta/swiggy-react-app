/**
 * @author Yatin Gupta
 * Contains methods that helps in executing complex logic that is required to use many times in code.
 */

const CustomHelper = {
  /**
   * Convert yatin gupta to Yatin Gupta
   */
  formatToCapitalFirstLetterWords: str => {
    return str
      .split(/\s/)
      .map(item => item.charAt(0).toUpperCase() + item.substr(1))
      .join(" ");
  }
};

export default CustomHelper;
