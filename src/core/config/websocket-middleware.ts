import SockJS from "sockjs-client";

import Stomp, { Client } from "webstomp-client";
import { Observable } from "rxjs";
import { StorageService } from "../../shared/services/storage.service";
import { AllAppConfig } from "./all-config";
import { ACTION_TYPES as WS_ACTIONS } from "../../main-features/user/store/reducers/websocket.reducer";
import { IUser } from "../../shared/model/user.model";
import {
  addNewConnectedUser,
  fetchListConnectedUsersWS,
  removeDisconnectedUser,
} from "../../main-features/user/store/slice";

let stompClient: any = null;

let subscriber: any = null;
let connection: Promise<any>;
let connectedPromise: any = null;
let listener: Observable<any>;
let listenerObserver: any;
let alreadyConnectedOnce = false;

const createConnection = (): Promise<any> =>
  new Promise((resolve, reject) => (connectedPromise = resolve));

const createListener = (): Observable<any> =>
  new Observable((observer) => {
    listenerObserver = observer;
  });

export const sendActivity = (page: string) => {
  connection?.then(() => {
    stompClient?.send(
      "/topic/activity", // destination
      JSON.stringify({ page }), // body
      {} // header
    );
  });
};

export const sendConnectedNewUser = (currentUser: IUser) => {
  connection?.then(() => {
    stompClient?.send(
      "/topic/user.connectedUser", // destination
      JSON.stringify({
        userEmail: currentUser.email,
      }), // body
      {} // header
    );
  });
};

/**
 *
 */
const subscribeConnectedUsers = () => {
  connection.then(() => {
    subscriber = stompClient.subscribe("/topic/connected-user", (data: any) => {
      listenerObserver.next(JSON.parse(data.body));
    });
  });
};

/**
 *
 */
const subscribeDisConnectedUsers = () => {
  connection.then(() => {
    subscriber = stompClient.subscribe(
      "/topic/disconnected-user",
      (data: any) => {
        listenerObserver.next(JSON.parse(data.body));
      }
    );
  });
};

/**
 *
 * @returns {any}
 */
export const getStompClient = (): Client => {
  return stompClient;
};

const connect = (currentUser: IUser) => {
  // console.log("sendConnectedNewUser ", currentUser);

  if (connectedPromise !== null || alreadyConnectedOnce) {
    // the connection is already being established
    return;
  }
  connection = createConnection();
  listener = createListener();

  // building absolute path so that websocket doesn't fail when deploying with a context path
  const loc = window.location;
  const baseHref = document
    .querySelector("base")
    ?.getAttribute("href")
    ?.replace(/\/$/, "");

  const authToken =
    StorageService.local.get(AllAppConfig.NAME_TOKEN_CURRENT_USER) ||
    StorageService.session.get(AllAppConfig.NAME_TOKEN_CURRENT_USER);
  const headers = {};
  // let url = '//' + loc.host + baseHref + '/websocket/tracker';
  let url = AllAppConfig.BASE_URL_BE + "websocket/tracker";
  if (authToken) {
    url += "?access_token=" + authToken;
  }
  const socket = new SockJS(url);
  stompClient = Stomp.over(socket, { protocols: ["v12.stomp"] });

  if (process.env.NODE_ENV === "production") {
    stompClient.debug = () => {
      return;
    };
  }

  stompClient.connect(headers, () => {
    connectedPromise("success");
    connectedPromise = null;
    // sendActivity(window.location.pathname);
    alreadyConnectedOnce = true;

    sendConnectedNewUser(currentUser);
  });
};

const disconnect = () => {
  if (stompClient !== null) {
    if (stompClient.connected) {
      stompClient.disconnect();
    }
    stompClient = null;
  }
  alreadyConnectedOnce = false;
};

const receive = () => listener;

const unsubscribe = () => {
  if (subscriber !== null) {
    subscriber.unsubscribe();
  }
  listener = createListener();
};

export default (store: any) => (next: any) => (action: any) => {
  // console.log('action.type ', action.type);
  if (action.type === WS_ACTIONS.CONNECTED_WEBSOCKET) {
    connect(store.getState().user?.session?.currentUser);
    subscribeConnectedUsers();
    subscribeDisConnectedUsers();

    connection.then(
      (result) => {
        if (result === "success") {
          // console.log('connection success');
          store.dispatch(fetchListConnectedUsersWS({}));
          // store.dispatch(getWebsocketListConnectedUsers());
        }
      },
      (error) => {
        console.log("connection error ", error);
      }
    );

    receive().subscribe((activity) => {
      // console.log('receive activity ', activity);
      if (activity.nameModule === "ConnectedUser") {
        // console.log('addNewConnectedUser ', activity.userEmail);
        return store.dispatch(
          addNewConnectedUser({
            email: activity.userEmail,
          })
        );
      } else if (activity.nameModule === "DisconnectedUser") {
        // console.log('removeDisconnectedUser ', activity.userEmail);
        return store.dispatch(
          removeDisconnectedUser({
            email: activity.userEmail,
          })
        );
      }
    });
    //

    // subscribe();
    // const isAdmin = action.payload.data.authorities.includes('ROLE_ADMIN');
    // if (!alreadyConnectedOnce && isAdmin) {
    //     subscribe();
    //     receive().subscribe(activity => {
    //         return store.dispatch({
    //             type: ADMIN_ACTIONS.WEBSOCKET_ACTIVITY_MESSAGE,
    //             payload: activity,
    //         });
    //     });
    // }
  } else if (action.type === WS_ACTIONS.DISCONNECTED_WEBSOCKET) {
    unsubscribe();
    disconnect();
  }
  return next(action);
};
