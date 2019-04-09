import * as React from 'react';

const defaults = {
    color: "red",
    changeColor: () => { }
}

export const GlobalContext = React.createContext(defaults);

export const GlobalProvider = ({ children }: any) => {

    const [global, setGlobal] = React.useState(defaults);

    React.useEffect(() => {
        console.log("mounted");
    }, []);

    const value = {
        color: global.color,
        changeColor: () => {
            console.log("color");
            const color = global.color;
            const newColor = color == "red" ? "blue" : "red";

            setGlobal({
                ...global,
                color: newColor
            })
        }
    };

    return (<GlobalContext.Provider value= { value } > { children } </GlobalContext.Provider>);
}