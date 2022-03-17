import React, { createContext, useContext, useReducer } from "react";

const SampleContext = createContext({} as SampleContextType);

export interface SampleContextType extends SampleState {
  dispatch: React.Dispatch<Action>;
}

export interface SampleState {
  isLoading: boolean;
  backgroundColor: string;
}

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
    }
  }

  const [{ isLoading, backgroundColor }, dispatch] = useReducer(reducer, initialState);

  return (
    <SampleContext.Provider value={{ isLoading, backgroundColor, dispatch } as SampleContextType}>
      {children}
    </SampleContext.Provider>
  );
};

const withSample = <P extends SampleContextType>(Child: React.ComponentType<P>): React.FunctionComponent<P> => (props) => (
  <SampleContext.Consumer>
    {(context) => <Child {...props} {...context} />}
  </SampleContext.Consumer>
);

export { SampleContextProvider, withSample };
export const useSampleContext = () => useContext(SampleContext);

// usage:

// **** HOOK (WARNING! you can only use inside of nested components with Provider rendered. Use below HoC or Classic Way once for the parent component)
// const {age, name} = useSample();

// **** HoC
// withSample(({age, name}) => (<div></div>))

// **** Classic way
// ReactDOM.render(
//   <CalendarContextProvider>
//       <App />
//   </CalendarContextProvider>,
// document.getElementById("root")
// );
