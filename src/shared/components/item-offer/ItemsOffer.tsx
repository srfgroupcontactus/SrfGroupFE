import React from "react";
import Box from "@mui/material/Box/Box";
import { ALL_APP_ROUTES } from "../../../core/config/all-app-routes";
import Grid from "@mui/material/Grid/Grid";
import Card from "@mui/material/Card/Card";
import CardHeader from "@mui/material/CardHeader/CardHeader";
import Avatar from "@mui/material/Avatar/Avatar";
import IconButton from "@mui/material/IconButton/IconButton";
import CardMedia from "@mui/material/CardMedia/CardMedia";
import CardContent from "@mui/material/CardContent/CardContent";
import Typography from "@mui/material/Typography/Typography";
import CardActions from "@mui/material/CardActions/CardActions";
import AddLocationAltIcon from "@mui/icons-material/AddLocation";
import CardActionArea from "@mui/material/CardActionArea/CardActionArea";
import {
  TypeDisplaySearchOffers,
  TypeOfferEnum,
} from "../../enums/type-offer.enum";
import {
  getBaseImageUrl,
  getFullnameUser,
  getImageForOffer,
  getUserAvatar,
} from "../../utils/utils-functions";
import List from "@mui/material/List/List";
import ListItem from "@mui/material/ListItem/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import CheckIcon from "@mui/icons-material/Check";
import { IOffer } from "../../model/offer.model";
import { ConvertReactTimeAgo } from "../../pages/react-time-ago";
import { AllAppConfig } from "../../../core/config/all-config";
import { useTranslation } from "react-i18next";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./ItemsOffer.scss";
import { StyledBadge } from "../../pages/styled-badge";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function ItemOffer({
  listOffers,
  typeDisplay,
  isOnLine,
  forMe,
  callbackEditOffer,
  callbackDeleteOffer,
}: {
  listOffers: IOffer[];
  typeDisplay: TypeDisplaySearchOffers;
  isOnLine: any;
  forMe?: boolean;
  callbackEditOffer?: any;
  callbackDeleteOffer?: any;
}) {
  const navigate = useNavigate();

  const rediretTo = (offerId?: number) => {
    setTimeout(() => {
      navigate(ALL_APP_ROUTES.DETAILS_OFFER + "/" + offerId);
    }, 300);
  };

  return (
    <Box>
      <Grid container spacing={{ xs: 2, md: 6 }}>
        {listOffers.map((offer: IOffer, index) => (
          <Grid
            item
            xs={typeDisplay === TypeDisplaySearchOffers.Grid ? 6 : 12}
            sm={typeDisplay === TypeDisplaySearchOffers.Grid ? 4 : 12}
            key={`entity-${index}`}
          >
            {typeDisplay === TypeDisplaySearchOffers.Grid ? (
              <CardGrid
                offer={offer}
                rediretToCallback={rediretTo}
                isOnLine={isOnLine}
                forMe={forMe}
                callbackEditOffer={callbackEditOffer}
                callbackDeleteOffer={callbackDeleteOffer}
              />
            ) : (
              <CardList
                offer={offer}
                rediretToCallback={rediretTo}
                isOnLine={isOnLine}
                forMe={forMe}
                callbackEditOffer={callbackEditOffer}
                callbackDeleteOffer={callbackDeleteOffer}
              />
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

function CardList({
  offer,
  rediretToCallback,
  isOnLine,
  forMe,
  callbackEditOffer,
  callbackDeleteOffer,
}: {
  offer: IOffer;
  rediretToCallback: any;
  isOnLine: any;
  forMe?: boolean;
  callbackEditOffer: any;
  callbackDeleteOffer?: any;
}) {
  const { t } = useTranslation();

  const editOffer = (event: any) => {
    event.stopPropagation();
    callbackEditOffer(offer);
  };

  const deleteOffer = (event: any) => {
    event.stopPropagation();
    callbackDeleteOffer(offer);
  };

  return (
    <CardActionArea component="a" onClick={() => rediretToCallback(offer.id)}>
      <Card sx={{ display: { xs: "block", sm: "flex" } }}>
        <CardMedia
          sx={{
            width: { xs: "100%", sm: 250 },
            height: { xs: "100%", sm: 200 },
          }}
        >
          {offer?.offerImages?.length ? (
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
              className="img-lazy-loading"
            />
          ) : (
            <Box sx={{ display: { xs: "none", md: "block" }, height: "100%" }}>
              <img
                src={getBaseImageUrl(AllAppConfig.DEFAULT_LAZY_IMAGE)}
                className="img-lazy-loading"
                alt="image not found"
              />
            </Box>
          )}
        </CardMedia>
        <CardContent sx={{ flex: 1 }}>
          <List
            sx={{ width: "100%", pt: 0, pb: 0, bgcolor: "background.paper" }}
          >
            <ListItem
              sx={{ pl: 0 }}
              secondaryAction={
                <React.Fragment>
                  {forMe ? (
                    <CardActions>
                      <IconButton
                        aria-label="amount"
                        size="small"
                        color="success"
                        onClick={(event) => editOffer(event)}
                      >
                        <EditIcon />
                      </IconButton>

                      <IconButton
                        aria-label="report"
                        size="small"
                        sx={{ ml: "auto !important" }}
                        color="error"
                        onClick={(event) => deleteOffer(event)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  ) : null}
                </React.Fragment>
              }
            >
              <ListItemAvatar>
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                  color={isOnLine(offer.user?.email) ? "success" : "error"}
                >
                  <Avatar
                    alt={offer.user?.imageUrl}
                    src={getUserAvatar(
                      offer.user?.id,
                      offer.user?.imageUrl,
                      offer.user?.sourceConnectedDevice
                    )}
                    sx={{ border: "1px solid #b9b9b9" }}
                  >
                    {getFullnameUser(offer.user)?.charAt(0)}
                  </Avatar>
                </StyledBadge>
              </ListItemAvatar>
              <ListItemText
                primary={getFullnameUser(offer?.user)}
                secondary={
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    display="flex"
                  >
                    <AccessTimeFilledIcon fontSize="small" sx={{ mr: 0.9 }} />
                    <ConvertReactTimeAgo convertDate={offer.dateCreated} />
                  </Typography>
                }
              />
            </ListItem>
          </List>

          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography
                component="h5"
                variant="h5"
                sx={{ fontSize: "1.2rem" }}
              >
                {offer.title}
              </Typography>

              <Typography
                variant="subtitle2"
                color="text.secondary"
                display="flex"
              >
                <CheckIcon fontSize="small" sx={{ mr: 0.9 }} />
                {offer.typeOffer === TypeOfferEnum.Sell
                  ? t<string>("common.for_sell")
                  : offer.typeOffer === TypeOfferEnum.Rent
                  ? t<string>("common.for_rent")
                  : offer.typeOffer === TypeOfferEnum.Find
                  ? t<string>("common.for_find")
                  : null}
              </Typography>
            </Grid>

            {offer.amount ? (
              <Grid item xs={4}>
                <Typography
                  variant="subtitle1"
                  display="flex"
                  sx={{ justifyContent: "end" }}
                  color="secondary"
                >
                  {offer.amount?.toLocaleString("tn-TN")} TND
                </Typography>
              </Grid>
            ) : null}
          </Grid>
        </CardContent>
      </Card>
    </CardActionArea>
  );
}

function CardGrid({
  offer,
  rediretToCallback,
  isOnLine,
  forMe,
  callbackEditOffer,
  callbackDeleteOffer,
}: {
  offer: IOffer;
  rediretToCallback: any;
  isOnLine: any;
  forMe?: boolean;
  callbackEditOffer?: any;
  callbackDeleteOffer?: any;
}) {
  const { t } = useTranslation();

  const editOffer = (event: any) => {
    event.stopPropagation();
    callbackEditOffer(offer);
  };

  const deleteOffer = (event: any) => {
    event.stopPropagation();
    callbackDeleteOffer(offer);
  };

  return (
    <CardActionArea component="a" onClick={() => rediretToCallback(offer.id)}>
      <Card className="card-item-offer">
        <CardHeader
          avatar={
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
              color={isOnLine(offer.user?.email) ? "success" : "error"}
            >
              <Avatar
                alt={offer.user?.imageUrl}
                src={getUserAvatar(
                  offer.user?.id,
                  offer.user?.imageUrl,
                  offer.user?.sourceConnectedDevice
                )}
                sx={{ border: "1px solid #b9b9b9" }}
              >
                {getFullnameUser(offer.user)?.charAt(0)}
              </Avatar>
            </StyledBadge>
          }
          action={""}
          title={
            <Typography className="truncate-text">
              {getFullnameUser(offer?.user)}
            </Typography>
          }
          subheader={
            <Typography
              variant="subtitle2"
              color="text.secondary"
              display="flex"
              sx={{ fontSize: { xs: "0.6rem", md: "0.875rem" } }}
            >
              <AccessTimeFilledIcon
                fontSize="small"
                sx={{ mr: 0.9, fontSize: { xs: "0.9rem", md: "1.25rem;" } }}
              />
              <ConvertReactTimeAgo convertDate={offer.dateCreated} />
            </Typography>
          }
        />
        <CardMedia sx={{ height: { xs: 150, md: 200 } }}>
          {offer.offerImages && offer.offerImages.length ? (
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
              className="img-lazy-loading"
            />
          ) : (
            <img
              src={getBaseImageUrl(AllAppConfig.DEFAULT_LAZY_IMAGE)}
              className="img-lazy-loading"
              alt="image not found"
            />
          )}
        </CardMedia>
        <Box className="card-actions-content">
          <CardContent className="card-content">
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ fontSize: { xs: "1rem", md: "1.5rem" } }}
            >
              <CheckIcon
                fontSize="small"
                sx={{ mr: 0.9, fontSize: { xs: "0.9rem", md: "1.25rem;" } }}
              />
              {offer.typeOffer === TypeOfferEnum.Sell
                ? t<string>("common.for_sell")
                : offer.typeOffer === TypeOfferEnum.Rent
                ? t<string>("common.for_rent")
                : offer.typeOffer === TypeOfferEnum.Find
                ? t<string>("common.for_find")
                : null}
            </Typography>

            <Typography
              component="h5"
              variant="h5"
              sx={{ fontSize: { xs: "1rem", md: "1.2rem" } }}
              className="truncate-text"
            >
              {offer.title}
            </Typography>
          </CardContent>
          <CardActions>
            {offer.amount ? (
              <IconButton
                aria-label="amount"
                size="small"
                sx={{ fontSize: { xs: "0.9rem", md: "1.125rem" } }}
                color="secondary"
              >
                {offer.amount?.toLocaleString("tn-TN")} TND
              </IconButton>
            ) : null}
          </CardActions>
        </Box>
        {forMe ? (
          <CardActions>
            <IconButton
              aria-label="amount"
              size="small"
              color="success"
              onClick={(event) => editOffer(event)}
            >
              <EditIcon />
            </IconButton>

            <IconButton
              aria-label="report"
              size="small"
              sx={{ ml: "auto !important" }}
              color="error"
              onClick={(event) => deleteOffer(event)}
            >
              <DeleteIcon />
            </IconButton>
          </CardActions>
        ) : null}
      </Card>
    </CardActionArea>
  );
}
