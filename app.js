//app.js
const api = require('./API/request');   // 路径索引大小写敏感

App({
  globalData: {
    info: {
      account: "",
      id: "",
      phone: "",
      pwd: "",
      name: "",
      photo: "https://tzl.cyyself.name:8080/photo/default.jpg",
      gender: "",
      age: "",
      school: "",
      area: "",
      is_community: "",
      checkIn: "",
      trueName: ""
    },
    api
  },

  onLaunch: function() {
    var that = this;

    // 展示本地存储能力
    //var logs = wx.getStorageSync('logs') || []
    //logs.unshift(Date.now())
    //wx.setStorageSync('logs', logs);
  }
})