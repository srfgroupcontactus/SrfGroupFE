import React, { FunctionComponent } from "react";
import Stack from "@mui/material/Stack/Stack";
import Avatar from "@mui/material/Avatar/Avatar";
import styled from "@mui/material/styles/styled";
import Paper from "@mui/material/Paper/Paper";
import { getBaseImageUrl } from "../../../shared/utils/utils-functions";
import Box from "@mui/material/Box/Box";
import { Translation } from "react-i18next";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const FirstHorizentalListHomeClient: FunctionComponent = () => {
  const listCategories = [
    {
      img: getBaseImageUrl("/assets/images/home/categories/home.png"),
      title: (
        <Translation>
          {(t, { i18n }) => <>{t("home.label_category_immovable")}</>}
        </Translation>
      ),
    },
    {
      img: getBaseImageUrl("/assets/images/home/categories/cars.png"),
      title: (
        <Translation>
          {(t, { i18n }) => <>{t("home.label_category_cars")}</>}
        </Translation>
      ),
    },
    {
      img: getBaseImageUrl("/assets/images/home/categories/phones.png"),
      title: (
        <Translation>
          {(t, { i18n }) => <>{t("home.label_category_phones")}</>}
        </Translation>
      ),
    },
    {
      img: getBaseImageUrl("/assets/images/home/categories/services.png"),
      title: (
        <Translation>
          {(t, { i18n }) => <>{t("home.label_category_services")}</>}
        </Translation>
      ),
    },
    {
      img: getBaseImageUrl("/assets/images/home/categories/search.png"),
      title: (
        <Translation>
          {(t, { i18n }) => <>{t("home.label_category_search")}</>}
        </Translation>
      ),
    },
  ];

  return (
    <Box className="bg-brown" sx={{ p: 8, my: 10 }}>
      <Stack
        sx={{
          my: "4rem",
          px: { xs: 0, md: 2 },
          justifyContent: "center",
        }}
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        {listCategories.map((category: any, index: number) => (
          <Item
            sx={{
              flex: 1,
              color: "#fff",
            }}
            key={`category-${index}`}
            className="bg-grey"
          >
            <Avatar
              alt="Remy Sharp"
              src={category.img}
              sx={{
                width: 56,
                height: 56,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
            <h3 className="mt-2">{category.title}</h3>
          </Item>
        ))}
      </Stack>
    </Box>
  );
};
export default React.memo(FirstHorizentalListHomeClient);
