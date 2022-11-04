import { IMessage } from "./message.model";
import { IConversation } from "./conversation.model";

export interface IConversationMessage {
  conversation?: IConversation;
  message?: IMessage;
}

export const defaultValue: Readonly<IConversationMessage> = {};
