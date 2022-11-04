import React from "react";
import ReactDOM from "react-dom";
import { TransitionModal } from "../../pages/transition-modal";
import DialogTitle from "@mui/material/DialogTitle/DialogTitle";
import DialogContent from "@mui/material/DialogContent/DialogContent";
import DialogContentText from "@mui/material/DialogContentText/DialogContentText";
import DialogActions from "@mui/material/DialogActions/DialogActions";
import Button from "@mui/material/Button/Button";
import { ALL_APP_ROUTES } from "../../../core/config/all-app-routes";
import Dialog from "@mui/material/Dialog/Dialog";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  hideUnauthorizedModal,
  showUnauthorized,
} from "../../../core/config/store/common/slice";

const UnauthorizeContentModal = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showUnauthorizedSelector = useSelector(showUnauthorized) ?? false;

  const onDimiss = () => {
    dispatch(hideUnauthorizedModal({}));
  };

  const onConfirm = () => {
    dispatch(hideUnauthorizedModal({}));
    navigate(ALL_APP_ROUTES.LOGIN);
  };
  return (
    <div>
      {showUnauthorizedSelector
        ? ReactDOM.createPortal(
            <React.Fragment>
              <Dialog
                open={showUnauthorizedSelector}
                TransitionComponent={TransitionModal}
                keepMounted
                onClose={onDimiss}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle>
                  {t<string>("common.label_unauthorized_action")}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    {t<string>("common.message_unauthorized_action")}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={onDimiss} color="neutral">
                    {t<string>("common.label_cancel")}
                  </Button>
                  <Button color="success" onClick={() => onConfirm()}>
                    {t<string>("signin.label_login")}
                  </Button>
                </DialogActions>
              </Dialog>
            </React.Fragment>,
            document.body
          )
        : null}
    </div>
  );
};

export default UnauthorizeContentModal;
