//app.js
App({
  globalData: {
    id: "",        //  用户ID，在登录之后确定不在改变
    avatarPath:""
  },

  onLaunch: function () {
    var that=this;

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    /*
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })*/

    // 获取用户ID
    that.globalData.id = 12139;

    // 加载头像
    wx.request({
      url: 'http://47.94.45.122:88/avatarQuery.php?userID=' + that.globalData.id, //此处不能用https，需勾选不校验合法域名，上线需使用https协议
      data: {}, //传参
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        that.globalData.avatarPath=res.data[0].userAvatarPath //设置数据，将表中查询出来的信息传给avatarPath
      },
      fail: function (err) {
        var checkNetWork = require("../../function/checkNet.js");
        if (checkNetWork.checkNetStatu() == false) console.log("无网络");
        else {
          console.log(err),
            wx.showToast({
              title: "个人信息获取失败，后台将尽快为您解决！",
              icon: "none",
              duration: 2000
            })
        }
      }
    })
  }
})