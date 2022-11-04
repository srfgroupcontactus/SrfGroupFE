/**
 * Init Google Analytics with ts
 * @returns {Promise<boolean>}
 */
import { AllAppConfig } from "../../core/config/all-config";

export function loadScriptGoogleAnalytics(): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    try {
      const existingScript = document.getElementById("googleAnalytics");
      if (!existingScript) {
        // register google tag manager
        const gTagManagerScript = document.createElement("script");
        gTagManagerScript.async = true;
        gTagManagerScript.src = `https://www.googletagmanager.com/gtag/js?id=${AllAppConfig.GOOGLE_ANALYTICS_MEASUREMENT_ID}`;
        gTagManagerScript.id = "googleAnalytics";
        document.head.appendChild(gTagManagerScript);

        // register google analytics
        const gaScript = document.createElement("script");
        gaScript.innerHTML = `
                  window.dataLayer = window.dataLayer || [];
                  function gtag() { dataLayer.push(arguments); }
                  gtag('js', new Date());
                  gtag('config', '${AllAppConfig.GOOGLE_ANALYTICS_MEASUREMENT_ID}');
                `;
        document.head.appendChild(gaScript);
        gTagManagerScript.onload = () => {
          resolve(true);
        };
      }
      if (existingScript) resolve(true);
    } catch (e) {
      reject(false);
    }
  });
}

// export function initGoogleAnalytics(): Promise<any> {
//     return new Promise<boolean>((resolve, reject) => {
//         try {
//             gtag('js', new Date());
//             gtag('config', AllAppConfig.GOOGLE_ANALYTICS_MEASUREMENT_ID);
//             resolve(true);
//         }catch (e) {
//             reject(e);
//         }
//     })
// }

export function trackPagesGA(title: string, path: string): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    try {
      // Add track page Google Analytics
      gtag("config", AllAppConfig.GOOGLE_ANALYTICS_MEASUREMENT_ID, {
        page_title: title,
        page_path: path,
      });
      resolve(true);
    } catch (e) {
      reject(e);
    }
  });
}

export function addEventGA(
  eventName: string,
  eventCategory: string,
  eventLabel: string
): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    try {
      console.log("Add new event Google Analytics");
      // Add new event Google Analytics
      gtag("event", eventName, {
        event_category: eventCategory,
        event_label: eventLabel,
      });
      resolve(true);
    } catch (e) {
      reject(false);
    }
  });
}

/**
 * Name of module: EventOffer, EventUser
 * Add sub module (ShowMoreOption) with eventName, eventCategory, eventLabel
 * @type {{EventOffer: {ShowMoreOption: {}}; EventUser: {}}}
 */
export const AllModulesEventGA = {
  EventOffer: {
    ShareOffer: {
      eventName: "SharedOffer",
      eventCategory: "Offer",
      eventLabel: "Shared this offer",
    },
    ShowMoreOption: {
      eventName: "ShowMoreOptionAddUpdateOffer",
      eventCategory: "Offer",
      eventLabel: "Show more options for Add/Update offer",
    },
    AddCommentOffer: {
      eventName: "AddCommentOffer",
      eventCategory: "Offer",
      eventLabel: "Add new comment",
    },
    UpdateCommentOffer: {
      eventName: "UpdateCommentOffer",
      eventCategory: "Offer",
      eventLabel: "Add new comment",
    },
  },
  EventUser: {
    Profile: {
      eventName: "SharedProfile",
      eventCategory: "User",
      eventLabel: "Shared this profile",
    },
  },
};
