import dayjs from "dayjs";
import { IUser } from "./user.model";
import { IConversation } from "./conversation.model";

export interface IConversationContent {
  content?: string | null;
  conversation?: IConversation | null;
}

export const defaultValue: Readonly<IConversationContent> = {};
