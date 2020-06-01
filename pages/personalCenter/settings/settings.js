// pages/personalCenter/systemSettings/systemSettings.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
   * 功能栏点击跳转
   */
  onTapFunctionBar: function(e) {
    var targetID = e.currentTarget.id;
    if (targetID == "updatePwd") {
      wx.navigateTo({
        url: '../../login/findPassword/findPassword',
      })
    } else if (targetID == "aboutUs") {
      wx.navigateTo({
        url: './aboutUs/aboutUs',
      })
    }
  }
})