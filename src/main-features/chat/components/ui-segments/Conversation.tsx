import React from "react";
import Box from "@mui/material/Box/Box";
import Paper from "@mui/material/Paper/Paper";
import IconButton from "@mui/material/IconButton/IconButton";
import InputBase from "@mui/material/InputBase/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { ConversationLoading } from "./ConversationLoading";
import List from "@mui/material/List/List";
import ListItemButton from "@mui/material/ListItemButton/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar/ListItemAvatar";
import Avatar from "@mui/material/Avatar/Avatar";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import Typography from "@mui/material/Typography/Typography";
import Divider from "@mui/material/Divider/Divider";
import Alert from "@mui/material/Alert/Alert";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItem from "@mui/material/ListItem/ListItem";
import Dialog from "@mui/material/Dialog/Dialog";
import DialogTitle from "@mui/material/DialogTitle/DialogTitle";
import DialogContent from "@mui/material/DialogContent/DialogContent";
import DialogContentText from "@mui/material/DialogContentText/DialogContentText";
import DialogActions from "@mui/material/DialogActions/DialogActions";
import Button from "@mui/material/Button/Button";
import { useTranslation } from "react-i18next";
import { IConversationMessage } from "../../../../shared/model/conversation-message.model";
import { IUser } from "../../../../shared/model/user.model";
import { IConversation } from "../../../../shared/model/conversation.model";
import {
  getFullnameUser,
  getUserAvatar,
} from "../../../../shared/utils/utils-functions";
import { TransitionModal } from "../../../../shared/pages/transition-modal";
import { StyledBadge } from "../../../../shared/pages/styled-badge";
import { ConvertReactTimeAgo } from "../../../../shared/pages/react-time-ago";

export function Conversation({
  loading,
  list,
  account,
  listMessages,
  isOnLine,
  deleteConversation,
}: {
  loading: boolean;
  list: IConversationMessage[];
  account: IUser;
  listMessages: any;
  isOnLine: (email: string) => void;
  deleteConversation: any;
}) {
  const [openDeleteConvModal, setOpenDeleteConvModal] = React.useState(false);
  const [conversationDel, setConversationDel] = React.useState<
    IConversation | undefined
  >(undefined);
  const { t } = useTranslation();

  const getAvatar = (conversatioinMessage: IConversationMessage) => {
    if (conversatioinMessage?.conversation?.senderUser?.id === account.id) {
      return getUserAvatar(
        conversatioinMessage?.conversation?.receiverUser?.id,
        conversatioinMessage?.conversation?.receiverUser?.imageUrl,
        conversatioinMessage?.conversation?.receiverUser?.sourceConnectedDevice
      );
    } else {
      return getUserAvatar(
        conversatioinMessage?.conversation?.senderUser?.id,
        conversatioinMessage?.conversation?.senderUser?.imageUrl,
        conversatioinMessage?.conversation?.senderUser?.sourceConnectedDevice
      );
    }
  };

  const isUserOnLine = (conversatioinMessage: IConversationMessage) => {
    if (conversatioinMessage?.conversation?.senderUser?.id === account.id) {
      return isOnLine(
        conversatioinMessage?.conversation?.receiverUser?.email || ""
      );
    } else {
      return isOnLine(
        conversatioinMessage?.conversation?.senderUser?.email || ""
      );
    }
    return false;
  };

  const getFullname = (conversatioinMessage: IConversationMessage) => {
    if (conversatioinMessage?.conversation?.senderUser?.id === account.id) {
      return getFullnameUser(conversatioinMessage?.conversation?.receiverUser);
    } else {
      return getFullnameUser(conversatioinMessage?.conversation?.senderUser);
    }
  };

  const openListMessages = (conversation?: IConversation) => {
    listMessages(conversation);
  };

  const deleteConv = (event: any, conversation?: IConversation) => {
    event.stopPropagation();
    setOpenDeleteConvModal(true);
    setConversationDel(conversation);
  };

  const handleCloseDeleteConvModal = () => {
    setOpenDeleteConvModal(false);
  };

  const handleDeleteConvModal = () => {
    setOpenDeleteConvModal(false);
    deleteConversation(conversationDel);
  };

  const renderDialogFavoriteUser = () => {
    return (
      <Dialog
        open={openDeleteConvModal}
        TransitionComponent={TransitionModal}
        keepMounted
        onClose={handleCloseDeleteConvModal}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{t<string>("chat.title_delete_conversation")}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {t<string>("chat.description_delete_conversation")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConvModal} color="neutral">
            {t<string>("common.label_cancel")}
          </Button>
          <Button onClick={handleDeleteConvModal} color="success">
            {t<string>("common.label_delete")}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Box>
      <Paper sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}>
        <IconButton sx={{ p: "10px" }} aria-label="menu">
          <MenuIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search .."
          inputProps={{ "aria-label": "search conversation" }}
        />
        <IconButton sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <br />

      {loading ? (
        <ConversationLoading />
      ) : (
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {list.map(
            (conversatioinMessage: IConversationMessage, index: number) => (
              <Box key={`conversation-${index}`}>
                <ListItem
                  button
                  alignItems="flex-start"
                  onClick={() =>
                    openListMessages(conversatioinMessage.conversation)
                  }
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={(event: any) =>
                        deleteConv(event, conversatioinMessage.conversation)
                      }
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      variant="dot"
                      color={
                        isUserOnLine(conversatioinMessage) ? "success" : "error"
                      }
                    >
                      <Avatar
                        alt="User avatar"
                        src={getAvatar(conversatioinMessage)}
                      ></Avatar>
                    </StyledBadge>
                  </ListItemAvatar>
                  <ListItemText
                    className="item-conversation-infos"
                    primary={getFullname(conversatioinMessage)}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          <ConvertReactTimeAgo
                            convertDate={
                              conversatioinMessage?.conversation?.dateCreated
                            }
                          />
                        </Typography>
                        {` — ${conversatioinMessage?.message?.content}`}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </Box>
            )
          )}

          {!loading && list.length === 0 ? (
            <Alert severity="warning">No Conversations found</Alert>
          ) : null}
        </List>
      )}
      <div>{renderDialogFavoriteUser()}</div>
    </Box>
  );
}
