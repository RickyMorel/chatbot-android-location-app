class GlobalVars {
    static instance = null;
  
    constructor() {
      if (GlobalVars.instance) {
        return GlobalVars.instance;
      }
      this.globalData = {
        user: undefined,
        isLoading: false
      };
      GlobalVars.instance = this;
    }

    setUser = (newUser) => {
        this.globalData.user = newUser
    }
  
    getUser() {
      return this.globalData.user;
    }
    
    setIsLoading = (isLoading) => {
      this.globalData.isLoading = isLoading
    }

    getIsLoading() {
      return this.globalData.isLoading;
    }
  }
  
  const globalVars = new GlobalVars();
  export default globalVars;
  