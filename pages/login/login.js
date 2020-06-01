// pages/login/login.js

var app = getApp(); // 全局信息

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    pwd: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    if (wx.getStorageSync('information') != null && wx.getStorageSync('information').id != "") {
      that.setData({
        phone: wx.getStorageSync('information').phone,
        pwd: wx.getStorageSync('information').pwd
      })
      that.login();
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.onLoad();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: 'CQU校园大哥大',
      path: '/pages/home/home',
      imageUrl: '/icons/eye.png'
    }
  },

  inputAccount: function(e) {
    this.setData({
      phone: e.detail.value
    });
  },

  inputPwd: function(e) {
    this.setData({
      pwd: e.detail.value
    });
  },

  login: function() {
    wx.request({
      url: 'https://tzl.cyyself.name/users/log',
      method: 'post',
      data: {
        phone: this.data.phone,
        pwd: this.data.pwd
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        //console.log(res);
        if (res.data.code == -1) {
          wx.showToast({
            title: '账号或密码错误',
            icon: 'loading',
            duration: 1000
          })
        } else if (res.data.code == 0) {
          let info = res.data.data;
          // 本地数据的area存数组，数据库里为字符串，上传和获取的时候需要转换成数组格式
          info.area = info.area.split('|');
          wx.setStorageSync("information", info);
          //console.log(res.data.data);
          wx.switchTab({
            url: '../home/home'
          })
          //console.log(app.globalData.info);
        } else {
          wx.showToast({
            title: '登陆失败，请重试！',
            icon: 'none',
            duration: 1500
          })
        }
      },
      fail: function() {
        wx.showToast({
          title: '未连接到服务器',
          icon: 'loading',
          duration: 1500
        })
      }
    })
  },

  /**
   * 注册界面
   */
  toRegister: function() {
    wx.navigateTo({
      url: '../register/register',
    })
  },

  /**
   * 找回密码界面
   */
  toFindPassword: function() {
    wx.navigateTo({
      url: './findPassword/findPassword',
    })
  },

  /**
   * 游客访问
   */
  touristVisit: function() {
    // 设置本地缓存信息
    wx.setStorageSync("information", app.globalData.info);
    wx.switchTab({
      url: '../home/home'
    })
  }
})