import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { FreeMode, Pagination } from "swiper";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader/CardHeader";
import Avatar from "@mui/material/Avatar/Avatar";
import {
  getBaseImageUrl,
  getFullnameUser,
  getImageForOffer,
  getUserAvatar,
} from "../../../../../shared/utils/utils-functions";
import IconButton from "@mui/material/IconButton/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ConvertReactTimeAgo } from "../../../../../shared/pages/react-time-ago";
import CardMedia from "@mui/material/CardMedia";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AllAppConfig } from "../../../../../core/config/all-config";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CardActionArea from "@mui/material/CardActionArea/CardActionArea";
import styled from "@mui/material/styles/styled";
import { ALL_APP_ROUTES } from "../../../../../core/config/all-app-routes";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

const ExpandMore = styled((props: any) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ListRelatedDetailsOffer({
  listOffers,
}: {
  listOffers: any;
}) {
  const navigate = useNavigate();

  const rediretTo = (offerId: string) => {
    setTimeout(() => {
      navigate(ALL_APP_ROUTES.DETAILS_OFFER + "/" + offerId);
    }, 300);
  };

  return (
    <Box sx={{ my: 5 }}>
      <Swiper
        breakpoints={{
          // when window width is >= 768px
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        slidesPerView={1}
        spaceBetween={1}
        navigation={true}
        freeMode={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {listOffers.map((offer: any, index: number) => (
          <SwiperSlide key={`offer-${index}`}>
            <CardActionArea
              component="a"
              onClick={() => rediretTo(offer.id)}
              key={`entity-${index}`}
            >
              <Card sx={{ display: "flex", flexDirection: "column" }}>
                <CardHeader
                  className="bg-yellow"
                  avatar={
                    <Avatar
                      role="img"
                      aria-label="Image avatar"
                      src={getUserAvatar(
                        offer.user?.id,
                        offer.user?.imageUrl,
                        offer.user?.sourceConnectedDevice
                      )}
                      alt="image not found"
                    >
                      {getFullnameUser(offer.user)?.charAt(0)}
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={getFullnameUser(offer?.user)}
                  subheader={
                    <ConvertReactTimeAgo convertDate={offer.dateCreated} />
                  }
                />

                {offer.offerImages && offer.offerImages.length ? (
                  <CardMedia sx={{ height: 200 }}>
                    <LazyLoadImage
                      alt="Image offer"
                      src={getImageForOffer(
                        offer.id,
                        offer.offerImages[0].path
                      )}
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
                    component="img"
                    height="200"
                    image={getBaseImageUrl(AllAppConfig.DEFAULT_LAZY_IMAGE)}
                    alt="image not found"
                  />
                )}

                <CardContent className="card-content-offer">
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    className="truncate-string-two-lines"
                  >
                    <span
                      dangerouslySetInnerHTML={{
                        __html: offer.description || "",
                      }}
                    ></span>
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                  <ExpandMore aria-label="show more">
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
              </Card>
            </CardActionArea>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
