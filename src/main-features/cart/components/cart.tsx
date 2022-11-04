import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid/Grid";
import Breadcrumbs from "@mui/material/Breadcrumbs/Breadcrumbs";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography/Typography";
import Container from "@mui/material/Container/Container";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import { ALL_APP_ROUTES } from "../../../core/config/all-app-routes";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { OrderCart } from "./ui-segments/order-cart";
import { FormCart } from "./ui-segments/form-cart";
import { PassOrder } from "./ui-segments/pass-order";
import { useDispatch, useSelector } from "react-redux";
import {
  activePageCart,
  addOrder,
  addSuccessOrder, deleteCart, deleteSuccessCart,
  detailsCart,
  entitiesCart,
  fetchCart,
  loadingEntitiesCart,
  loadingOrder, resetCart,
  resetOrder, setActivePage, totalPagesCart
} from "../store/slice";
import Alert from "@mui/material/Alert/Alert";
import DetailsCart from "./ui-segments/details-order";
import Dialog from "@mui/material/Dialog/Dialog";
import {TransitionModal} from "../../../shared/pages/transition-modal";
import DialogTitle from "@mui/material/DialogTitle/DialogTitle";
import DialogContent from "@mui/material/DialogContent/DialogContent";
import DialogContentText from "@mui/material/DialogContentText/DialogContentText";
import DialogActions from "@mui/material/DialogActions/DialogActions";
import {getNumberOfCarts} from "../../user/store/slice";
import {AllAppConfig} from "../../../core/config/all-config";

const steps = [
  "Valider la commande",
  "Confirmer la commande",
  "Passer la commande",
];
export default function Cart() {

  const [isFirstTime, setIsFirstTime] = React.useState(true);

  const [activeStep, setActiveStep] = React.useState(0);
  const [openModalSuccessSaveOrder, setOpenModalSuccessSaveOrder] = React.useState(false);

  const loadingEntitiesCartSelector = useSelector(loadingEntitiesCart) ?? false;
  const entitiesCartSelector = useSelector(entitiesCart) ?? [];
  const totalPagesCartSelector = useSelector(totalPagesCart) ?? 0;
  const deleteSuccessCartSelector = useSelector(deleteSuccessCart) ?? false;
  const activePageCartSelector = useSelector(activePageCart) ?? -1;

  const loadingOrderSelector = useSelector(loadingOrder) ?? false;
  const addSuccessOrderSelector = useSelector(addSuccessOrder) ?? false;

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const resetAll = () => {
    dispatch(resetCart({}));
    dispatch(setActivePage(0));
  };

  React.useEffect(() => {
    if( isFirstTime && entitiesCartSelector.length === 0 ) {
      setIsFirstTime(false);
      resetAll();
      dispatch(detailsCart({}));
    }
  }, [isFirstTime]);

  React.useEffect(() => {
    if (activePageCartSelector >= 0 && !isFirstTime) {
      dispatch(
          fetchCart({
            page: activePageCartSelector,
            size: AllAppConfig.ORDERS_PER_PAGE,
            queryParams: '',
          })
      );
    }
  }, [activePageCartSelector, isFirstTime]);

  React.useEffect(() => {
    if (deleteSuccessCartSelector) {
      dispatch(setActivePage(0));
      resetAll();
      dispatch(
          fetchCart({
            page: 0,
            size: AllAppConfig.ORDERS_PER_PAGE,
            queryParams: '',
          })
      );

      dispatch(getNumberOfCarts({}));
    }
  }, [deleteSuccessCartSelector]);

  const loadMoreCart = () => {
    setIsFirstTime(false);
    dispatch(setActivePage(activePageCartSelector + 1));
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const actionDetailsCart = (values: any) => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const addNewOrder = (values: any) => {
    dispatch(addOrder({...values}))
  }

  React.useEffect(() => {
    if( addSuccessOrderSelector ){
      dispatch(getNumberOfCarts({}));
      setOpenModalSuccessSaveOrder(true);
    }
  }, [addSuccessOrderSelector])

  const handleModalSuccessSaveOrder = () => {
    dispatch(resetOrder({}));
    setOpenModalSuccessSaveOrder(false);
    navigate(ALL_APP_ROUTES.ORDER.LIST);
  }

  const deleteCartAction = (cartId: number) => {
    dispatch(deleteCart({ id: cartId }));
  }

  const renderDialogSuccessSaveOrder = () => {
    return (
        <Dialog
            open={openModalSuccessSaveOrder}
            TransitionComponent={TransitionModal}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>
            {t<string>("order.title_dialog_add_order")}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {t<string>("order.description_dialog_add_order")}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="success" onClick={handleModalSuccessSaveOrder}>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
    );
  };

  return (
    <Container maxWidth="xl">
      <Grid
        container
        style={{
          paddingTop: 10,
        }}
      >
        <Grid item xs={12} md={6}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" to={ALL_APP_ROUTES.HOME}>
              SRF
            </Link>
            <Typography color="text.primary">
              {t<string>("header.label_cart")}
            </Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      {entitiesCartSelector.length === 0 && !loadingEntitiesCartSelector ? (
        <Grid container spacing={4} sx={{ mt: 3 }}>
          <Grid item xs={12} md={1}></Grid>
          <Grid item xs={12} md={6}>
            <Alert severity="error">{t<string>("cart.list_not_found")}</Alert>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={4} sx={{ mt: 3 }}>
          <Grid item xs={12} md={1}></Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                  const stepProps: { completed?: boolean } = {};
                  const labelProps: {
                    optional?: React.ReactNode;
                  } = {};
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              {activeStep === 0 ? (
                <OrderCart
                  nextStepHandler={handleNext}
                  entitiesCart={entitiesCartSelector}
                  loadingEntitiesCart={loadingEntitiesCartSelector}
                  totalPagesCart={totalPagesCartSelector}
                  loadMoreCartCallback={loadMoreCart}
                  activePageCart={activePageCartSelector}
                  deleteDetailsCartCallback={deleteCartAction}
                />
              ) : activeStep === 1 ? (
                <FormCart submitHandler={actionDetailsCart} />
              ) : (
                <PassOrder callbackAddOrder={addNewOrder}/>
              )}
              <React.Fragment>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    variant="contained"
                    color="neutral"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    {t<string>("cart.label_back_order")}
                  </Button>
                </Box>
              </React.Fragment>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h4" color="text.secondary">
              Votre commande
            </Typography>
            <DetailsCart
              activeStep={activeStep}
              submitHandler={actionDetailsCart}
            />
          </Grid>
        </Grid>
      )}
      {renderDialogSuccessSaveOrder()}
    </Container>
  );
}
