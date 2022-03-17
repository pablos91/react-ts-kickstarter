import React, { createContext, useContext, useReducer } from "react";

const SampleContext = createContext({} as SampleContextType);

interface SampleState {
  isLoading: boolean;
  backgroundColor: string;
}

type SampleContextType = [SampleState, React.Dispatch<Action>]

interface Action {
  type: "loading" | "loaded" | "changeColor";
  payload?: any;
}

function getColorCode() {
  var makeColorCode = '0123456789ABCDEF';
  var code = '#';
  for (var count = 0; count < 6; count++) {
    code = code + makeColorCode[Math.floor(Math.random() * 16)];
  }
  return code;
}

/// https://github.com/Microsoft/TypeScript/issues/6471
const SampleContextProvider = ({ children }: { children?: any }) => {
  // u can use MobX, useState, useReducer here. Whatever suits your needs. Just put it in value of Provider.

  const initialState: SampleState = { isLoading: false, backgroundColor: "#000" };

  function reducer(state: SampleState, action: Action) {
    switch (action.type) {
      case 'loading':
        return { ...state, isLoading: true };
      case 'loaded':
        return { ...state, isLoading: false };
      case 'changeColor':
        return { ...state, backgroundColor: getColorCode() };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SampleContext.Provider value={[state, dispatch] as SampleContextType}>
      {children}
    </SampleContext.Provider>
  );
};


const useSampleContext = () => useContext(SampleContext);
export { SampleContextProvider, useSampleContext };

