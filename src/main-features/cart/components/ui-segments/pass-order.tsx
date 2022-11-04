import React from "react";
import { Box } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl/FormControl";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment/InputAdornment";
import IconButton from "@mui/material/IconButton/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import {
  initialValuesSignUp,
  validationSchemaSignUp,
} from "../../../user/components/sign-up/validation/validation-signup";
import { registerUser } from "../../../user/store/slice";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import Typography from "@mui/material/Typography/Typography";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import {initialValuesFormPassCart, validationSchemaFormPassCart} from "../../validation/cart-form-validation";

const initialValues = initialValuesFormPassCart;

export function PassOrder({callbackAddOrder}: {callbackAddOrder: any}) {
  const { t } = useTranslation();

  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState("Choose wisely");

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchemaFormPassCart,
    onSubmit: (values: any) => {
      console.log('values ', values);
      callbackAddOrder(values);
    },
  });

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
    setHelperText(" ");
    setError(false);
    formik.setFieldValue('paymentMode', 'cash');
  };

  return (
    <Box sx={{ pt: 3 }}>
      <Typography variant="h4" color="text.secondary" sx={{ mb: 3 }}>
        Passer la commande
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="subtitle2" color="text.secondary">
          Si vous possédez un code promo, veuillez l’appliquer ci-dessous.
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FormControl
              fullWidth
              error={formik.touched.code && Boolean(formik.errors.code)}
            >
              <InputLabel htmlFor="outlined-adornment-title">
                {t<string>("cart.label_code")}
              </InputLabel>
              <OutlinedInput
                id="code"
                name="code"
                color="secondary"
                size="small"
                label={t<string>("cart.label_code")}
                value={formik.values.code}
                onChange={formik.handleChange}
              />
              <FormHelperText id="component-helper-text">
                {formik.touched.code && formik.errors.code}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} sx={{ pt: 0 }}>
            <LoadingButton
              // loading={loadingRegisterSelector}
              fullWidth
              variant="contained"
              color="secondary"
              type="button"
              data-testid="submit"
              sx={{ mt: 0.5 }}
            >
              Appliquer le code promo
            </LoadingButton>
          </Grid>
        </Grid>

        <FormControl sx={{ m: 3 }}
                     error={formik.touched.paymentMode && Boolean(formik.errors.paymentMode)}
                     variant="standard">
          <FormLabel id="demo-error-radios">MODE DE PAIEMENT</FormLabel>
          <RadioGroup
            aria-labelledby="demo-error-radios"
            name="quiz"
            value={value}
            onChange={handleRadioChange}
          >
            <FormControlLabel
              value="best"
              control={<Radio disabled={true} color="secondary"/>}
              label="Paiement par carte Bancaire"
            />
            <FormControlLabel
              value="cash"
              control={<Radio color="secondary"/>}
              label="Espèces à la livraison"
            />
          </RadioGroup>
          <FormHelperText color="error">
            {
              formik.touched.paymentMode && formik.errors.paymentMode ? t<string>("cart.select_your_mode_payment") : ''
            }
          </FormHelperText>
        </FormControl>

        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked color="secondary" />}
            label="J’ai lu et j’accepte les conditions générales *"
          />
        </FormGroup>

        <Button variant="contained" color="secondary" fullWidth type="submit">
          {t<string>("cart.label_pass_order")}
        </Button>
      </form>
    </Box>
  );
}
