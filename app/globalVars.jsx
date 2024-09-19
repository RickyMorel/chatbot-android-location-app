class GlobalVars {
    static instance = null;
  
    constructor() {
      if (GlobalVars.instance) {
        return GlobalVars.instance;
      }
      this.globalData = {
        user: undefined
      };
      GlobalVars.instance = this;
    }

    setUser = (newUser) => {
        this.globalData.user = newUser
    }
  
    getUser() {
      return this.globalData.user;
    }
  }
  
  const globalVars = new GlobalVars();
  export default globalVars;
  