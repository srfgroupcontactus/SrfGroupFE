import React from "react";
import List from "@mui/material/List/List";
import ListItem from "@mui/material/ListItem/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar/ListItemAvatar";
import Avatar from "@mui/material/Avatar/Avatar";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import Typography from "@mui/material/Typography/Typography";
import Divider from "@mui/material/Divider/Divider";
import TextField from "@mui/material/TextField/TextField";
import Button from "@mui/material/Button/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

import { useFormik } from "formik";
import IconButton from "@mui/material/IconButton/IconButton";
import Dialog from "@mui/material/Dialog/Dialog";
import DialogTitle from "@mui/material/DialogTitle/DialogTitle";
import DialogContent from "@mui/material/DialogContent/DialogContent";
import DialogContentText from "@mui/material/DialogContentText/DialogContentText";
import DialogActions from "@mui/material/DialogActions/DialogActions";
import CircularProgress from "@mui/material/CircularProgress";
import FlagIcon from "@mui/icons-material/Flag";
import { useEffect } from "react";
import Box from "@mui/material/Box/Box";
import {
  defaultValue,
  ICommentOffer,
} from "../../../../../shared/model/comment-offer.model";
import {
  getFullnameUser,
  getUserAvatar,
} from "../../../../../shared/utils/utils-functions";
import { IOffer } from "../../../../../shared/model/offer.model";
import { IUser } from "../../../../../shared/model/user.model";
import { TransitionModal } from "../../../../../shared/pages/transition-modal";
import { useTranslation } from "react-i18next";
import { ConvertReactTimeAgo } from "../../../../../shared/pages/react-time-ago";
import {
  initialValuesAddCommentOffer,
  validationSchemaAddCommentOffer,
} from "../validation/initial-values-add-comment-offer";
import ReadMoreText from "../../../../../shared/components/read-more-text/ReadMoreText";

const initialValues = initialValuesAddCommentOffer;

