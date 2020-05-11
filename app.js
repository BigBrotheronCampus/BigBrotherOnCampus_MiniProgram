//app.js
App({
  globalData: {
    /*
    info: {
      account: "",
      id: "",
      phone: "",
      pwd: "",
      name: "",
      photo: "",
      gender: "",
      age: "",
      school: "",
      area: "",
      is_community: "",
      checkIn: "",
      trueName: ""
    }*/
  },

  onLaunch: function() {
    var that = this;

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);

    // 加载本地缓存信息
    that.globalData.info = wx.getStorageSync("information")

  }
})