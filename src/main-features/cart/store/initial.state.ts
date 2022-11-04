export const initialState = {
  cart: {
    loading: false,
    entity: {},
    loadingEntities: false,
    entities: [],
    addSuccess: false,
    updateSuccess: false,
    deleteSuccess: false,
    errorMessage: null,
    totalItems: -1,
    totalPages: 0,
    activePage: -1,
  },
  order: {
    loading: false,
    entity: {},
    loadingEntities: false,
    entities: [],
    addSuccess: false,
    updateSuccess: false,
    deleteSuccess: false,
    errorMessage: null,
    totalItems: -1,
    totalPages: 0,
    activePage: -1,
  }
};
