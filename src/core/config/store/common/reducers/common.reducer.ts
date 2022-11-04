const reducer = {
  showUnauthorizedModal: (state: any) => {
    state.unauthorized.showUnauthorized = true;
  },
  hideUnauthorizedModal: (state: any) => {
    state.unauthorized.showUnauthorized = false;
  },
};
export default reducer;
