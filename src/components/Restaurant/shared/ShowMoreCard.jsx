import { Card, CardContent } from "@material-ui/core";
import React from "react";

function ShowMoreCard(props) {
  const { remainingRestaurantsCount, onClick } = props;
  return (
    <React.Fragment>
      <Card className="show-more-card" onClick={onClick}>
        <CardContent>+{remainingRestaurantsCount} MORE</CardContent>
      </Card>
    </React.Fragment>
  );
}

export default ShowMoreCard;
