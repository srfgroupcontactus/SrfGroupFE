import React from "react";
import Box from "@mui/material/Box/Box";
import List from "@mui/material/List/List";
import ListSubheader from "@mui/material/ListSubheader/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar/ListItemAvatar";
import Avatar from "@mui/material/Avatar/Avatar";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import Divider from "@mui/material/Divider/Divider";
import Card from "@mui/material/Card/Card";
import CardContent from "@mui/material/CardContent/CardContent";

export default function RightSearch() {
  return (
    <Box>
      <List
        sx={{ width: "100%", mb: 4 }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" className="bg-yellow">
            Recommandé pour vous
          </ListSubheader>
        }
      >
        {[0, 1, 2, 3, 4, 5].map((key) => (
          <Box key={key}>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar alt="avatar" src="https://source.unsplash.com/random" />
              </ListItemAvatar>
              <ListItemText
                primary="Sent mail"
                secondary="September 14, 2016"
              />
            </ListItemButton>
            <Divider />
          </Box>
        ))}
      </List>

      <Card sx={{ my: 3 }}>
        <CardContent>
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/668nUCeBHyY"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </CardContent>
      </Card>

      {/*<ProblemeDeclaration />*/}
    </Box>
  );
}
