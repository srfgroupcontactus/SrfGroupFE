import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField/TextField";
import Toolbar from "@mui/material/Toolbar/Toolbar";
import IconButton from "@mui/material/IconButton/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import FilterIcon from "@mui/icons-material/FilterListSharp";
import Autocomplete from "@mui/material/Autocomplete/Autocomplete";
import CloseIcon from "@mui/icons-material/Close";
import {
  initialValuesSearchAppBar,
  validationSchemSearchAppBar,
} from "../../../shared/layout/menus/validation/inti-value-search-app-bar";
import { useFormik } from "formik";
import { useLocation } from "react-router-dom";
import { TypeOfferEnum } from "../../../shared/enums/type-offer.enum";
import queryString from "query-string";
import { useTranslation } from "react-i18next";
import AppBar from "@mui/material/AppBar/AppBar";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GridOnIcon from "@mui/icons-material/GridOn";
import { TypeDisplaySearchOffers } from "../../enums/type-offer.enum";
import { ICategory } from "../../model/category.model";
import i18n from "i18next";
import { TransitionModal } from "../../pages/transition-modal";
import Dialog from "@mui/material/Dialog/Dialog";
import DialogTitle from "@mui/material/DialogTitle/DialogTitle";
import DialogContent from "@mui/material/DialogContent/DialogContent";
import DialogContentText from "@mui/material/DialogContentText/DialogContentText";
import DialogActions from "@mui/material/DialogActions/DialogActions";
// import {FilterOffer} from "../../../main-features/search/ui-segments/FilterOffer";
import { IAddress } from "../../model/address.model";
import Typography from "@mui/material/Typography/Typography";
import { FilterOffer } from "../../../main-features/offer/components/search/ui-segments/FilterOffer";
import SuggesSearch from "../../components/suggest-search/SuggesSearch";

const listTypeOffers: string[] = [
  TypeOfferEnum.Sell,
  TypeOfferEnum.Rent,
  TypeOfferEnum.Find,
];

const initialValues = initialValuesSearchAppBar;

