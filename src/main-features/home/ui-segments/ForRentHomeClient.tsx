import React from "react";
import Container from "@mui/material/Container/Container";
import Grid from "@mui/material/Grid/Grid";
import CardActionArea from "@mui/material/CardActionArea/CardActionArea";
import Card from "@mui/material/Card/Card";
import CardMedia from "@mui/material/CardMedia/CardMedia";
import CardContent from "@mui/material/CardContent/CardContent";
import Typography from "@mui/material/Typography/Typography";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box/Box";
import { ALL_APP_ROUTES } from "../../../core/config/all-app-routes";
import { IRentOffer } from "../../../shared/model/rent-offer.model";
import {
  getBaseImageUrl,
  getImageForOffer,
} from "../../../shared/utils/utils-functions";
import { AllAppConfig } from "../../../core/config/all-config";
import { useTranslation } from "react-i18next";
import { TypeOfferEnum } from "../../../shared/enums/type-offer.enum";
import { IOffer } from "../../../shared/model/offer.model";
import { Swiper, SwiperSlide } from "swiper/react";

import "./ForRentHome.scss";

import { Pagination } from "swiper";
import { ConvertReactTimeAgo } from "../../../shared/pages/react-time-ago";
// import { LazyImage } from 'react-lazy-images';
import { entitiesRentOffer } from "../../offer/store/slice";
import { LazyLoadImage } from "react-lazy-load-image-component";

function ItemForRentHome({
  offer,
  index,
  rediretTo,
}: {
  offer: IOffer;
  index: number;
  rediretTo: any;
}) {
  return (
    <CardActionArea component="a" onClick={() => rediretTo(offer.id)}>
      {/*For Desktop*/}
      <Card sx={{ display: { xs: "none", sm: "flex" } }}>
        {index % 2 === 0 ? (
          offer.offerImages && offer.offerImages.length ? (
            <CardMedia
              sx={{
                width: { xs: "100%", sm: 250 },
                height: { xs: "100%", sm: 200 },
                backgroundColor: "#0000004f",
              }}
            >
              <LazyLoadImage
                alt="Image offer"
                src={getImageForOffer(offer.id, offer.offerImages[0].path)}
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
            </CardMedia>
          ) : (
            <CardMedia
              sx={{
                width: { xs: "100%", sm: 250 },
                height: { xs: "100%", sm: 200 },
                backgroundColor: "#0000004f",
              }}
            >
              <img
                src={getBaseImageUrl(AllAppConfig.DEFAULT_LAZY_IMAGE)}
                className="img-lazy-loading"
                alt="image not found"
              />
            </CardMedia>
          )
        ) : null}
        <CardContent sx={{ flex: 1 }}>
          <Typography component="h2" variant="h5">
            {offer.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            <ConvertReactTimeAgo convertDate={offer.dateCreated} />
          </Typography>
          <Box className="truncate-string-two-lines" style={{ maxWidth: 400 }}>
            <div
              dangerouslySetInnerHTML={{ __html: offer.description || "" }}
            ></div>
          </Box>
        </CardContent>
        {index % 2 !== 0 ? (
          offer.offerImages && offer.offerImages.length ? (
            <CardMedia
              sx={{
                width: { xs: "100%", sm: 250 },
                height: { xs: "100%", sm: 200 },
                backgroundColor: "#0000004f",
              }}
            >
              <LazyLoadImage
                alt="Image offer"
                src={getImageForOffer(offer.id, offer.offerImages[0].path)}
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
                className="full-img-responsive"
              />
            </CardMedia>
          ) : (
            <CardMedia
              sx={{
                width: { xs: "100%", sm: 250 },
                height: { xs: "100%", sm: 200 },
                backgroundColor: "#0000004f",
              }}
            >
              <img
                src={getBaseImageUrl(AllAppConfig.DEFAULT_LAZY_IMAGE)}
                className="img-lazy-loading"
                alt="image not found"
              />
            </CardMedia>
          )
        ) : null}
      </Card>

      {/*For Mobile*/}
      <Card sx={{ display: { xs: "block", sm: "none" } }}>
        {offer.offerImages && offer.offerImages.length ? (
          <CardMedia
            sx={{
              width: { xs: "100%", sm: 250 },
              height: { xs: "100%", sm: 200 },
              backgroundColor: "#0000004f",
            }}
          >
            <LazyLoadImage
              alt="Image offer"
              src={getImageForOffer(offer.id, offer.offerImages[0].path)}
              placeholder={
                <img
                  src={getBaseImageUrl(AllAppConfig.DEFAULT_LAZY_IMAGE_LOADING)}
                  className="img-lazy-loading"
                  alt="image srfgroup"
                />
              }
              placeholderSrc={getBaseImageUrl(
                AllAppConfig.DEFAULT_LAZY_IMAGE_LOADING
              )}
              onError={(e: any) => {
                e.target.onerror = null;
                e.target.src = getBaseImageUrl(AllAppConfig.DEFAULT_LAZY_IMAGE);
              }}
              className="full-img-responsive"
            />
          </CardMedia>
        ) : (
          <CardMedia
            sx={{
              width: { xs: "100%", sm: 250 },
              height: { xs: "100%", sm: 200 },
              backgroundColor: "#0000004f",
            }}
          >
            <img
              src={getBaseImageUrl(AllAppConfig.DEFAULT_LAZY_IMAGE)}
              className="img-lazy-loading"
              alt="image not found"
            />
          </CardMedia>
        )}
        <CardContent sx={{ flex: 1 }}>
          <Typography component="h2" variant="h5">
            {offer.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            <ConvertReactTimeAgo convertDate={offer.dateCreated} />
          </Typography>
          <Box className="truncate-string-two-lines" style={{ maxWidth: 400 }}>
            <div
              dangerouslySetInnerHTML={{ __html: offer.description || "" }}
            ></div>
          </Box>
        </CardContent>
      </Card>
    </CardActionArea>
  );
}

export const ForRentHomeClient = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const entitiesRentOfferSelector = useSelector(entitiesRentOffer) ?? [];

  const rediretTo = (offerId?: number) => {
    setTimeout(() => {
      navigate(ALL_APP_ROUTES.OFFER.DEAILS_OFFER + "/" + offerId);
    }, 300);
  };

  return (
    <Container maxWidth="xl" className="container-for-rent-home">
      <h3>
        <Link
          to={`${ALL_APP_ROUTES.OFFER.LIST}?typeOffer=${TypeOfferEnum.Rent}`}
        >
          {t<string>("common.for_rent")}
        </Link>
      </h3>
      <Grid
        container
        rowSpacing={2}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ display: { xs: "none", md: "flex" } }}
      >
        {entitiesRentOfferSelector.map((offer: IRentOffer, index: number) => (
          <Grid item xs={12} md={6} key={`offer-${index}`}>
            <ItemForRentHome
              offer={offer}
              index={index}
              rediretTo={rediretTo}
            />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: { md: "none" } }} className="box-swiper">
        <Swiper
          pagination={true}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {entitiesRentOfferSelector.map((offer: IRentOffer, index: number) => (
            <SwiperSlide key={`offer-${index}`}>
              <ItemForRentHome
                offer={offer}
                index={index}
                rediretTo={rediretTo}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Container>
  );
};
export default React.memo(ForRentHomeClient);
