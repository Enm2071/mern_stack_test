import actionTypes from "../actions/actionTypes";

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      const itemExist = state.cart.find(item => item.id === action.payload.id);
      if (itemExist) {
        return {
          ...state,
          cart: state.cart.map(item => item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item),
          totalItems: state.totalItems + 1,
        };
      }

      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
        totalItems: state.totalItems + 1,
      }
    case actionTypes.REMOVE_FROM_CART:
      const checkItem = state.cart.find(item => item.id === action.payload.id);
      if (checkItem.quantity === 1) {
        return {
          ...state,
          cart: state.cart.filter(item => item.id !== action.payload.id),
          totalItems: state.totalItems - 1,
        }
      }

      return {
        ...state,
        cart: state.cart.map(item => item.id === action.payload.id ? { ...item, quantity: item.quantity - 1 } : item),
        totalItems: state.totalItems - 1,
      }
    case actionTypes.FILTER_PRODUCTS:
      const filteredProducts = state.products
        .filter(product => {
          return product.title?.toLowerCase().includes(action.payload?.toLowerCase()) ||
            product.category?.toLowerCase().includes(action.payload?.toLowerCase()) ||
            product.price?.toLowerCase().includes(action.payload?.toLowerCase())
        });
      return {
        ...state,
        filteredProducts: filteredProducts,
      }
    case actionTypes.FETCH_PRODUCTS:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
        filteredProducts: action.payload,
      };
    case actionTypes.FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.SIGN_UP:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case actionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.SIGN_IN:
      return {
        ...state,
        loading: true,
      }
    case actionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      }
    case actionTypes.SIGN_IN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case actionTypes.LOG_OUT:
      return {
        ...state,
        user: null,
        products: [],
        filteredProducts: [],
        cart: [],
        totalItems: 0,
        orders: [],
        filteredOrders: [],
        error: null,
        loading: false,
      }
    case actionTypes.ADD_ORDER:
      return {
        ...state,
        loading: true,
      }
    case actionTypes.ADD_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: [...state.orders, action.payload],
        cart: [],
        totalItems: 0,
      }
    case actionTypes.ADD_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case actionTypes.FETCH_ORDERS:
      return {
        ...state,
        loading: true,
      }
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
        filteredOrders: action.payload,
      }
    case actionTypes.FETCH_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state;
  }
};

export default reducer;
