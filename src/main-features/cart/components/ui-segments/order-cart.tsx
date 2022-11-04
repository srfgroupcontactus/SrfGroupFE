import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid/Grid";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography/Typography";
import Alert from "@mui/material/Alert/Alert";
import { useTranslation } from "react-i18next";
import Card from "@mui/material/Card/Card";
import CardMedia from "@mui/material/CardMedia/CardMedia";
import CardContent from "@mui/material/CardContent/CardContent";
import DeleteIcon from "@mui/icons-material/Delete";
import AddLocationAltIcon from "@mui/icons-material/AddLocation";
import CheckIcon from "@mui/icons-material/Check";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog/Dialog";
import DialogTitle from "@mui/material/DialogTitle/DialogTitle";
import DialogContent from "@mui/material/DialogContent/DialogContent";
import DialogContentText from "@mui/material/DialogContentText/DialogContentText";
import DialogActions from "@mui/material/DialogActions/DialogActions";
import { List } from "@mui/material";
import ListSubheader from "@mui/material/ListSubheader";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton/Skeleton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  getBaseImageUrl, getFullnameUser,
  getImageForOffer, getUserAvatar,
} from "../../../../shared/utils/utils-functions";
import { AllAppConfig } from "../../../../core/config/all-config";
import { ICart } from "../../../../shared/model/cart.model";
import { ALL_APP_ROUTES } from "../../../../core/config/all-app-routes";
import { TransitionModal } from "../../../../shared/pages/transition-modal";
import { InputQuantity } from "../../../../shared/components/input-quantity/InputQuantity";
import {
  updateByQuantityCart
} from "../../store/slice";
import Avatar from "@mui/material/Avatar/Avatar";
import CardHeader from "@mui/material/CardHeader/CardHeader";
import InfiniteScroll from "react-infinite-scroller";

