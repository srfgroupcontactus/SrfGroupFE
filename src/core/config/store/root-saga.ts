import { all, fork } from "redux-saga/effects";

import userSaga from "../../../main-features/user/store/saga";
import categorySaga from "../../../main-features/category/store/saga";
import addressSaga from "../../../main-features/address/store/saga";
import topHomeSlidesImagesSaga from "../../../main-features/home/store/saga";
import offerSaga from "../../../main-features/offer/store/saga";
import contactUsSaga from "../../../main-features/contact-us/store/saga";
import faqSaga from "../../../main-features/faq/store/saga";
import aboutUsSaga from "../../../main-features/aboutus/store/saga";
import notificationSaga from "../../../main-features/notification/store/saga";
import chatSaga from "../../../main-features/chat/store/saga";
import favoriteSaga from "../../../main-features/favorite/store/saga";
import cartSaga from "../../../main-features/cart/store/saga";
import problemeDeclarationSaga from "../../../main-features/probleme-declaration/store/saga";
import newsLetterSaga from "../../../shared/layout/footer/store/saga";
import rentRequestSaga from "../../../main-features/rent-request/store/saga";
export default function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(categorySaga),
    fork(addressSaga),
    fork(topHomeSlidesImagesSaga),
    fork(offerSaga),
    fork(contactUsSaga),
    fork(faqSaga),
    fork(aboutUsSaga),
    fork(notificationSaga),
    fork(chatSaga),
    fork(favoriteSaga),
    fork(cartSaga),
    fork(problemeDeclarationSaga),
    fork(newsLetterSaga),
    fork(rentRequestSaga)
  ]);
}
