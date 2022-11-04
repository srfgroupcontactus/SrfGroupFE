import { StorageService } from "../../../shared/services/storage.service";
import { AllAppConfig } from "../../../core/config/all-config";
import { loginWithGoogleOneTap } from "./slice";
import { IUser } from "../../../shared/model/user.model";

export const languages: any = {
  "ar-ly": { name: "العربية", rtl: true },
  en: { name: "English" },
  fr: { name: "Français" },
};
export const locales = Object.keys(languages).sort();

const CURRENT_USER = StorageService.local.get(AllAppConfig.VALUE_CURRENT_USER)
  ? JSON.parse(StorageService.local.get(AllAppConfig.VALUE_CURRENT_USER))
  : null;

export const initialState = {
  login: {
    token: "",
    loading: false,
    loginWithGoogleOneTapSuccess: false,
  },
  session: {
    isAuthenticated: CURRENT_USER ? true : false,
    token: "",
    currentUser: CURRENT_USER ? (CURRENT_USER as IUser) : ({} as IUser),
    nbeNotificationsNotRead: 0,
    nbeMessagesNotRead: 0,
    nbeCarts: 0,
    oneSignalId: "",
    loading: false,
  },
  register: {
    loading: false,
    addSuccess: false,
    errorMessage: null,
  },
  activationAccount: {
    loading: false,
    activation: false,
  },
  locale: {
    currentLocale: "fr",
  },
  account: {
    loadingPassword: false,
    updateSuccessPassword: false,
    entityUpdateInfos: {} as IUser,
    loadingUpdateInfos: false,
    updateSuccessInfos: false,
    loadingUpdateAvatar: false,
    updateSuccessAvatar: false,
    entityUpdateAvatar: {},
  },
  profile: {
    loading: false,
    entity: {} as IUser,
    loadingReport: false,
    reportSuccess: false,
  },
  password: {
    loadingResetInit: false,
    resetInitSuccess: false,
    loadingResetFinish: false,
    resetFinishSuccess: false,
  },
  websocket: {
    listConnectedUsers: [],
  },
};