export default function CommentDetailsOffer({
  offerEntity,
  listCommentsByOffer,
  account,
  isAuthenticated,
  loadingListComments,
  loadingUpdateEntity,
  loadingAddEntity,
  parentCallbackAddComment,
  parentCallbackDeleteComment,
  parentCallbackUpdateComment,
  parentCallbackReportComment,
  parentCallbackLoadMoreComments,
  totalItems,
}: {
  offerEntity: IOffer | undefined;
  listCommentsByOffer: ReadonlyArray<ICommentOffer>;
  account: IUser;
  isAuthenticated: boolean;
  loadingListComments: boolean;
  loadingUpdateEntity: boolean;
  loadingAddEntity: boolean;
  parentCallbackAddComment: any;
  parentCallbackDeleteComment: any;
  parentCallbackUpdateComment: any;
  parentCallbackReportComment: any;
  parentCallbackLoadMoreComments: any;
  totalItems: number;
}) {
  const [commentDeleteId, setCommentDeleteId] = React.useState(-1);
  const [commentUpdateId, setCommentUpdateId] = React.useState(-1);
  const [showComments, setShowComments] = React.useState<boolean>(false);
  const [openReportCommentOfferModal, setOpenReportCommentOfferModal] =
    React.useState(false);
  const [commentReport, setCommentReport] =
    React.useState<ICommentOffer>(defaultValue);

  const { t } = useTranslation();

  const handleCallbackAddComment = (content: string) => {
    parentCallbackAddComment(content);
  };

  const handleCallbackUpdateComment = (content: string, commentId: number) => {
    parentCallbackUpdateComment(content, commentId);
    setCommentUpdateId(-1);
  };

  const [openDeleteCommentModal, setDeleteCommentModal] = React.useState(false);
  const handleClickOpenDeleteCommentModal = (cmtId: number) => {
    setCommentDeleteId(cmtId);
    setDeleteCommentModal(true);
  };
  const handleClickCancelDeleteCommentModal = () => {
    setDeleteCommentModal(false);
  };

  const handleClickDeleteDeleteCommentModal = () => {
    setDeleteCommentModal(false);
    parentCallbackDeleteComment(commentDeleteId);
  };

  const setUpdateComment = (commentId: number) => {
    setCommentUpdateId(commentId);
  };

  const parentCallbackCancelUpdateComment = () => {
    setCommentUpdateId(-1);
  };

  const renderDialogDeleteComment = () => {
    return (
      <Dialog
        open={openDeleteCommentModal}
        TransitionComponent={TransitionModal}
        keepMounted
        onClose={handleClickCancelDeleteCommentModal}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {t<string>("details_offer.title_dialog_delete_comment")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {t<string>("details_offer.description_dialog_delete_comment")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickCancelDeleteCommentModal} color="neutral">
            {t<string>("common.label_cancel")}
          </Button>
          <Button onClick={handleClickDeleteDeleteCommentModal} color="error">
            {t<string>("common.label_delete")}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const reportCommentOffer = (comment: ICommentOffer) => {
    setCommentReport(comment);
    setOpenReportCommentOfferModal(true);
  };
  const handleCloseReportCommentOfferModal = () => {
    setOpenReportCommentOfferModal(false);
  };
  const handleAddReportCommentOfferModal = () => {
    setOpenReportCommentOfferModal(false);
    parentCallbackReportComment(commentReport);
  };
  const renderDialogReportCommentOffer = () => {
    return (
      <Dialog
        open={openReportCommentOfferModal}
        TransitionComponent={TransitionModal}
        keepMounted
        onClose={handleCloseReportCommentOfferModal}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {t<string>("details_offer.title_dialog_report_comment")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {t<string>("details_offer.description_dialog_report_comment")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReportCommentOfferModal}>
            {t<string>("common.label_cancel")}
          </Button>
          <Button color="success" onClick={handleAddReportCommentOfferModal}>
            {t<string>("common.label_report")}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Box>
      <List sx={{ bgcolor: "background.paper", mt: 2 }}>
        <Box>
          {totalItems > 0 ? (
            <ListItem
              alignItems="flex-start"
              button
              onClick={() => setShowComments(!showComments)}
            >
              <ListItemText>
                <Typography
                  variant="subtitle1"
                  component="a"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  <u>
                    {!showComments
                      ? t<string>("comment_offer.show_comment_details_offer")
                      : t<string>("comment_offer.hide_comment_details_offer")}
                    ({totalItems})
                  </u>
                </Typography>
              </ListItemText>
            </ListItem>
          ) : null}

          {showComments ? (
            <Box>
              {listCommentsByOffer.map(
                (comment: ICommentOffer, index: number) => (
                  <div key={`comment-${index}`}>
                    <ListItem
                      alignItems="flex-start"
                      secondaryAction={
                        <Box>
                          {isAuthenticated &&
                          comment?.user?.id === account.id ? (
                            <IconButton
                              edge="end"
                              aria-label="edit"
                              color="success"
                              onClick={() => setUpdateComment(comment.id || -1)}
                              sx={{ mr: 0.5, display: "block" }}
                            >
                              <ModeEditIcon />
                            </IconButton>
                          ) : null}
                          {isAuthenticated &&
                          (offerEntity?.user?.id === account.id ||
                            comment?.user?.id === account.id) ? (
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              color="error"
                              onClick={() =>
                                handleClickOpenDeleteCommentModal(
                                  comment.id || -1
                                )
                              }
                              sx={{ display: "block" }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          ) : null}
                          {isAuthenticated &&
                          comment?.user?.id !== account.id ? (
                            <IconButton
                              edge="end"
                              aria-label="report"
                              onClick={() => reportCommentOffer(comment)}
                              sx={{ mr: 0.5, display: "block" }}
                            >
                              <FlagIcon />
                            </IconButton>
                          ) : null}
                        </Box>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar
                          alt="Avatar"
                          src={getUserAvatar(
                            comment.user?.id,
                            comment.user?.imageUrl,
                            comment.user?.sourceConnectedDevice
                          )}
                          sx={{ border: "1px solid #b9b9b9" }}
                        >
                          {getFullnameUser(comment?.user)?.charAt(0)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={getFullnameUser(comment?.user)}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "block" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              <ConvertReactTimeAgo
                                convertDate={comment.createdDate}
                              />
                            </Typography>
                            {commentUpdateId !== comment.id ? (
                              <ReadMoreText
                                lines={2}
                                text={comment.content || ""}
                                readMoreText={t<string>(
                                  "details_offer.label_show_more"
                                )}
                                readLessText={t<string>(
                                  "details_offer.label_show_less"
                                )}
                              />
                            ) : null}
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    {commentUpdateId === comment.id ? (
                      <Box sx={{ mr: 2, ml: 9 }}>
                        <UpdateComment
                          parentCallbackUpdateComment={(content: string) =>
                            handleCallbackUpdateComment(
                              content,
                              comment.id || -1
                            )
                          }
                          parentCallbackCancelUpdateComment={
                            parentCallbackCancelUpdateComment
                          }
                          defaultValueUpdate={comment.content}
                          loadingUpdateEntity={loadingUpdateEntity}
                        />
                      </Box>
                    ) : null}
                    <Divider variant="inset" component="li" />
                  </div>
                )
              )}

              {loadingListComments ? (
                <Box sx={{ display: "flex", justifyContent: "center", m: 2 }}>
                  <CircularProgress color="inherit" />
                </Box>
              ) : null}

              {totalItems > listCommentsByOffer.length ? (
                <ListItem
                  alignItems="center"
                  button
                  onClick={() => parentCallbackLoadMoreComments()}
                >
                  <ListItemText>
                    <Typography
                      variant="subtitle1"
                      component="h5"
                      color="text.secondary"
                      sx={{ mt: 1, textAlign: "center" }}
                    >
                      <u>{t<string>("comment_offer.show_more_comment")}</u>
                    </Typography>
                  </ListItemText>
                </ListItem>
              ) : null}
            </Box>
          ) : null}
        </Box>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar
              alt={account.imageUrl}
              src={getUserAvatar(
                account.id,
                account.imageUrl,
                account?.sourceConnectedDevice
              )}
              sx={{ border: "1px solid #b9b9b9" }}
            >
              {getFullnameUser(account)?.charAt(0)}
            </Avatar>
          </ListItemAvatar>
          <ListItemText>
            <AddComment
              parentCallbackAddComment={handleCallbackAddComment}
              loadingAddEntity={loadingAddEntity}
            />
          </ListItemText>
        </ListItem>
      </List>
      <div>{renderDialogDeleteComment()}</div>
      <div>{renderDialogReportCommentOffer()}</div>
    </Box>
  );
}

function AddComment({
  parentCallbackAddComment,
  loadingAddEntity,
}: {
  parentCallbackAddComment: any;
  loadingAddEntity: boolean;
}) {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchemaAddCommentOffer,
    onSubmit: (values) => {
      parentCallbackAddComment(values.content);
      formik.setFieldValue("content", "");
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        id="content"
        name="content"
        color="secondary"
        label={t<string>("comment_offer.label_add_comment")}
        value={formik.values.content}
        onChange={formik.handleChange}
        multiline={true}
        fullWidth
        maxRows={4}
      />
      <LoadingButton
        loading={loadingAddEntity}
        variant="outlined"
        size="small"
        type="submit"
        disabled={!formik.values.content}
        sx={{ my: 1 }}
        color="secondary"
      >
        {t<string>("comment_offer.label_comment")}
      </LoadingButton>
      <Typography variant="caption" display="block" gutterBottom color="error">
        {t<string>("comment_offer.alert_bad_word")}
      </Typography>
    </form>
  );
}

function UpdateComment({
  parentCallbackUpdateComment,
  parentCallbackCancelUpdateComment,
  defaultValueUpdate,
  loadingUpdateEntity,
}: {
  parentCallbackUpdateComment: any;
  parentCallbackCancelUpdateComment: any;
  defaultValueUpdate: any;
  loadingUpdateEntity: boolean;
}) {
  const [valueBeforCancelUpdate] = React.useState(defaultValueUpdate);

  const { t } = useTranslation();
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchemaAddCommentOffer,
    onSubmit: (values) => {
      parentCallbackUpdateComment(values.content);
    },
  });

  useEffect(() => {
    formik.setFieldValue("content", defaultValueUpdate);
  }, []);

  const cancelUpdate = () => {
    parentCallbackCancelUpdateComment(valueBeforCancelUpdate);
  };

  return (
    <React.Fragment>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="content"
          name="content"
          label="Add comment"
          value={formik.values.content}
          onChange={formik.handleChange}
          multiline
          fullWidth
          maxRows={4}
        />
        <Box sx={{ my: 1 }}>
          <LoadingButton
            loading={false}
            variant="outlined"
            size="small"
            type="button"
            sx={{ mr: 1 }}
            color="neutral"
            onClick={cancelUpdate}
          >
            {t<string>("common.label_cancel")}
          </LoadingButton>
          <LoadingButton
            loading={loadingUpdateEntity}
            variant="outlined"
            size="small"
            type="submit"
            disabled={!formik.values.content}
            color="success"
          >
            {t<string>("common.label_update")}
          </LoadingButton>
        </Box>
      </form>
    </React.Fragment>
  );
}
