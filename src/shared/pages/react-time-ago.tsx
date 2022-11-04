import * as React from "react";
import ReactTimeAgo from "react-time-ago";

export const ConvertReactTimeAgo = (date: any, locale?: any) => {
  if (date && date.convertDate) {
    return <ReactTimeAgo date={new Date(date.convertDate)} locale="fr-FR" />;
  } else {
    return <></>;
  }
};
