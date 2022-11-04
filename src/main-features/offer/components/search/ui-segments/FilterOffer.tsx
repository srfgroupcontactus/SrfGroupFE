import List from "@mui/material/List/List";
import ListSubheader from "@mui/material/ListSubheader/ListSubheader";
import ListItem from "@mui/material/ListItem/ListItem";
import FormControl from "@mui/material/FormControl/FormControl";
import Autocomplete from "@mui/material/Autocomplete/Autocomplete";
import Box from "@mui/material/Box/Box";
import TextField from "@mui/material/TextField/TextField";
import { useTranslation } from "react-i18next";
import Typography from "@mui/material/Typography/Typography";
import Grid from "@mui/material/Grid/Grid";
import Slider from "@mui/material/Slider/Slider";
import * as React from "react";
import { useFormik } from "formik";
import {
  initialValuesFilterSearch,
  validationSchemFilterSearch,
} from "../validation/initial-values-filter-search";
import { IAddress } from "../../../../../shared/model/address.model";
import isEmpty from "lodash/isEmpty";
import FormLabel from "@mui/material/FormLabel/FormLabel";
import RadioGroup from "@mui/material/RadioGroup/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import {OfferTypeContact} from "../../../../../shared/enums/offer-type-contact.enum";
import Radio from "@mui/material/Radio/Radio";

function valuetext(value: number) {
  return `${value}°C`;
}

const initialValues = initialValuesFilterSearch;

export function FilterOffer({
  listAddress,
  handelChange,
}: {
  listAddress: IAddress[];
  handelChange: (formik: any) => void;
}) {
  const [value, setValue] = React.useState<number[]>([20, 50]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const { t } = useTranslation();

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchemFilterSearch,
    onSubmit: (values: any) => {
      console.log("values ", values);
    },
  });

  React.useEffect(() => {
    if (!isEmpty(formik.values.address) || formik.values.address === null) {
      handelChange(formik.values);
    }
  }, [formik.values.address]);

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <List
          sx={{ width: "100%", mb: 4 }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" className="bg-yellow">
              FILTRER PAR
            </ListSubheader>
          }
        >
          <ListItem sx={{ my: 2 }}>
            <FormControl fullWidth variant="standard">
              <Autocomplete
                id="addressOffer"
                options={listAddress}
                autoHighlight
                value={formik.values.address}
                onChange={(e, value) =>
                  formik.setFieldValue("address", value || null)
                }
                getOptionLabel={(option) => option.city || ""}
                renderOption={(propsRender, option) => (
                  <Box component="li" {...propsRender}>
                    {option.city}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t<string>("common.label_address")}
                    variant="standard"
                    color="secondary"
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
            </FormControl>
          </ListItem>
          <ListItem>
            <Box sx={{ width: "100%", my: 2 }}>
              <Typography id="input-slider" gutterBottom>
                {t<string>("common.label_amount")}
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item>min</Grid>
                <Grid item xs>
                  <Slider
                    getAriaLabel={() => "Temperature range"}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    color="secondary"
                  />
                </Grid>
                <Grid item>max</Grid>
              </Grid>
            </Box>
          </ListItem>

          <ListItem>
            <FormControl variant="standard" fullWidth >
              <TextField
                  id="title"
                  name="title"
                  color="secondary"
                  type="search"
                  label={t<string>("common.label_user_name")}
                  variant="standard"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  autoComplete="off"
              />
            </FormControl>
          </ListItem>

          <ListItem sx={{mt: 3}}>
            <FormControl variant="standard" fullWidth >
              <FormLabel id="demo-radio-buttons-group-label">
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
          </ListItem>

        </List>
      </form>
    </Box>
  );
}
