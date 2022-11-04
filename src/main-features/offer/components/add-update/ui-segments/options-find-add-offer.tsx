import * as React from "react";
import Grid from "@mui/material/Grid/Grid";
import FormControl from "@mui/material/FormControl/FormControl";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import Select from "@mui/material/Select/Select";
import FormHelperText from "@mui/material/FormHelperText/FormHelperText";
import { useTranslation } from "react-i18next";

const listTypeFind = [
  {
    name: "carpooling",
    value: "carpooling",
  },
  {
    name: "carrier",
    value: "carrier",
  },
  {
    name: "travels",
    value: "travels",
  },
  {
    name: "fastfood",
    value: "FastFood",
  },
];

export default function OptionsFindAddOffer(props: any) {
  const { formik } = props;
  const { t } = useTranslation();

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={6}>
        <FormControl
          fullWidth
          size="small"
          error={
            formik.touched.typeFindOffer && Boolean(formik.errors.typeFindOffer)
          }
          className="form-control-type-find-offer"
        >
          <InputLabel
            id="form-control-type-find-offer"
            className="type-find-offer-select"
          >
            Type Find Offre
          </InputLabel>
          <Select
            id="typeFindOffer"
            name="typeFindOffer"
            label="Type Find Offer"
            labelId="demo-simple-select-label"
            value={formik.values.typeFindOffer}
            onChange={formik.handleChange}
          >
            {listTypeFind.map((item, index) => (
              <MenuItem value={item.value} key={`index-${index}`}>
                {t<string>("add_offer." + item.name)}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText id="form-control-type-find-offer">
            {formik.touched.typeFindOffer && formik.errors.typeFindOffer}
          </FormHelperText>
        </FormControl>
      </Grid>
    </Grid>
  );
}

{
  /*<div>*/
}
{
  /*<p>CoVoiiturage</p>*/
}
{
  /*<p>Travels</p>*/
}
{
  /*<p>Transporteur: from --- to</p>*/
}
{
  /*</div>*/
}
