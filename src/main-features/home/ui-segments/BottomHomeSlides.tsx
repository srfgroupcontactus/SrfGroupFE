import React, { FunctionComponent } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import Swiper core and required modules
import SwiperCore, {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AllAppConfig } from "../../../core/config/all-config";
import { StorageService } from "../../../shared/services/storage.service";
import { ALL_APP_ROUTES } from "../../../core/config/all-app-routes";
import {
  getBaseImageUrl,
  getImageForOffer,
} from "../../../shared/utils/utils-functions";
import Box from "@mui/material/Box/Box";

import "swiper/css/effect-coverflow";
import "./BottomHomeSlides.scss";
import {
  entitiesImagesOffers,
  loadingEntitiesImagesOffers,
} from "../../offer/store/slice";
import { LazyLoadImage } from "react-lazy-load-image-component";

// install Swiper modules
SwiperCore.use([EffectCoverflow, Pagination, Navigation, Autoplay]);

// export interface IBottomHomeSlidesProp extends StateProps, DispatchProps {
// }

const BottomHomeSlides: FunctionComponent = () => {
  // console.log("BottomHomeSlides ");
  const [slideListBottom, setSlideListBottom] = React.useState(
    StorageService.local.get(AllAppConfig.SlideListBottom)
  );

  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const loadingEntitiesImagesOffersSelector =
    useSelector(loadingEntitiesImagesOffers) ?? [];
  const entitiesImagesOffersSelector = useSelector(entitiesImagesOffers) ?? [];

  React.useEffect(() => {
    if (
      entitiesImagesOffersSelector &&
      entitiesImagesOffersSelector.length > 0
    ) {
      setSlideListBottom(entitiesImagesOffersSelector.slice());

      // For next refresh
      StorageService.local.set(
        AllAppConfig.SlideListBottom,
        entitiesImagesOffersSelector
      );
    }
  }, [entitiesImagesOffersSelector]);

  const rediretTo = (offerId: number) => {
    setTimeout(() => {
      navigate(ALL_APP_ROUTES.OFFER.DEAILS_OFFER + "/" + offerId);
    }, 300);
  };

  return slideListBottom &&
    slideListBottom.length > 0 &&
    !loadingEntitiesImagesOffersSelector ? (
    <Box sx={{ my: 5 }} className="bottom-home-slides">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
      >
        {slideListBottom.map((offer: any, index: number) => (
          <div key={`${index}-${offer[0]}`}>
            <SwiperSlide
              key={`slide-${index}-${offer[0]}`}
              onClick={() => rediretTo(offer[0])}
            >
              <LazyLoadImage
                alt="Image offer"
                src={getImageForOffer(offer[0], offer[1])}
                placeholder={
                  <img
                    src={getBaseImageUrl(
                      AllAppConfig.DEFAULT_LAZY_IMAGE_LOADING
                    )}
                    className="img-lazy-loading"
                    alt="image srfgroup"
                  />
                }
                placeholderSrc={getBaseImageUrl(
                  AllAppConfig.DEFAULT_LAZY_IMAGE_LOADING
                )}
                onError={(e: any) => {
                  e.target.onerror = null;
                  e.target.src = getBaseImageUrl(
                    AllAppConfig.DEFAULT_LAZY_IMAGE
                  );
                }}
                className="img-lazy-loading"
              />
            </SwiperSlide>
          </div>
        ))}
      </Swiper>
    </Box>
  ) : (
    <Box></Box>
  );
}
export default React.memo(BottomHomeSlides);
