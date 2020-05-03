// pages/books/books.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    val: "" // 搜索值
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * 跳转到搜索结果界面
   */
  search: function(e) {
    var that = this;
    var value = e.detail.value;
    wx.navigateTo({
      url: '../moreResult/moreBooks/moreBooks?val=' + value,
    })
  },

  /**
   * 单击功能栏跳转事件
   */
  onTapFunctionBar: function(e) {
    var targetID = e.currentTarget.id;
    switch (targetID) {
      case "recentlyview":
      case "favorites":
      case "cloudfile":
        {
          wx.navigateTo({
            url: '../moreResult/moreBooks/moreBooks?val=' + targetID,
          })
          break;
        }
      case "practice":
      case "art":
      case "sport":
      case "volunteer":
        {
          wx.navigateTo({
            url: './bookList/bookList?val=' + targetID,
          })
          break;
        }
      case "upBook":
        {
          wx.navigateTo({
            url: './upBook/upBook',
          })
          break;
        }
      default:
        break;
    }
  }
})