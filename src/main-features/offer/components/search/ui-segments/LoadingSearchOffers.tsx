import React from "react";
import Card from "@mui/material/Card/Card";
import Skeleton from "@mui/material/Skeleton/Skeleton";
import CardMedia from "@mui/material/CardMedia/CardMedia";
import CardContent from "@mui/material/CardContent/CardContent";
import Typography from "@mui/material/Typography/Typography";
import PropTypes from "prop-types";
import CardActionArea from "@mui/material/CardActionArea/CardActionArea";
import Box from "@mui/material/Box/Box";
import Grid from "@mui/material/Grid/Grid";
import { useTranslation } from "react-i18next";
import List from "@mui/material/List/List";
import ListItem from "@mui/material/ListItem/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import CardHeader from "@mui/material/CardHeader/CardHeader";
import { TypeDisplaySearchOffers } from "../../../../../shared/enums/type-offer.enum";

LoadingSearchOffers.propTypes = {
  loading: PropTypes.bool,
};

export default function LoadingSearchOffers({
  typeDisplay,
}: {
  typeDisplay: TypeDisplaySearchOffers;
}) {
  return (
    <Box sx={{ my: 4 }}>
      <Grid container spacing={{ xs: 2, md: 6 }}>
        {[0, 1, 2, 3, 4, 5].map((key) => (
          <Grid
            item
            xs={typeDisplay === TypeDisplaySearchOffers.Grid ? 6 : 12}
            sm={typeDisplay === TypeDisplaySearchOffers.Grid ? 4 : 12}
            key={key}
          >
            {typeDisplay === TypeDisplaySearchOffers.Grid ? (
              <CardGridLoading />
            ) : (
              <CardListLoading />
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

function CardListLoading() {
  return (
    <CardActionArea component="a">
      <Card sx={{ display: { xs: "block", sm: "flex" } }}>
        <CardMedia
          sx={{
            width: { xs: "100%", sm: 250 },
            height: { xs: "100%", sm: 200 },
          }}
        >
          <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
        </CardMedia>
        <CardContent sx={{ flex: 1 }}>
          <List
            sx={{ width: "100%", pt: 0, pb: 0, bgcolor: "background.paper" }}
          >
            <ListItem sx={{ pl: 0 }}>
              <ListItemAvatar>
                <Skeleton variant="circular" width={40} height={40} />
              </ListItemAvatar>
              <ListItemText
                primary={<Skeleton animation="wave" height={24} />}
                secondary={<Skeleton animation="wave" height={24} />}
              />
            </ListItem>
          </List>

          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography
                component="h5"
                variant="h5"
                sx={{ fontSize: "1.2rem" }}
              >
                <Skeleton animation="wave" height={24} />
              </Typography>

              <Skeleton variant="rectangular" width={"100%"} height={50} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </CardActionArea>
  );
}

function CardGridLoading() {
  const { t } = useTranslation();

  return (
    <CardActionArea component="a">
      <Card>
        <CardHeader
          avatar={<Skeleton variant="circular" width={40} height={40} />}
          action={""}
          title={<Skeleton animation="wave" height={24} />}
          subheader={
            <Typography variant="subtitle2" color="text.secondary">
              <Skeleton animation="wave" height={24} />
            </Typography>
          }
        />
        <CardMedia sx={{ height: { xs: 150, md: 200 } }}>
          <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
        </CardMedia>
        <CardContent className="card-content"></CardContent>
      </Card>
    </CardActionArea>
  );
}