function LoadingCarts() {
  return (
    <Box>
      {[0, 1, 2].map((key) => (
        <Card sx={{ display: { xs: "block", sm: "flex" }, my: 2 }} key={key}>
          <CardMedia
            sx={{
              width: { xs: "100%", sm: 250 },
              height: { xs: "100%", sm: 200 },
            }}
          >
            <Box sx={{ display: { xs: "none", md: "block" }, height: "100%" }}>
              <img
                src={getBaseImageUrl(AllAppConfig.DEFAULT_LAZY_IMAGE)}
                className="img-lazy-loading"
                alt="image not found"
              />
            </Box>
          </CardMedia>
          <CardContent sx={{ flex: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Skeleton animation="wave" height={24} />

                <Skeleton animation="wave" height={24} />

                <Skeleton
                  variant="rectangular"
                  width={"100%"}
                  height={100}
                  sx={{ my: 3 }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

function ItemCart({
  cart,
  t,
  parentCallbackDeleteCart,
  parentCallbackUpdateQuantity,
}: {
  cart: ICart;
  t: any;
  parentCallbackDeleteCart: (cartDeleteId: number | undefined) => void;
  parentCallbackUpdateQuantity: (cartUpdate: any) => void;
}) {
  const [openDeleteCartModal, setOpenDeleteCartModal] = React.useState(false);
  const [cartDeleteId, setCartDeleteId] = React.useState<number | undefined>(
    -1
  );
  const navigate = useNavigate();

  const rediretTo = () => {
    setTimeout(() => {
      navigate(ALL_APP_ROUTES.DETAILS_OFFER + "/" + cart?.sellOffer?.id);
    }, 300);
  };

  const changeQuantity = (data: any) => {
    const cartUpdate: ICart = {
      ...cart,
      quantity: data,
    };
    parentCallbackUpdateQuantity(cartUpdate);
  };

  const handleClickCancelDeleteCartModal = () => {
    setOpenDeleteCartModal(false);
  };

  const handleClickDeleteDeleteCartModal = () => {
    setOpenDeleteCartModal(false);
    parentCallbackDeleteCart(cartDeleteId);
  };

  const handleClickOpenDeleteCartModal = (event: any) => {
    event.stopPropagation();
    setCartDeleteId(cart?.id);
    setOpenDeleteCartModal(true);
  };

  const redirectToPorfile = (event: any, userId: number) => {
    event.stopPropagation();
    setTimeout(() => {
      navigate(ALL_APP_ROUTES.PROFILE + "/" + userId);
    }, 300);
  };

  const renderDialogDeleteCart = () => {
    return (
      <Dialog
        open={openDeleteCartModal}
        TransitionComponent={TransitionModal}
        keepMounted
        onClose={handleClickCancelDeleteCartModal}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{t("cart.title_dialog_delete_cart")}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {t("cart.description_dialog_delete_cart")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickCancelDeleteCartModal} color="neutral">
            {t("common.label_cancel")}
          </Button>
          <Button onClick={handleClickDeleteDeleteCartModal} color="error">
            {t("common.label_delete")}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Box>
      <Card
        sx={{ display: { xs: "block", sm: "flex" } }}
        onClick={() => rediretTo()}
      >
        <CardMedia
          sx={{
            width: { xs: "100%", sm: 250 },
            height: { xs: "100%", sm: 200 },
          }}
        >
          { cart?.sellOffer?.offerImages?.length ? (
            <LazyLoadImage
              alt="Image offer"
              src={getImageForOffer(
                cart?.sellOffer?.id,
                cart?.sellOffer?.offerImages[0].path
              )}
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
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <CardHeader
                  sx={{pl: 0, pt: 0}}
                  avatar={
                    <Avatar
                        role="img"
                        aria-label="Image avatar"
                        src={getUserAvatar(
                            cart?.sellOffer?.user?.id,
                            cart?.sellOffer?.user?.imageUrl,
                            cart?.sellOffer?.user?.sourceConnectedDevice
                        )}
                        alt="image not found"
                        onClick={(event: any) => redirectToPorfile(event, cart?.sellOffer?.user?.id)}
                    >
                      {getFullnameUser(cart?.sellOffer?.user)?.charAt(0)}
                    </Avatar>
                  }
                  title={getFullnameUser(cart?.sellOffer?.user)}
                  subheader={cart?.sellOffer?.title}
              />

            </Grid>

            {cart?.sellOffer?.amount ? (
              <Grid item xs={4}>
                <Typography
                  variant="subtitle1"
                  color="secondary"
                  display="flex"
                  sx={{ justifyContent: "end" }}
                >
                  {cart?.total?.toLocaleString("tn-TN")} TND
                </Typography>
              </Grid>
            ) : null}
          </Grid>

          <Box sx={{ my: 1 }}>
            <Box sx={{ float: "left" }}>
              <InputQuantity
                parentCallChangeQuantity={changeQuantity}
                defaultValue={cart?.quantity}
              />
            </Box>

            <Button
              color="error"
              variant="outlined"
              startIcon={<DeleteIcon />}
              sx={{ ml: "auto", float: "right" }}
              size="small"
              onClick={(event) => handleClickOpenDeleteCartModal(event)}
            >
              {t("common.label_delete")}
            </Button>
            <Box style={{ clear: "both" }}></Box>
          </Box>
        </CardContent>
      </Card>
      {renderDialogDeleteCart()}
    </Box>
  );
}

export function OrderCart({
  entitiesCart,
  loadingEntitiesCart,
  nextStepHandler,
  totalPagesCart,
  loadMoreCartCallback,
  activePageCart,
  deleteDetailsCartCallback
}: {
  entitiesCart: any;
  loadingEntitiesCart: boolean;
  nextStepHandler: any;
  totalPagesCart: number;
  loadMoreCartCallback: any;
  activePageCart: number;
  deleteDetailsCartCallback: any;
}) {

  const { t } = useTranslation();
  const dispatch = useDispatch();


  const deleteDetailsCart = (cartId: number | undefined) => {
    deleteDetailsCartCallback(cartId);
  };

  const updateByQuantity = (value: ICart) => {
    dispatch(updateByQuantityCart({ ...value }));
  };

  const submitHandler = () => {
    nextStepHandler();
  };

  return (
    <Box sx={{ pt: 3 }}>
      <Typography variant="h4" color="text.secondary">
        Liste des produits
      </Typography>
      <Box>

        <InfiniteScroll
            pageStart={activePageCart}
            loadMore={loadMoreCartCallback}
            hasMore={totalPagesCart - 1 > activePageCart}
            loader={<div className="loader" key={0}></div>}
            threshold={0}
            initialLoad={false}
        >
          {entitiesCart.map((item: ICart, index: number) => (
              <Box key={`index-${index}`} sx={{ my: 2 }}>
                <ItemCart
                    cart={item}
                    t={t}
                    parentCallbackDeleteCart={deleteDetailsCart}
                    parentCallbackUpdateQuantity={updateByQuantity}
                />
              </Box>
          ))}

          {
            loadingEntitiesCart ? <LoadingCarts /> : null
          }
        </InfiniteScroll>

        {
          !loadingEntitiesCart && entitiesCart?.length==0 ?
              <Grid item xs={12} md={6}>
                <Alert severity="warning">{t<string>("order.no_commandes_founds")}</Alert>
              </Grid> : null
        }

        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={submitHandler}
        >
          {t<string>("cart.label_validate_order")}
        </Button>
      </Box>
    </Box>
  );
}
