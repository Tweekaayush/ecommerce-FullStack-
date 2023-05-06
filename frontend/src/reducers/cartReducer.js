import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_BILLING_INFO,
} from "../constants/cartConstants";

export const cartReducer = (state = {cartItems: [], billingInfo:{}}, action) =>{
    switch(action.type){
        case ADD_TO_CART:
            const item = action.payload

            const doesItemExist = state.cartItems.find((i) =>i.product ===item.product)

            if(doesItemExist){
                return {
                    ...state,
                    cartItems: state.cartItems
                }
            }else{
                return{
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            } 

            case REMOVE_CART_ITEM:
                return{
                    ...state,
                    cartItems: state.cartItems.filter((i)=>i.product !== action.payload)
                }

            case SAVE_BILLING_INFO:
                return{
                    ...state,
                    billingInfo: action.payload
                }
            default:
                return state
    }   
}