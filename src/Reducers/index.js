import {actions} from '../Actions';

const initialState={
    accountDetails:{},
    errors:{},
}

export default function reducer(state=initialState,action){
    switch(action.type){
        case actions.LOAD_LOGIN_SUCCESS:
            return { ...state, accountDetails: action.payload };
        case actions.LOAD_LOGIN_FAIL:
            return { ...state, errors: action.payload };
        case actions.GET_PRODUCTS_DATA_SUCCESS:
            return { ...state, productsData: action.payload };
        case actions.GET_PRODUCTS_DATA_FAIL:
            return { ...state, productsDataErrors: action.payload };
        case actions.DELETE_CART_ITEM_SUCCESS:
            return { ...state, deleteCartItemData: action.payload };
        case actions.DELETE_CART_ITEM_FAIL:
            return { ...state, deleteCartItemDataErrors: action.payload };
        case actions.ADD_CART_ITEM_SUCCESS:
            return { ...state, addCartItemData: action.payload };
        case actions.ADD_CART_ITEM_FAIL:
            return { ...state, addCartItemDataErrors: action.payload };
        case actions.GET_CART_ITEM_SUCCESS:
            return { ...state, getCartItemData: action.payload };
        case actions.GET_CART_ITEM_FAIL:
            return { ...state, getCartItemDataErrors: action.payload };
        case actions.GET_USER_ADDRESS_SUCCESS:
            return { ...state, getUserAddressData: action.payload };
        case actions.GET_USER_ADDRESS_FAIL:
            return { ...state, getUserAddressDataErrors: action.payload };
        case actions.POST_USER_ADDRESS_SUCCESS:
            return { ...state, postUserAddressData: action.payload };
        case actions.POST_USER_ADDRESS_FAIL:
            return { ...state, postUserAddressDataErrors: action.payload };
        case actions.POST_USER_ORDER_SUCCESS:
            return { ...state, postUserOrderData: action.payload };
        case actions.POST_USER_ORDER_FAIL:
            return { ...state, postUserOrderDataErrors: action.payload };
        default:
            return state;
    }
};