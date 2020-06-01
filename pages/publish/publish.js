// pages/publish/publish.js
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
  onShareAppMessage: function () {
    return {
      title: 'CQU校园大哥大',
      path: '/pages/home/home',
      imageUrl: '/icons/eye.png'
    }
  },

  /** 
   * 单击发布栏跳转事件
   */
  onTapPublishBar: function(event) {
    wx.navigateTo({
      url: "./" + event.currentTarget.id + "/" + event.currentTarget.id, // 依据id进行不同的跳转
      fail: function() {}
    })
  },
})