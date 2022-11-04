import { IAddress } from "./address.model";

export interface IUser {
  id?: any;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  activated?: boolean;
  imageUrl?: string;
  langKey?: string;
  authorities?: any[];
  createdBy?: string;
  createdDate?: Date | null;
  lastModifiedBy?: string;
  lastModifiedDate?: Date | null;
  password?: string;
  sourceConnectedDevice?: string;
  address?: IAddress;
  phone?: string;
  linkProfileFacebook?: string;
}

export const defaultValue: Readonly<IUser> = {
  id: "",
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  activated: true,
  langKey: "",
  authorities: [],
  createdBy: "",
  createdDate: null,
  lastModifiedBy: "",
  lastModifiedDate: null,
  password: "",
  phone: "",
};

export interface IGooglePlus {
  Ba: string;
  accessToken: string;
  googleId: string;
  profileObj: any;
  tokenId: string;
  sourceProvider: string;
  idOneSignal: string;
}

export interface IFacebook {
  accessToken: string;
  data_access_expiration_time: string;
  email: string;
  expiresIn: string;
  graphDomain: string;
  id: string;
  name: string;
  picture: any;
  signedRequest: string;
  userID: string;
  sourceProvider: string;
  idOneSignal: string;
}

export interface IGooglePlusOneTap {
  alg: string;
  aud: string;
  azp: string;
  email: string;
  email_verified: string;
  exp: string;
  family_name: string;
  given_name: string;
  iat: string;
  iss: string;
  jti: string;
  kid: string;
  name: string;
  nbf: string;
  picture: string;
  sub: string;
  typ: string;
  sourceProvider: string;
  idOneSignal: string;
  langKey: string;
}
