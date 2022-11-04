import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Divider from "@mui/material/Divider/Divider";
import Grid from "@mui/material/Grid/Grid";
import Typography from "@mui/material/Typography/Typography";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { useTranslation } from "react-i18next";
import { InputQuantity } from "../../../../../shared/components/input-quantity/InputQuantity";
import { getBaseImageUrl } from "../../../../../shared/utils/utils-functions";

export default function CartSellDetailsOffer({
  parentCallbackAddCart,
  loadingAddCart,
}: {
  parentCallbackAddCart: (quantity: any) => void;
  loadingAddCart: boolean;
}) {

  const [valueQuantity, setValueQuantity] = React.useState<number>(1);

  const { t } = useTranslation();

  const changeQuantity = (data: any) => {
    console.log("data ", data);
    setValueQuantity(data);
  };

  const addNewCart = () => {
    console.log("valueQuantity ", valueQuantity);
    parentCallbackAddCart({
      quantity: valueQuantity,
    });
  };

  return (
    <Box sx={{ width: "100%", typography: "body1", my: 3 }}>

      <Grid container>
        <Grid item xs={12} md={6}>
          <Typography
              variant="subtitle2"
              color="text.secondary"
              display="flex"
          >
            <InfoOutlinedIcon fontSize="small" sx={{ mr: 0.9 }} />
            En Stock
          </Typography>
          <Box sx={{ my: 2 }}>
            <InputQuantity parentCallChangeQuantity={changeQuantity} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <List sx={{}}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                    alt="Remy Sharp"
                    src={getBaseImageUrl(
                        "/assets/images/offer/details-offer/creditcard.svg"
                    )}
                />
              </ListItemAvatar>
              <ListItemText
                  primary="Paiement facile"
                  secondary="Payer vos articles commandés au comptant lors de la livraison"
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                    alt="Travis Howard"
                    src={getBaseImageUrl(
                        "/assets/images/offer/details-offer/local-shipping.svg"
                    )}
                />
              </ListItemAvatar>
              <ListItemText
                  primary="Politique de livraison"
                  secondary="Remise de 5% à partir de 50dt d'achats sur les produits mazroub exclusive"
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                    alt="Cindy Baker"
                    src={getBaseImageUrl(
                        "/assets/images/offer/details-offer/loop.svg"
                    )}
                />
              </ListItemAvatar>
              <ListItemText
                  primary="Politique de retours"
                  secondary="Remboursement entre 3 et 12 jours à partir la date de réception de votre retour"
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
      <Box sx={{ my: 2 }} display="flex" justifyContent="center">
        <LoadingButton
            loading={loadingAddCart}
            fullWidth
            variant="contained"
            color="secondary"
            onClick={addNewCart}
        >
          {t<string>("cart.label_add_cart")}
        </LoadingButton>
      </Box>

    </Box>
  );
}
