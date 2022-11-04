import React from "react";
import {
  AllAppConfig,
  APP_LOCAL_DATETIME_FORMAT,
} from "../../core/config/all-config";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import { SourceProvider } from "../enums/source-provider";
import { IUser } from "../model/user.model";

export const isPromise = (value: any): boolean => {
  if (value !== null && typeof value === "object") {
    return value && typeof value.then === "function";
  }
  return false;
};

export const getFullnameUser = (user?: IUser | null | undefined) => {
  return user?.firstName || user?.lastName
    ? user?.firstName + " " + user?.lastName
    : user?.email;
};

/**
 *
 * @returns {string}
 */
export const getBaseImageUrl = (path?: string) => {
  return `${process.env?.REACT_APP_BASE_URL_FE}` + path;
};

/**
 *
 * @param {IOffer} offer
 * @returns {string}
 */
export const getImageForOffer = (offerId?: number, path?: string) => {
  if (!path) {
    return (
      `${
        process.env.REACT_APP_BASE_URL_FE +
        (process.env?.REACT_APP_PUBLIC_URL || "")
      }` + AllAppConfig.DEFAULT_LAZY_IMAGE
    );
  }
  return `${process.env.REACT_APP_API_END_POINT}api/offer/public/files/${offerId}/${path}`;
};

/**
 *
 * @param {string} username user
 * @param {string} imageUrl user
 * @returns {string}
 */
export const getUserAvatar = (
  userId: number,
  imageUrl?: string,
  sourceConnectedDevice?: string
): string => {
  if (
    sourceConnectedDevice === SourceProvider.WEB_BROWSER ||
    sourceConnectedDevice === SourceProvider.MOBILE_BROWSER
  ) {
    if (!imageUrl) {
      return (
        `${
          process.env.REACT_APP_BASE_URL_FE +
          (process.env?.REACT_APP_PUBLIC_URL || "")
        }` + AllAppConfig.DEFAULT_AVATAR
      );
    }
    return `${process.env.REACT_APP_API_END_POINT}api/user/public/avatar/${userId}/${imageUrl}`;
  }

  // GooglePlus or Facebook
  return imageUrl || "";
};

/**
 *
 * @returns {URLSearchParams}
 */
export function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export function getFullUrlWithParams(values: any) {
  let queryParams = "";
  Object.keys(values).forEach((key) => {
    if (key === "category" && values[key] && values[key].id) {
      if (values[key]) {
        queryParams += "&category.id=" + values[key].id;
      }
    }

    if (key === "address" && values[key] && values[key].id) {
      if (values[key]) {
        queryParams += "&address.id=" + values[key].id;
      }
    }

    if (key !== "category" && key !== "address" && values[key]) {
      queryParams += "&" + key + "=" + values[key];
    }
  });
  return queryParams;
}

/**
 *
 * @param file
 * @returns {Promise}
 */
export const getBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    if( file ){
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = function (error) {
        reject(error);
      };
    }
    else{
      reject(null);
    }
  });
};

/**
 *
 * @param {string} dataUrl
 * @param {string} fileName
 * @returns {Promise<File>}
 */
export async function dataUrlToFile(
  dataUrl: string,
  fileName: string
): Promise<File> {
  const res: Response = await fetch(dataUrl);
  const blob: Blob = await res.blob();
  return new File([blob], fileName, { type: "image/png" });
}

export const convertDateTimeFromServer = (date: Date) =>
  date ? dayjs(date).format(APP_LOCAL_DATETIME_FORMAT) : null;

export const convertDateTimeToServer = (date: Date) =>
  date ? dayjs(date).toISOString() : "";

export const displayDefaultDateTime = () =>
  dayjs().startOf("day").format(APP_LOCAL_DATETIME_FORMAT);

/**
 * Check if browser from  Web or Mobile
 */
export function checkMobileDesktopBrowser() {
  let check = SourceProvider.WEB_BROWSER;
  (function (a: string) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw(n|u)|c55\/|capi|ccwa|cdm|cell|chtm|cldc|cmd|co(mp|nd)|craw|da(it|ll|ng)|dbte|dcs|devi|dica|dmob|do(c|p)o|ds(12|d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(|_)|g1 u|g560|gene|gf5|gmo|go(\.w|od)|gr(ad|un)|haie|hcit|hd(m|p|t)|hei|hi(pt|ta)|hp( i|ip)|hsc|ht(c(| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i(20|go|ma)|i230|iac( ||\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|[a-w])|libw|lynx|m1w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|mcr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|([1-8]|c))|phil|pire|pl(ay|uc)|pn2|po(ck|rt|se)|prox|psio|ptg|qaa|qc(07|12|21|32|60|[2-7]|i)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h|oo|p)|sdk\/|se(c(|0|1)|47|mc|nd|ri)|sgh|shar|sie(|m)|sk0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h|v|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl|tdg|tel(i|m)|tim|tmo|to(pl|sh)|ts(70|m|m3|m5)|tx9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas|your|zeto|zte/i.test(
        a.substr(0, 4)
      )
    )
      check = SourceProvider.MOBILE_BROWSER;
  })(navigator.userAgent || navigator.vendor || window.opera || "");
  return check;
}

/**
 *
 * @param list
 * @param email
 */
export const isOnLine = (
  list: any[],
  email: string,
  currentEmail: string
): boolean => {
  if (email === currentEmail) {
    return true;
  }
  return list.findIndex((item) => item.principal.email == email) >= 0;
};

/**
 * ROLE_SUPER_ADMIN
 *
 * @param authorities
 * @param role
 */
export const hasUserRole = (authorities: any[] | undefined, role: string) => {
  return authorities && authorities.find((item: any) => item.name === role);
};
