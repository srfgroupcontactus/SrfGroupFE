import * as React from "react";
import Box from "@mui/material/Box/Box";
import { FilterOffer } from "./FilterOffer";
import { IAddress } from "../../../../../shared/model/address.model";

export default function LeftSearchClient({
  listAddress,
  filterCallback,
}: {
  listAddress: IAddress[];
  filterCallback: (formik: any) => void;
}) {
  React.useEffect(() => {
    try {
      if (FB) {
        FB.XFBML.parse();
      }
    } catch (e) {
      window.console.error("FB not defined");
    }
  }, []);

  const onChange = (values: any) => {
    filterCallback(values);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <FilterOffer listAddress={listAddress} handelChange={onChange} />

      <Box sx={{ mb: 4 }}>
        <div style={{ width: "100%" }}>
          <div
            className="fb-page"
            data-href="https://www.facebook.com/profile.php?id=100054409273167"
            data-tabs="timeline"
            data-width="250"
            data-height=""
            data-small-header="false"
            data-adapt-container-width="true"
            data-hide-cover="false"
            data-show-facepile="true"
          ></div>
        </div>
      </Box>
    </Box>
  );
}
