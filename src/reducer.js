import { StateContext } from "./StateProvider";

export const initialState = {
  basket: [],
  user: null,
};
//Selector

export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);
//iterate through basket items and add there prices

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };
    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      //it will remove only the first one but if we write return where item.id=action.id it will remove all the items of th same type//
      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1); //cutting out that element through splice => it changes the array from index length to index-1 length
      } else {
        console.warn(
          `Cant remove the product (id: ${action.id}) as its not found`
        );
      }

      return {
        ...state,
        basket: newBasket,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

export default reducer;
