// every property of this class will be available between react routing navigation (usage: store.property). Refreshing page clears global store so if you want to keep something (like auth) in session use LocalStorage or SessionStorage or Cookies.

export class Store {
    constructor() {}
}
  
const store = new Store();

export default store