import React from "react";
import "./MessageStyle.scss";
import Box from "@mui/material/Box/Box";
import AppBar from "@mui/material/AppBar/AppBar";
import Toolbar from "@mui/material/Toolbar/Toolbar";
import IconButton from "@mui/material/IconButton/IconButton";
import SendIcon from "@mui/icons-material/Send";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import TextField from "@mui/material/TextField/TextField";
import FormControl from "@mui/material/FormControl/FormControl";
import { useFormik } from "formik";
import FormHelperText from "@mui/material/FormHelperText/FormHelperText";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import Button from "@mui/material/Button/Button";
import List from "@mui/material/List/List";
import ListItem from "@mui/material/ListItem/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar/ListItemAvatar";
import Avatar from "@mui/material/Avatar/Avatar";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import { IConversation } from "../../../../shared/model/conversation.model";
import { IMessage } from "../../../../shared/model/message.model";
import {
  initialValuesMessage,
  validationSchemaMessage,
} from "../../validation/initial-values-message";
import {
  convertDateTimeToServer,
  getFullnameUser,
  getUserAvatar,
} from "../../../../shared/utils/utils-functions";
import { getStompClient } from "../../../../core/config/websocket-middleware";
import { IUser } from "../../../../shared/model/user.model";
import { ALL_APP_ROUTES } from "../../../../core/config/all-app-routes";
import { ConvertReactTimeAgo } from "../../../../shared/pages/react-time-ago";

const initialValues = initialValuesMessage;

