const CustomHelper = {
  formatToCapitalFirstLetterWords: str => {
    return str
      .split(/\s/)
      .map(item => item.charAt(0).toUpperCase() + item.substr(1))
      .join(" ");
  }
};

export default CustomHelper;
