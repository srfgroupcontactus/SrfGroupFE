import OneSignal from "react-onesignal";
import { AllAppConfig } from "../../core/config/all-config";

export function oneSignalProviders() {
  return new Promise((resolve, reject) => {
    try {
      // Init OneSignal Platform
      OneSignal.init({
        appId: AllAppConfig.APP_ID_ONESIGNAL,
      }).then((result: any) => {
        // console.log("OneSignal init succefully");

        OneSignal.isPushNotificationsEnabled((result: boolean) => {
          if (result) {
            OneSignal.getUserId((userId: string | null | undefined) => {
              resolve(userId);
            });
          } else {
            // alert('Please check your setting browser and accept notif');
            reject(result);
          }
        });
      });
    } catch (e) {
      console.error("Exception ", e);
    }
  });
}
