import React, { createContext, PropsWithChildren, useContext, useReducer } from "react";

const SampleContext = createContext({} as SampleContextType);

interface IMutableState {
  isLoading: boolean;
  backgroundColor: string;
}

type SampleContextType = [IMutableState, Action]

interface IActionUpdate<K extends keyof IMutableState> {
  type: K | "changeColor";
  payload?: IMutableState[K];
}

type Action = <K extends keyof IMutableState>(action: IActionUpdate<K>) => void

function getColorCode() {
  var makeColorCode = '0123456789ABCDEF';
  var code = '#';
  for (var count = 0; count < 6; count++) {
    code = code + makeColorCode[Math.floor(Math.random() * 16)];
  }
  return code;
}


const SampleContextProvider = ({ children }: PropsWithChildren<{}>) => {
  // u can use MobX, useState, useReducer here. Whatever suits your needs. Just put it in value of Provider.

  const initialState: IMutableState = { isLoading: false, backgroundColor: "#000" };

  const reducer = <K extends keyof IMutableState>(state: IMutableState, action: IActionUpdate<K>) => {
    switch (action.type) {
      case 'isLoading':
        return { ...state, isLoading: action.payload };
      case 'backgroundColor':
        return { ...state, backgroundColor: action.payload }
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

