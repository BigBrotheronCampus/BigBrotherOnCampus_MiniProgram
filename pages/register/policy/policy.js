// pages/register/policy/policy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    policy: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.getPolicy();
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

  /**
   * 获取协议
   */
  getPolicy() {
    var that = this;
    wx.request({
      url: 'https://tzl.cyyself.name/file/protocol',
      method: 'get',
      header: {
        "Content-Type": 'application/json'
      },
      success: function(res) {
        that.setData({
          policy: res.data
        })
      },
      fail: function(err) {
        console.log(err);
        wx.showToast({
          title: '未连接到服务器',
          icon: 'none',
          duration: 1500
        })
      }
    })
  },
})