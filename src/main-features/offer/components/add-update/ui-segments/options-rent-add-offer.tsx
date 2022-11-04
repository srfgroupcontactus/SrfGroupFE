import Grid from "@mui/material/Grid";
import * as React from "react";
import TextField from "@mui/material/TextField/TextField";
import LocalizationProvider from "@mui/lab/LocalizationProvider/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker/DatePicker";
import FormControl from "@mui/material/FormControl/FormControl";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText/FormHelperText";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import Select from "@mui/material/Select/Select";
import { useTranslation } from "react-i18next";
import { PeriodeRent } from "../../../../../shared/enums/type-offer.enum";

export default function OptionsRentAddOffer(props: any) {
  const { t } = useTranslation();

  const { formik } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container spacing={2} sx={{ my: 2 }}>
        <Grid item xs={12} md={6}>
          <FormControl
            fullWidth
            error={formik.touched.amount && Boolean(formik.errors.amount)}
            size="small"
          >
            <InputLabel htmlFor="outlined-adornment-amount" color="secondary">{t<string>("common.label_amount")}</InputLabel>
            <OutlinedInput
              id="amount"
              type="number"
              color="secondary"
              value={formik.values.amount}
              onChange={formik.handleChange}
              label={t<string>("common.label_amount")}
            />
            <FormHelperText id="component-helper-text">
              {formik.touched.amount && formik.errors.amount}
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl
            fullWidth
            error={
              formik.touched.typePeriodRent &&
              Boolean(formik.errors.typePeriodRent)
            }
            className="form-control-type-offer"
            size="small"
          >
            <InputLabel
              id="demo-simple-select-label"
              className="type-offer-select"
              color="secondary"
            >
              {t<string>("add_offer.per_periode")}
            </InputLabel>
            <Select
              id="typePeriodRent"
              name="typePeriodRent"
              color="secondary"
              label={t<string>("add_offer.per_periode")}
              labelId="demo-simple-select-label"
              value={formik.values.typePeriodRent}
              onChange={formik.handleChange}
            >
              <MenuItem value={PeriodeRent.PerMonth}>
                {t<string>("add_offer.per_month")}
              </MenuItem>
              <MenuItem value={PeriodeRent.PerDay}>
                {t<string>("add_offer.per_day")}
              </MenuItem>
              <MenuItem value={PeriodeRent.PerYear}>
                {t<string>("add_offer.per_year")}
              </MenuItem>
            </Select>
            <FormHelperText id="component-helper-text">
              {formik.touched.typePeriodRent && formik.errors.typePeriodRent}
            </FormHelperText>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <DatePicker
            label={t<string>("common.label_start_date")}
            value={formik.values.startDate}
            onChange={(newValue) => formik.setFieldValue("startDate", newValue)}
            renderInput={(params) => (
              <TextField {...params} size="small" fullWidth error={false} color="secondary"/>
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <DatePicker
            label={t<string>("common.label_end_date")}
            value={formik.values.endDate}
            onChange={(newValue) => formik.setFieldValue("endDate", newValue)}
            renderInput={(params) => (
              <TextField {...params} size="small" fullWidth error={false} color="secondary" />
            )}
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}
