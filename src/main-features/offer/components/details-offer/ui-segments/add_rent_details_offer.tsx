import * as React from "react";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {IOffer} from "../../../../../shared/model/offer.model";
import {addRentRequests, addSuccessRentRequest, resetRentRequestsSent} from "../../../../rent-request/store/slice";
import {allSessionSelector, currentUserSession, getNumberOfCarts} from "../../../../user/store/slice";
import {showUnauthorizedModal} from "../../../../../core/config/store/common/slice";
import {addSuccessOrder} from "../../../../cart/store/slice";
import Dialog from "@mui/material/Dialog/Dialog";
import {TransitionModal} from "../../../../../shared/pages/transition-modal";
import DialogTitle from "@mui/material/DialogTitle/DialogTitle";
import DialogContent from "@mui/material/DialogContent/DialogContent";
import DialogContentText from "@mui/material/DialogContentText/DialogContentText";
import DialogActions from "@mui/material/DialogActions/DialogActions";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {ALL_APP_ROUTES} from "../../../../../core/config/all-app-routes";

export default function AddRentDetailsOffer({offer}: {offer: IOffer}){

    const [openModalSuccessAddRentRequest, setOpenModalSuccessAddRentRequest] = React.useState(false);

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isAuthenticated} = useSelector(allSessionSelector);
    const currentUser = useSelector(currentUserSession) ?? {};

    const addSuccessRentRequestSelector = useSelector(addSuccessRentRequest) ?? false;

    const addRentRequest = () => {
        if( isAuthenticated ){
            const requestData = {
                rentOffer: {
                    id: offer.id
                },
                receiverUser: offer.user
            }
            dispatch(addRentRequests({...requestData}))
        }else{
            dispatch(showUnauthorizedModal({}));
        }

    }

    React.useEffect(() => {
        if( addSuccessRentRequestSelector ){
            setOpenModalSuccessAddRentRequest(true);
        }
    }, [addSuccessRentRequestSelector])

    const handleModalSuccessRentRequest = () => {
        setOpenModalSuccessAddRentRequest(false);
        dispatch(resetRentRequestsSent({}));
        navigate(ALL_APP_ROUTES.RENT_REQUEST.LIST);
    }

    const renderDialogSuccessRentRequest = () => {
        return (
            <Dialog
                open={openModalSuccessAddRentRequest}
                TransitionComponent={TransitionModal}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>
                    {t<string>("rentrequest.label_rent_request")}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {t<string>("rentrequest.message_success_send_rent_request")}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="success" onClick={handleModalSuccessRentRequest}>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };

    return (
        <Box>
            <Box sx={{ my: 2 }} display="flex" justifyContent="center">
                <LoadingButton
                    loading={false}
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={addRentRequest}
                    disabled={isAuthenticated && currentUser?.id===offer?.user?.id}
                >
                    {t<string>("details_offer.label_button_add_rent")}
                </LoadingButton>
            </Box>
            {renderDialogSuccessRentRequest()}
        </Box>
    )
}
