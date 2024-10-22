class GlobalVars {
  static instance = null;

  constructor() {
    if (GlobalVars.instance) {
      return GlobalVars.instance;
    }
    this.globalData = {
      user: undefined,
      isLoading: false,
    };
    this.subscribers = []; // Store subscribers
    GlobalVars.instance = this;
  }

  setUser = (newUser) => {
    this.globalData.user = newUser;
  };

  getUser() {
    return this.globalData.user;
  }

  setIsLoading = (isLoading) => {
    this.globalData.isLoading = isLoading;
    this.notifySubscribers(); // Notify all subscribers on change
  };

  getIsLoading() {
    return this.globalData.isLoading;
  }

  subscribe(callback) {
    this.subscribers.push(callback);
  }

  unsubscribe(callback) {
    this.subscribers = this.subscribers.filter((cb) => cb !== callback);
  }

  notifySubscribers() {
    this.subscribers.forEach((callback) => callback(this.globalData.isLoading));
  }
}

const globalVars = new GlobalVars();
export default globalVars;
