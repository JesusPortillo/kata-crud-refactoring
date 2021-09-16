import React, {useReducer} from "react";
import { initialState } from "../Store/Store";
import { Store } from "../Store/Store";
import reducer from "../Reducer/reducer";

function StoreProvider({ children }){
    const [state, dispatch] = useReducer(reducer, initialState);
  
    return <Store.Provider value={{ state, dispatch }}>
      {children}
    </Store.Provider>
  
} export default StoreProvider;