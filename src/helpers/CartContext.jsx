/*import React from "react";

export const CartContext = React.createContext();

export default function CartContextProvider(props) {
  const [cart, setCart] = React.useState({ rows: [] });

  const find = (id) => {
    return cart.rows.filter((item) => {
      return item.id === id;
    });
  };

  const addProduct = (id) => {
    const result = find(id);
    const count = result.length;
    if (result.length > 0) {
      setCart({
        rows: cart.rows.map((el) =>
          el.id === id ? Object.assign({}, el, { count }) : el
        ),
      });
    } else {
      setCart((prevState) => {
        return {
          rows: [...prevState.rows, { id: id, count: 0 }],
        };
      });
    }
    console.log(cart);
  };

  React.useEffect(() => {}, []);

  return (
    <CartContext.Provider value={{ cart: cart, setCart: setCart, addProduct }}>
      {props.children}
    </CartContext.Provider>
  );
}
*/

import React, { createContext, useReducer } from "react";
import { CartReducer, sumItems } from "helpers/CartReducer";

export const CartContext = createContext();

const storage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];
const initialState = {
  cartItems: storage,
  ...sumItems(storage),
  checkout: false,
};

const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);

  const increase = (payload) => {
    dispatch({ type: "INCREASE", payload });
  };

  const decrease = (payload) => {
    dispatch({ type: "DECREASE", payload });
  };

  const addProduct = (payload) => {
    dispatch({ type: "ADD_ITEM", payload });
  };

  const removeProduct = (payload) => {
    dispatch({ type: "REMOVE_ITEM", payload });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR" });
  };

  const handleCheckout = () => {
    console.log("CHECKOUT", state);
    dispatch({ type: "CHECKOUT" });
  };

  const addCoupon = (coupon) => {
    
  };

  const contextValues = {
    removeProduct,
    addProduct,
    increase,
    decrease,
    clearCart,
    handleCheckout,
    ...state,
  };

  return (
    <CartContext.Provider value={contextValues}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
