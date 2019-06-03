import { observable } from "mobx";
import { createContext } from "react";

class Store {
    @observable color = "#007bff";

    changeColor = () => {
        if(this.color == "#007bff")
            this.color = "#28a745"
        else
            this.color = "#007bff"
    }
}

export default createContext(new Store())