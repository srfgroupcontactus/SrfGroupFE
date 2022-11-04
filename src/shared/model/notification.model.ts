import dayjs from "dayjs";
import { IUser } from "./user.model";
import { IOffer } from "./offer.model";

export interface INotification {
  id?: number;
  dateCreated?: string | null;
  content?: string | null;
  module?: string | null;
  isRead?: boolean | null;
  user?: IUser | null;
  offer?: IOffer | null;
}

export const defaultValue: Readonly<INotification> = {
  isRead: false,
};
