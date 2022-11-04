import React from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography/Typography";
import { useFormik } from "formik";
import { currentUserSession } from "../../../user/store/slice";
import Grid from "@mui/material/Grid/Grid";
import FormControl from "@mui/material/FormControl/FormControl";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText/FormHelperText";
import { useTranslation } from "react-i18next";
import Autocomplete from "@mui/material/Autocomplete/Autocomplete";
import TextField from "@mui/material/TextField/TextField";
import { IAddress } from "../../../../shared/model/address.model";
import { useSelector } from "react-redux";
import { allAddressSelector } from "../../../address/store/slice";
import Button from "@mui/material/Button";
import {
  initialValuesFormCart,
  validationSchemaFormCart,
} from "../../validation/cart-form-validation";

const initialValues = initialValuesFormCart;

export function FormCart({ submitHandler }: { submitHandler: any }) {
  const { t } = useTranslation();
  const currentUser = useSelector(currentUserSession);

  const entitiesAddress: IAddress[] =
    useSelector(allAddressSelector).entities ?? [];

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchemaFormCart,
    onSubmit: (values) => {
      submitHandler(values);
    },
  });

  React.useEffect(() => {
    if (currentUser) {
      formik.setFieldValue("firstName", currentUser.firstName);
      formik.setFieldValue("lastName", currentUser.lastName);
      formik.setFieldValue("email", currentUser.email);
      formik.setFieldValue('address', currentUser.address);
      formik.setFieldValue("phone", currentUser.phone);
    }
  }, [currentUser]);

  return (
    <Box sx={{ pt: 3 }}>
      <Typography variant="h4" color="text.secondary">
        Détails de facturation
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <FormControl
              fullWidth
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              size="small"
            >
              <InputLabel htmlFor="outlined-adornment-title">
                {t<string>("account.label_firstname")} *
              </InputLabel>
              <OutlinedInput
                id="firstName"
                name="firstName"
                label={t<string>("account.label_firstname")}
                value={formik.values.firstName}
                onChange={formik.handleChange}
              />
              <FormHelperText id="component-helper-text">
                {formik.touched.firstName && formik.errors.firstName}
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl
              fullWidth
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              size="small"
            >
              <InputLabel htmlFor="outlined-adornment-title">
                {t<string>("account.label_lastname")} *
              </InputLabel>
              <OutlinedInput
                id="lastName"
                name="lastName"
                label={t<string>("account.label_lastname")}
                value={formik.values.lastName}
                onChange={formik.handleChange}
                // disabled={!showEditInfos}
              />
              <FormHelperText id="component-helper-text">
                {formik.touched.lastName && formik.errors.lastName}
              </FormHelperText>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <FormControl
              fullWidth
              error={formik.touched.email && Boolean(formik.errors.email)}
              size="small"
            >
              <InputLabel htmlFor="outlined-adornment-title">
                {t<string>("account.label_email")}
              </InputLabel>
              <OutlinedInput
                id="email"
                name="email"
                label={t<string>("account.label_email")}
                value={formik.values.email}
                onChange={formik.handleChange}
                disabled
              />
              <FormHelperText id="component-helper-text">
                {formik.touched.email && formik.errors.email}
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl
              fullWidth
              error={formik.touched.address && Boolean(formik.errors.address)}
            >
              <Autocomplete
                id="address"
                fullWidth
                size="small"
                options={entitiesAddress}
                value={formik.values.address}
                onChange={(e, value) =>
                  formik.setFieldValue("address", value || "")
                }
                autoHighlight
                getOptionLabel={(option) => option?.city || ""}
                // disabled={!showEditInfos}
                renderOption={(propsRender, option) => (
                  <Box component="li" {...propsRender}>
                    {option?.city}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Address"
                    inputProps={{
                      ...params.inputProps,
                      form: {
                        autocomplete: "off",
                      },
                      autoComplete: "off", // disable autocomplete and autofill
                    }}
                  />
                )}
              />
              <FormHelperText id="component-helper-text">
                {formik.touched.address && formik.errors.address}
              </FormHelperText>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <FormControl
              fullWidth
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              size="small"
            >
              <InputLabel htmlFor="outlined-adornment-title">
                {t<string>("account.label_phone")} *
              </InputLabel>
              <OutlinedInput
                id="phone"
                name="phone"
                label={t<string>("account.label_phone")}
                type="tel"
                value={formik.values.phone}
                onChange={formik.handleChange}
                // disabled={!showEditInfos}
              />
              <FormHelperText id="component-helper-text">
                {formik.touched.phone && formik.errors.phone}
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}></Grid>
        </Grid>

        <Button
          sx={{ mt: 1 }}
          variant="contained"
          color="secondary"
          fullWidth
          type="submit"
        >
          {t<string>("cart.label_confirm_order")}
        </Button>
      </form>
    </Box>
  );
}
