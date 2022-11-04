import * as React from "react";
import Box from "@mui/material/Box/Box";
import Grid from "@mui/material/Grid/Grid";
import Card from "@mui/material/Card/Card";
import CardContent from "@mui/material/CardContent/CardContent";
import ListItem from "@mui/material/ListItem/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar/ListItemAvatar";
import Avatar from "@mui/material/Avatar/Avatar";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import { getBaseImageUrl } from "../../../shared/utils/utils-functions";
import { List } from "@mui/material";
import { ForRentHomeClient } from "./ForRentHomeClient";

interface IService {
  img: string;
  primaryTitle: string;
  secondTitle: string;
}

const SecondHorizentalListHomeClient = () => {
  const listServices: IService[] = [
    {
      img: getBaseImageUrl("/assets/images/home/services/delivery.png"),
      primaryTitle: "Livraison Express 24/48H",
      secondTitle: "Livraison rapide sur toute la Tunisie",
    },
    {
      img: getBaseImageUrl("/assets/images/home/services/euro.png"),
      primaryTitle: "Satisfait ou Remboursé",
      secondTitle: "Satisfait ou remboursé sans poser de questions ! (5Jours)",
    },
    {
      img: getBaseImageUrl("/assets/images/home/services/money.png"),
      primaryTitle: "Paiement à la livraison",
      secondTitle: "Achetez et payez à la livraison",
    },
    {
      img: getBaseImageUrl("/assets/images/home/services/chat.png"),
      primaryTitle: "Service Client 24/7",
      secondTitle:
        "Nous sommes à votre disposition pour répondre à vos questions",
    },
  ];

  return (
    <Box sx={{ p: 8, my: 10 }} className="bg-brown">
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {listServices.map((service: IService, index: number) => (
          <Grid item xs={12} md={3} key={`service-${index}`}>
            <Card sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent
                sx={{ flexGrow: 1, minHeight: "150px" }}
                className="bg-yellow"
              >
                <List aria-label="contacts">
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt={service.primaryTitle} src={service.img} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={service.primaryTitle}
                      secondary={service.secondTitle}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default React.memo(SecondHorizentalListHomeClient);