export function MessageConversation({
  account,
  conversation,
  callbackAddMessage,
  loadingListMessages,
  listMessages,
  loadingAddMessage,
  totalPagesMessages,
  activePage,
  callbackLoadMoreMessages,
  calbackBackToConversations,
}: {
  account: any;
  conversation: IConversation;
  callbackAddMessage: any;
  loadingListMessages: boolean;
  listMessages: IMessage[];
  loadingAddMessage: boolean;
  totalPagesMessages: number;
  activePage: number;
  callbackLoadMoreMessages: any;
  calbackBackToConversations: any;
}) {
  const [listCurrentMessages, setListCurrentMessages] = React.useState<
    IMessage[]
  >([]);
  const [newMessage, setNewMessage] = React.useState<any>(null);
  const messagesEndRef = React.useRef<any>();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchemaMessage,
    onSubmit: (values) => {
      const entity: IMessage = {
        content: values.content,
        dateCreated: convertDateTimeToServer(new Date()),
        isRead: false,
        senderUser: {
          id: account.id,
          email: account.email,
          imageUrl: account.imageUrl,
          sourceConnectedDevice: account.sourceConnectedDevice,
        },
        receiverUser: {
          id: getReceiverUser()?.id,
          email: getReceiverUser()?.email,
          imageUrl: getReceiverUser()?.imageUrl,
          sourceConnectedDevice: getReceiverUser()?.sourceConnectedDevice,
        },
        conversation: {
          id: conversation.id,
        },
      };

      // Whene me send a message
      setListCurrentMessages([...listCurrentMessages, entity]);

      getStompClient()?.send(
        "/topic/sendChatMessages", // destination
        JSON.stringify(entity), // body
        {} // header
      );
      callbackAddMessage(entity);
      formik.resetForm();

      setTimeout(() => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }, 300);
    },
  });

  React.useEffect(() => {
    subscribeChatMessages();
  }, []);

  const getReceiverUser = (): IUser | null | undefined => {
    if (conversation?.senderUser?.id === account.id) {
      return conversation?.receiverUser;
    }
    return conversation?.senderUser;
  };

  const getAvatarReceiverUser = (): string | undefined => {
    if (conversation?.senderUser?.id === account.id) {
      return getUserAvatar(
        conversation?.receiverUser?.id,
        conversation?.receiverUser?.imageUrl,
        conversation?.receiverUser?.sourceConnectedDevice
      );
    }
    return getUserAvatar(
      conversation?.senderUser?.id,
      conversation?.senderUser?.imageUrl,
      conversation?.senderUser?.sourceConnectedDevice
    );
  };

  React.useEffect(() => {
    if (listMessages.length) {
      setListCurrentMessages(listMessages.slice());
    }
  }, [listMessages]);

  React.useEffect(() => {
    if (newMessage) {
      setListCurrentMessages([...listCurrentMessages, newMessage]);
    }
  }, [newMessage]);

  const isMe = (message: IMessage) => {
    if (message?.senderUser?.id === account?.id) {
      return true;
    }
    return false;
  };

  const getAvatar = (message: IMessage): string => {
    if (message?.senderUser?.id === account?.id) {
      return getUserAvatar(
        message?.receiverUser?.id,
        message?.receiverUser?.imageUrl,
        message?.receiverUser?.sourceConnectedDevice
      );
    }
    return getUserAvatar(
      message?.senderUser?.id,
      message?.senderUser?.imageUrl,
      message?.senderUser?.sourceConnectedDevice
    );
  };

  const loadMoreMessages = () => {
    callbackLoadMoreMessages();
  };

  const backToConversations = () => {
    calbackBackToConversations();
  };

  /**
   *
   */
  const subscribeChatMessages = () => {
    getStompClient()?.subscribe(
      `/topic/chat-message/${account.id}/${getReceiverUser()?.id}`,
      (data: any) => {
        setNewMessage(JSON.parse(data.body));
      }
    );
  };

  const redirectProfile = () => {
    if (conversation?.senderUser?.id === account.id) {
      setTimeout(() => {
        navigate(ALL_APP_ROUTES.PROFILE + "/" + conversation?.receiverUser?.id);
      }, 300);
    } else {
      setTimeout(() => {
        navigate(ALL_APP_ROUTES.PROFILE + "/" + conversation?.senderUser?.id);
      }, 300);
    }
  };

  return (
    <div className="container-messages">
      <div className="row clearfix">
        <div className="col-lg-12">
          <div className="card chat-app">
            <div className="chat">
              <div className="chat-header clearfix">
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                >
                  <ListItem button alignItems="center">
                    <IconButton
                      aria-label="upload picture"
                      component="span"
                      onClick={backToConversations}
                      sx={{ display: { xs: "inline-flex", md: "none" } }}
                    >
                      <ArrowBackIosIcon />
                    </IconButton>
                    <ListItemAvatar onClick={() => redirectProfile()}>
                      <Avatar alt="Remy Sharp" src={getAvatarReceiverUser()}>
                        {getFullnameUser(getReceiverUser())?.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={getFullnameUser(getReceiverUser())}
                      onClick={() => redirectProfile()}
                      secondary={
                        <React.Fragment>
                          {/*<Typography*/}
                          {/*sx={{ display: 'inline' }}*/}
                          {/*component="span"*/}
                          {/*variant="body2"*/}
                          {/*color="text.primary"*/}
                          {/*>*/}
                          {/*Ali Connors*/}
                          {/*</Typography>*/}
                          {/*{" — I'll be in your neighborhood doing errands this…"}*/}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </List>
              </div>
              <div className="chat-history">
                {totalPagesMessages - 1 > activePage ? (
                  <Box sx={{ paddingTop: 5, textAlign: "center" }}>
                    <Button
                      color="neutral"
                      variant="outlined"
                      onClick={loadMoreMessages}
                    >
                      Load More...
                    </Button>
                  </Box>
                ) : null}

                {loadingListMessages ? (
                  <Box sx={{ pt: 5, textAlign: "center" }}>
                    <CircularProgress color="inherit" />
                  </Box>
                ) : null}

                <ul className="m-b-0">
                  {listCurrentMessages.map(
                    (message: IMessage, index: number) => (
                      <li
                        className="clearfix"
                        key={`message-${index}-${message.id}`}
                      >
                        <div
                          className={
                            isMe(message)
                              ? "message-data text-right"
                              : "message-data message-data-other"
                          }
                        >
                          {!isMe(message) ? (
                            <Avatar
                              alt="Photo"
                              src={getAvatar(message)}
                              sx={{
                                width: 40,
                                height: 40,
                                border: "1px solid #b9b9b9",
                              }}
                            >
                              A
                            </Avatar>
                          ) : null}
                          <div className="message-data-time">
                            <ConvertReactTimeAgo
                              convertDate={message?.dateCreated}
                            />
                          </div>
                        </div>
                        <div
                          className={
                            isMe(message)
                              ? "message my-message float-right"
                              : "message other-message"
                          }
                        >
                          {message?.content}
                        </div>
                      </li>
                    )
                  )}
                </ul>
                <div ref={messagesEndRef}></div>
              </div>
              <div className="chat-message clearfix">
                <Box sx={{ flexGrow: 1 }}>
                  <form onSubmit={formik.handleSubmit}>
                    <AppBar position="static" color="transparent">
                      <Toolbar>
                        <IconButton
                          size="large"
                          edge="start"
                          color="inherit"
                          aria-label="open drawer"
                          sx={{ mr: 2 }}
                        >
                          <EmojiEmotionsIcon />
                        </IconButton>

                        <FormControl
                          variant="standard"
                          fullWidth
                          error={
                            formik.touched.content &&
                            Boolean(formik.errors.content)
                          }
                        >
                          <TextField
                            id="content"
                            name="content"
                            label="Write your message..."
                            variant="standard"
                            autoComplete="off"
                            value={formik.values.content}
                            onChange={formik.handleChange}
                          />
                          <FormHelperText id="component-helper-text-message">
                            {formik.touched.content && formik.errors.content}
                          </FormHelperText>
                        </FormControl>

                        <Box sx={{ flexGrow: 1 }} />
                        <Box>
                          <LoadingButton
                            loading={loadingAddMessage}
                            variant="text"
                            color="inherit"
                            type="submit"
                          >
                            <SendIcon />
                          </LoadingButton>
                        </Box>
                      </Toolbar>
                    </AppBar>
                  </form>
                </Box>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
