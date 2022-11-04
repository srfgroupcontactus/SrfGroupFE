import React, { FunctionComponent } from "react";
import Box from "@mui/material/Box";
import { SearchAppBar } from "../../../shared/layout/menus/SearchAppBar";
import { useSelector } from "react-redux";
import { AllAppConfig } from "../../../core/config/all-config";
import { ALL_APP_ROUTES } from "../../../core/config/all-app-routes";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Lazy, Parallax, Pagination, Navigation } from "swiper";
import "swiper/css/lazy";
import "./TopHomeSlides.scss";
import { StorageService } from "../../../shared/services/storage.service";
import { ITopHomeSlidesImages } from "../../../shared/model/top-home-slides-images.model";
import i18n from "i18next";
import {checkMobileDesktopBrowser, getFullUrlWithParams } from "../../../shared/utils/utils-functions";
import { allCategorySelector } from "../../category/store/slice";
import { allAddressSelector } from "../../address/store/slice";
import { entitiesTopHomeSlidesImages } from "../store/slice";
import { SourceProvider } from "../../../shared/enums/source-provider";

const TopHomeSlides: FunctionComponent = () => {
  // console.log("TopHomeSlides ");
  const [listTopSlidesImage] = React.useState<ITopHomeSlidesImages[]>(
    StorageService.local.get(AllAppConfig.HOME_TOP_SLIDES_IMAGE)
  );
  const [defaultLanguage, setDefaultLanguage] = React.useState("fr");

  const navigate = useNavigate();

  const entitiesCategories = useSelector(allCategorySelector).entities ?? [];
  const entitiesAddress = useSelector(allAddressSelector).entities ?? [];
  const entitiesTopHomeSlidesImagesSelector =
    useSelector(entitiesTopHomeSlidesImages) ?? [];

  React.useEffect(() => {
    i18n.on("languageChanged", (lang: any) => {
      setDefaultLanguage(lang);
    });
  }, []);

  const searchCalback = (values: any) => {
    navigate({
      pathname: ALL_APP_ROUTES.SEARCH,
      search:
        "?" + new URLSearchParams(getFullUrlWithParams(values)).toString(),
    });
  };

  React.useEffect(() => {
    if (entitiesTopHomeSlidesImagesSelector?.length) {
      StorageService.local.set(
        AllAppConfig.HOME_TOP_SLIDES_IMAGE,
        entitiesTopHomeSlidesImagesSelector.slice()
      );
    }
  }, [entitiesTopHomeSlidesImagesSelector]);

  const getBackgroundImage = (item: any) => {
      return checkMobileDesktopBrowser() === SourceProvider.WEB_BROWSER ? item?.imageDesktop : item?.imageMobile;
  };

  const getDescription = (item: ITopHomeSlidesImages): string => {
    if (defaultLanguage === "en") {
      return item.descriptionEn || "";
    } else if (defaultLanguage === "fr") {
      return item.descriptionFr || "";
    }
    return item.descriptionAr || "";
  };

  return (
    <div className="top-home-slides">
      {listTopSlidesImage && listTopSlidesImage.length ? (
        <Swiper
          speed={600}
          parallax={true}
          pagination={{
            clickable: true,
          }}
          lazy={true}
          navigation={false}
          modules={[Lazy, Parallax, Pagination, Navigation]}
          className="mySwiper"
          loop={true}
          autoplay={{
            delay: 7000,
            disableOnInteraction: false,
          }}
        >
          {listTopSlidesImage.map(
            (item: ITopHomeSlidesImages, index: number) => (
                <SwiperSlide key={`index-${index}`}>
                    <div
                        slot="container-start"
                        className="parallax-bg"
                        style={{ backgroundImage: `url(${getBackgroundImage(item)})` }}
                        data-swiper-parallax="-23%"
                    ></div>
                    <div className="text" data-swiper-parallax="-300">
                        <div
                            dangerouslySetInnerHTML={{ __html: getDescription(item) }}
                        ></div>
                    </div>
                </SwiperSlide>
            )
          )}
        </Swiper>
      ) : null}

      <Box
        sx={{
          position: { xs: "relative", md: "absolute" },
          bottom: -50,
          right: 0,
          left: 0,
          marginRight: "auto",
          marginLeft: "auto",
          backgroundColor: "#fff",
          maxWidth: 959,
          height: { sx: "auto", md: 100 },
          zIndex: 9,
        }}
      >
        <SearchAppBar
          entitiesCategories={entitiesCategories?.slice()}
          searchCalback={searchCalback}
          listAddress={entitiesAddress?.slice()}
          hideFilter={true}
        />
      </Box>
    </div>
  );
};
export default React.memo(TopHomeSlides);
