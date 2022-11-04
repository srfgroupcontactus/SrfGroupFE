import React from "react";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton/ListItemButton";
import Skeleton from "@mui/material/Skeleton/Skeleton";

export function ConversationLoading() {
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {[0, 1, 2].map((key) => (
        <ListItemButton alignItems="flex-start" key={`key-${key}`}>
          <ListItemAvatar>
            <Skeleton variant="circular" width={40} height={40} />
          </ListItemAvatar>
          <ListItemText
            primary={<Skeleton variant="text" />}
            secondary={<Skeleton variant="text" />}
          />
        </ListItemButton>
      ))}
    </List>
  );
}
