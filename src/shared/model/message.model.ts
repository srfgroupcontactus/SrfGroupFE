import { IConversation } from "./conversation.model";
import { IUser } from "./user.model";

export interface IMessage {
  id?: number;
  content?: string | null;
  dateCreated?: string | null;
  isRead?: boolean | null;
  senderUser?: IUser | null;
  receiverUser?: IUser | null;
  conversation?: IConversation | null;
}

export const defaultValue: Readonly<IMessage> = {
  isRead: false,
};
