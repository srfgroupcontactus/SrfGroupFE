import React from "react";
import FormControl from "@mui/material/FormControl/FormControl";
import FormHelperText from "@mui/material/FormHelperText/FormHelperText";
import Box from "@mui/material/Box/Box";
import Autocomplete from "@mui/material/Autocomplete/Autocomplete";
import TextField from "@mui/material/TextField/TextField";
import Grid from "@mui/material/Grid/Grid";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { ICategory } from "../../../../../shared/model/category.model";

export default function OptionsCommonAddOffer(props: any) {
  const { formik, cities, listCategories } = props;
  const [defaultLanguage, setDefaultLanguage] = React.useState("fr");
  const { t } = useTranslation();

  React.useEffect(() => {
    i18n.on("languageChanged", (lang: any) => {
      console.log("lang ", lang);
      setDefaultLanguage(lang);
    });
  }, []);

  const getValueTitle = (option: ICategory) => {
    if (defaultLanguage === "en") {
      return option.titleEn || "";
    } else if (defaultLanguage === "fr") {
      return option.titleFr || "";
    }
    return option.titleAr || "";
  };

  return (
    <Box>
      <Grid container spacing={2} sx={{ my: 2 }}>
        <Grid item xs={12} md={6}>
          <FormControl
            fullWidth
            error={formik.touched.category && Boolean(formik.errors.category)}
          >
            <Autocomplete
              id="country-select"
              fullWidth
              size="small"
              options={listCategories}
              value={formik.values.category}
              onChange={(e, value) =>
                formik.setFieldValue("category", value || null)
              }
              autoHighlight
              getOptionLabel={(option) => getValueTitle(option) || ""}
              renderOption={(propsRender, option) => (
                <Box component="li" {...propsRender}>
                  {getValueTitle(option)}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t<string>("common.label_category")}
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
            <FormHelperText id="component-helper-text">
              {formik.errors.category}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl
            fullWidth
            error={formik.touched.address && Boolean(formik.errors.address)}
          >
            <Autocomplete
              id="country-select"
              fullWidth
              size="small"
              options={cities}
              value={formik.values.address}
              onChange={(e, value) =>
                formik.setFieldValue("address", value || "")
              }
              autoHighlight
              getOptionLabel={(option) => option?.city || ""}
              renderOption={(propsRender, option) => (
                <Box component="li" {...propsRender}>
                  {option.city}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t<string>("common.label_address")}
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
            <FormHelperText id="component-helper-text">
              {formik.touched.address && formik.errors.address}
            </FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