export function SearchAppBar({
  entitiesCategories,
  searchCalback,
  typeDisplayCallback,
  listAddress,
  hideFilter,
}: {
  entitiesCategories: ICategory[];
  searchCalback: any;
  typeDisplayCallback?: any;
  listAddress: IAddress[];
  hideFilter?: boolean;
}) {
  const [typeDisplayOffers, setTypeDisplayOffers] =
    React.useState<TypeDisplaySearchOffers>(TypeDisplaySearchOffers.Grid);
  const [defaultLanguage, setDefaultLanguage] = React.useState("fr");
  const [openFilterOfferModal, setOpenFilterOfferModal] = React.useState(false);
  const [valuesSearch, setValuesSearch] = React.useState(null);

  const { search } = useLocation();

  const { t } = useTranslation();

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchemSearchAppBar,
    onSubmit: (values: any) => {
      searchCalback(values);
    },
  });

  React.useEffect(() => {
    i18n.on("languageChanged", (lang: any) => {
      setDefaultLanguage(lang);
    });
  }, []);

  React.useEffect(() => {
    const objParams = queryString.parse(search);
    formik.setFieldValue("title", objParams.title || "");
    formik.setFieldValue("typeOffer", objParams.typeOffer || "");
  }, [search]);

  React.useEffect(() => {
    const values: any = queryString.parse(search);
    Object.keys(values).forEach((key) => {
      if (key === "category.id") {
        formik.setFieldValue(
          "category",
          entitiesCategories.find(
            (add) => add?.id?.toString() === values[key]?.toString()
          ) || null
        );
      }
    });
  }, [entitiesCategories]);

  const changeTypeDisplayOffers = () => {
    setTypeDisplayOffers(
      typeDisplayOffers === TypeDisplaySearchOffers.Grid
        ? TypeDisplaySearchOffers.List
        : TypeDisplaySearchOffers.Grid
    );
    typeDisplayCallback(
      typeDisplayOffers === TypeDisplaySearchOffers.Grid
        ? TypeDisplaySearchOffers.List
        : TypeDisplaySearchOffers.Grid
    );
  };

  const getOptionLabelCat = (option: ICategory) => {
    if (defaultLanguage === "en") {
      return option.titleEn || "";
    } else if (defaultLanguage === "fr") {
      return option.titleFr || "";
    }
    return option.titleAr || "";
  };

  const getOptionTranslateLabel = (option: string): string => {
    if (option === TypeOfferEnum.Sell) {
      return t("common.for_sell");
    } else if (option === TypeOfferEnum.Rent) {
      return t("common.for_rent");
    } else if (option === TypeOfferEnum.Find) {
      return t("common.for_find");
    }
    return "";
  };

  const handleCloseFilterOfferModal = () => {
    setOpenFilterOfferModal(false);
  };

  const handleSearchFilterOfferModal = () => {
    setOpenFilterOfferModal(false);
    searchCalback(valuesSearch);
  };

  const onChange = (values: any) => {
    setValuesSearch(values);
  };

  const renderDialogFilterOffer = () => {
    return (
      <Dialog
        fullScreen
        open={openFilterOfferModal}
        TransitionComponent={TransitionModal}
        keepMounted
        onClose={handleCloseFilterOfferModal}
        aria-describedby="alert-dialog-slide-description"
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar className="bg-brown">
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseFilterOfferModal}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {t<string>("common.label_cancel")}
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={handleSearchFilterOfferModal}
            >
              {t<string>("common.label_search")}
            </Button>
          </Toolbar>
        </AppBar>
        <DialogTitle>Filter offers</DialogTitle>
        <DialogContent>
          <FilterOffer listAddress={listAddress} handelChange={onChange} />
        </DialogContent>
        {/*<DialogActions>*/}
        {/*  <Button onClick={handleCloseFilterOfferModal}>Cancel</Button>*/}
        {/*  <Button color="success">Filter</Button>*/}
        {/*</DialogActions>*/}
      </Dialog>
    );
  };

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            position="static"
            color="default"
            sx={{ backgroundColor: "#fff" }}
          >
            <Toolbar
              sx={{
                display: { xs: "block", sm: "flex" },
                paddingRight: { md: 0 },
                paddingLeft: { md: 0 },
              }}
            >
              {!hideFilter ? (
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  sx={{ mx: 1, display: { xs: "none", md: "inline-flex" } }}
                  onClick={() => changeTypeDisplayOffers()}
                >
                  {typeDisplayOffers === TypeDisplaySearchOffers.Grid ? (
                    <FormatListBulletedIcon />
                  ) : (
                    <GridOnIcon />
                  )}
                </IconButton>
              ) : null}
              <FormControl
                variant="standard"
                sx={{
                  flexGrow: 1,
                  flexShrink: 1,
                  flexBasis: 0,
                  mx: 1,
                  width: { xs: "100%", md: "auto" },
                }}
              >
                <TextField
                  id="title"
                  name="title"
                  color="secondary"
                  type="search"
                  label={t<string>("common.label_search")}
                  variant="standard"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  autoComplete="off"
                />
              </FormControl>

              <FormControl
                variant="standard"
                sx={{
                  flexGrow: 1,
                  flexShrink: 1,
                  flexBasis: 0,
                  mx: 1,
                  width: { xs: "100%", md: "auto" },
                }}
              >
                <Autocomplete
                  id="typeOffer"
                  options={listTypeOffers}
                  value={formik.values.typeOffer}
                  onChange={(e, value) =>
                    formik.setFieldValue("typeOffer", value || null)
                  }
                  autoHighlight
                  getOptionLabel={(option) => getOptionTranslateLabel(option)}
                  renderOption={(propsRender, option) => (
                    <Box component="li" {...propsRender}>
                      {getOptionTranslateLabel(option)}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={t<string>("common.type_offer")}
                      variant="standard"
                      color="secondary"
                      inputProps={{
                        ...params.inputProps,
                        form: {
                          autoComplete: "off",
                        },
                        autoComplete: "off", // disable autocomplete and autofill
                      }}
                    />
                  )}
                />
              </FormControl>

              <FormControl
                variant="standard"
                sx={{
                  flexGrow: 1,
                  flexShrink: 1,
                  flexBasis: 0,
                  mx: 1,
                  width: { xs: "100%", md: "auto" },
                }}
              >
                <Autocomplete
                  id="category-select"
                  options={entitiesCategories}
                  value={formik.values.category}
                  onChange={(e, value) =>
                    formik.setFieldValue("category", value || "")
                  }
                  autoHighlight
                  getOptionLabel={(option) => getOptionLabelCat(option)}
                  renderOption={(propsRender, option) => (
                    <Box component="li" {...propsRender}>
                      {getOptionLabelCat(option)}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={t<string>("common.label_category")}
                      variant="standard"
                      color="secondary"
                      inputProps={{
                        ...params.inputProps,
                        form: {
                          autoComplete: "off",
                        },
                        name: "category-name",
                        autoComplete: "off", // disable autocomplete and autofill
                      }}
                    />
                  )}
                />
              </FormControl>

              <Box sx={{ my: { xs: 2, md: "auto" } }}>
                {!hideFilter ? (
                  <IconButton
                    size="large"
                    edge="start"
                    color="secondary"
                    aria-label="open drawer"
                    sx={{ mx: 1, display: { xs: "inline-flex", md: "none" } }}
                    onClick={() => changeTypeDisplayOffers()}
                  >
                    {typeDisplayOffers === TypeDisplaySearchOffers.Grid ? (
                      <FormatListBulletedIcon />
                    ) : (
                      <GridOnIcon />
                    )}
                  </IconButton>
                ) : null}

                <Button
                  variant="contained"
                  aria-label="open drawer"
                  sx={{
                    width: 100,
                    height: { xs: "auto", md: 100 },
                    borderRadius: "unset",
                    marginRight: "0.8rem",
                    display: { xs: "inline-flex", md: "none" },
                  }}
                  color="secondary"
                  onClick={() => setOpenFilterOfferModal(true)}
                >
                  <FilterIcon />
                </Button>

                <Button
                  variant="contained"
                  sx={{
                    height: { xs: "auto", md: 100 },
                    borderRadius: "unset",
                  }}
                  startIcon={<SearchIcon />}
                  color="secondary"
                  type="submit"
                >
                  {t<string>("common.label_search")}
                </Button>
              </Box>
            </Toolbar>
          </AppBar>
          {/*<SuggesSearch />*/}
        </Box>
      </form>
      {renderDialogFilterOffer()}
    </Box>
  );
}
