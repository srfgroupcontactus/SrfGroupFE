import dayjs from "dayjs";
import { IUser } from "./user.model";

export interface IConversation {
  id?: number;
  dateCreated?: string | null;
  senderUser?: IUser | null;
  receiverUser?: IUser | null;
}

export const defaultValue: Readonly<IConversation> = {};
