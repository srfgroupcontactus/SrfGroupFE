import { IUser } from "./user.model";
import { ICommentOffer } from "./comment-offer.model";

export interface IReportCommentOffer {
  id?: number;
  commentOffer?: ICommentOffer;
  user?: IUser;
}

export const defaultValue: Readonly<IReportCommentOffer> = {};
