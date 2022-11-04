import * as React from "react";
import FormControl from "@mui/material/FormControl/FormControl";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText/FormHelperText";
import Box from "@mui/material/Box/Box";
import Grid from "@mui/material/Grid/Grid";
import FormLabel from "@mui/material/FormLabel/FormLabel";
import RadioGroup from "@mui/material/RadioGroup/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import Radio from "@mui/material/Radio/Radio";
import { useTranslation } from "react-i18next";
import { OfferTypeContact } from "../../../../../shared/enums/offer-type-contact.enum";

export default function OptionsSellAddOffer(props: any) {
  const { formik } = props;
  const { t } = useTranslation();

  return (
    <Box>
      <Grid container spacing={2} sx={{ my: 2 }}>
        <Grid item xs={12} md={6}>

          <FormControl
              fullWidth
              size="small"
              error={
                formik.touched.amount && Boolean(formik.errors.amount)
              }
          >
            <InputLabel htmlFor="outlined-adornment-amount" color="secondary">
              {t<string>("common.label_amount")}
            </InputLabel>
            <OutlinedInput
                id="amount"
                name="amount"
                color="secondary"
                type="number"
                label={t<string>("common.label_amount")}
                value={formik.values.amount}
                onChange={formik.handleChange}
                autoComplete="off"
                inputProps={{ min: 1, max: 999999999999 }}
            />
            {formik.touched.amount && formik.errors.amount ? (
                <FormHelperText id="component-helper-text">
                  {t<string>(formik.errors.amount)}
                </FormHelperText>
            ) : null}
          </FormControl>

        </Grid>
        <Grid item xs={12} md={6}></Grid>
      </Grid>

      <Grid container spacing={2} sx={{ my: 2 }}>
        <Grid item xs={12}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label" color="secondary">
              {t<string>("add_offer.label_type_contact_client")}
            </FormLabel>
            <RadioGroup
              aria-labelledby="typeContactClient-label"
              id="typeContactClient"
              name="typeContactClient"
              value={formik.values.typeContactClient}
              onChange={formik.handleChange}
            >
              <FormControlLabel
                value={OfferTypeContact.direct}
                control={<Radio color="secondary"/>}
                label={t("add_offer.direct_type_contact_client").toString()}
              />
              <FormControlLabel
                value={OfferTypeContact.perCommmande}
                control={<Radio color="secondary"/>}
                label={t(
                  "add_offer.per_commande_type_contact_client"
                ).toString()}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
