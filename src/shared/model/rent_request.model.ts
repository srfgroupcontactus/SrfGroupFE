import {IRentOffer} from "./rent-offer.model";
import {IUser} from "./user.model";

export interface IRentRequest{
    id?: number;
    sendDate?: string;
    status?: string;
    imageSignatureReceived?: string;
    rentOffer?: IRentOffer;
    senderUser?: IUser;
    receiverUser?: IUser;
}
