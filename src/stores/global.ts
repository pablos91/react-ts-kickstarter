import { observable } from "mobx";

class GlobalStore {
    @observable color = "#007bff";

    changeColor = () => {
        switch(this.color) {
            case "#007bff":
                this.color = "#28a745";
                break;
            default:
                this.color = "#007bff";
                break;
        }
    }
}

const global = new GlobalStore();
export default global;