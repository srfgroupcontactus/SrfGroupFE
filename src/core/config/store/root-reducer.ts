import { combineReducers } from "redux";
import { userSlice } from "../../../main-features/user/store/slice";
import { categorySlice } from "../../../main-features/category/store/slice";
import { addressSlice } from "../../../main-features/address/store/slice";
import { homeSlice } from "../../../main-features/home/store/slice";
import { offerSlice } from "../../../main-features/offer/store/slice";
import { contactUsSlice } from "../../../main-features/contact-us/store/slice";
import { faqSlice } from "../../../main-features/faq/store/slice";
import { aboutUsSlice } from "../../../main-features/aboutus/store/slice";
import { notificationSlice } from "../../../main-features/notification/store/slice";
import { chatSlice } from "../../../main-features/chat/store/slice";
import { favoriteSlice } from "../../../main-features/favorite/store/slice";
import { cartSlice } from "../../../main-features/cart/store/slice";
import { problemeDeclarationSlice } from "../../../main-features/probleme-declaration/store/slice";
import {rentRequestSlice} from '../../../main-features/rent-request/store/slice';
import { newsLetterSlice } from "../../../shared/layout/footer/store/slice";
import { commonSlice } from "./common/slice";

const rootReducer = combineReducers({
  user: userSlice.reducer,
  category: categorySlice.reducer,
  address: addressSlice.reducer,
  home: homeSlice.reducer,
  offer: offerSlice.reducer,
  contactus: contactUsSlice.reducer,
  faq: faqSlice.reducer,
  aboutus: aboutUsSlice.reducer,
  notification: notificationSlice.reducer,
  chat: chatSlice.reducer,
  favorite: favoriteSlice.reducer,
  cart: cartSlice.reducer,
  problemeDeclaration: problemeDeclarationSlice.reducer,
  newsLetter: newsLetterSlice.reducer,
  common: commonSlice.reducer,
  rentRequest: rentRequestSlice.reducer
});

export default rootReducer;
