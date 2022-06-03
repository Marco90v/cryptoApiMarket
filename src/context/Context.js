import { createContext, useReducer } from "react";

const API_KEY = '331263036c1b8350c514c4c8fc53b0c8135d6084';

const userContext = createContext();

const initialState = {
    API_KEY,
    range:"1d",
    data:[]
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'newData':
            return { ...state , data: action.rest };
        default:
            return state;
    }
}

const Context = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return(
        <userContext.Provider value={ { state , dispatch } } >
            {children}
        </userContext.Provider>
    );
}

export { Context , userContext }