// pages/personalCenter/clubManage/communityManagement.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cid: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      cid: options.cid
    })
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
   * 单击功能栏跳转事件
   */
  onTapFunctionBar: function(e) {
    var targetID = e.currentTarget.id;
    wx.navigateTo({
      url: './' + targetID + '/' + targetID + '?cid=' + this.data.cid,
    })
  }
})