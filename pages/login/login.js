// pages/login/login.js

// 账号15181655581 123456

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    pwd: ""
  },

  inputAccount: function (e) {
    this.setData({
      phone: e.detail.value
    });
  },

  inputPwd: function (e) {
    this.setData({
      pwd: e.detail.value
    });
  },

  login: function () {
    wx.request({
      url: 'http://47.94.166.123:2333/users/log',
      method: 'post',
      data: {
        phone: this.data.phone,
        pwd: this.data.pwd
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        if (res.data.code == -1) {
          wx.showToast({
            title: '账号或密码错误',
            icon: 'loading',
            duration: 1000
          })
        }
        else if (res.data.code == 0) {
          wx.setStorageSync("information", res.data.data)
          wx.switchTab({
            url: '../home/home'
          })
        }
      },
      fail: function () {
        wx.showToast({
          title: '未连接到服务器',
          icon: 'loading',
          duration: 1000
        })
      }
    })
  },
  toRegister: function () {
    wx.navigateTo({
      url: '../register/register',
    })
  }

})
