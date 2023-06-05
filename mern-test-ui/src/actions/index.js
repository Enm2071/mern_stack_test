import actionTypes from "./actionTypes";

const addToCart = payload => ({
  type: actionTypes.ADD_TO_CART,
  payload,
});

const removeFromCart = payload => ({
  type: actionTypes.REMOVE_FROM_CART,
  payload,
});

const filterProducts = payload => ({
  type: actionTypes.FILTER_PRODUCTS,
  payload,
});

const fetchProducts = payload => ({
  type: actionTypes.FETCH_PRODUCTS,
  payload,
})

const fetchProductsSuccess = payload => ({
  type: actionTypes.FETCH_PRODUCTS_SUCCESS,
  payload,
})

const fetchProductsFailure = payload => ({
  type: actionTypes.FETCH_PRODUCTS_FAILURE,
  payload,
})

const signUp = payload => ({
  type: actionTypes.SIGN_UP,
  payload,
})

const signUpSuccess = payload => ({
  type: actionTypes.SIGN_UP_SUCCESS,
  payload,
})

const signUpFailure = payload => ({
  type: actionTypes.SIGN_UP_FAILURE,
  payload,
})

const signIn = payload => ({
  type: actionTypes.SIGN_IN,
  payload,
})

const signInSuccess = payload => ({
  type: actionTypes.SIGN_IN_SUCCESS,
  payload,
})

const signInFailure = payload => ({
  type: actionTypes.SIGN_IN_FAILURE,
  payload,
})

export default {
  addToCart,
  removeFromCart,
  filterProducts,
  fetchProducts,
  fetchProductsSuccess,
  fetchProductsFailure,
  signUp,
  signUpSuccess,
  signUpFailure,
  signInFailure,
  signIn,
  signInSuccess,
};
