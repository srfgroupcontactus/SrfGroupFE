import * as React from "react";
import Box from "@mui/material/Box/Box";
import TopHomeSlides from "./ui-segments/TopHomeSlides";
import ForSellHomeClient from "./ui-segments/ForSellHomeClient";
import ForRentHomeClient from "./ui-segments/ForRentHomeClient";
import SecondHorizentalListHomeClient from "./ui-segments/SecondHorizentalListHomeClient";
import ForFindHomeClient from "./ui-segments/ForFindHomeClient";
import ThirdHorizentalListHomeClient from "./ui-segments/ThirdHorizentalListHomeClient";
import FirstHorizentalListHomeClient from "./ui-segments/FirstHorizentalListHomeClient";
import RecentlyAddedHomeClient from "./ui-segments/RecentlyAddedHomeClient";
import PostHomeFeature from "./ui-segments/PostHomeFeature";
import BottomHomeSlides from "./ui-segments/BottomHomeSlides";
import './home.scss';

export default function Home() {
    // const [isShowContainer, setIsShowContainer] = React.useState(false);
    //
    // React.useEffect(() => {
    //     setTimeout(() => {
    //         setIsShowContainer(true);
    //     }, 1000);
    // }, [])
    //
    // const getClassContainer = isShowContainer ? 'container-mobile-lazy show' : 'container-mobile-lazy';

    console.log('home');
  return (
    <Box>
      <TopHomeSlides />

      <ForSellHomeClient />

      <Box>
          <FirstHorizentalListHomeClient />

          <ForRentHomeClient />

          <SecondHorizentalListHomeClient />

          <ForFindHomeClient />

          <ThirdHorizentalListHomeClient />

          <RecentlyAddedHomeClient />

          <PostHomeFeature />

          <BottomHomeSlides />
      </Box>
    </Box>
  );
}
