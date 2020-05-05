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
    // 测试数据
    info: {
      account: "",
      age: 0,
      area: ['重庆市', '重庆市', '沙坪坝区'],
      checkIn: 0,
      country: "中国",
      gender: null,
      id: 5,
      name: "semicircle",
      phone: "18602368180",
      photo: "https://tangzl7.club:8080/photo/default.jpg",
      pwd: "",
      school: "重庆大学",
      trueName: "陈方大"
    }
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