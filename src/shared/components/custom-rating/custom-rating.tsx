import React from "react";
import PropTypes from "prop-types";
import Rating from "@mui/material/Rating";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import CustomShare from "../custom-share/CustomShare";

const customIcons: any = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon sx={{ fontSize: 40 }} />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon sx={{ fontSize: 40 }} />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon sx={{ fontSize: 40 }} />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon sx={{ fontSize: 40 }} />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon sx={{ fontSize: 40 }} />,
    label: "Very Satisfied",
  },
};

function IconContainer(props: any) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

class CustomRating extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <Rating
        name="highlight-selected-only"
        defaultValue={2}
        IconContainerComponent={IconContainer}
        highlightSelectedOnly
      />
    );
  }
}
export default CustomRating;
