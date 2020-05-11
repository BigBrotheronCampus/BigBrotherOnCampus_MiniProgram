// pages/books/books.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    val: "", // 搜索值
    uid:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that=this;
    that.setData({
      uid:wx.getStorageSync('information').id
    })
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
    let that = this;
    let value = e.detail.value;
    let url = {
      data: "https://tzl.cyyself.name/plans/search?search=" + value
    }
    wx.navigateTo({
      url: '../moreResult/moreBooks/moreBooks?type=search&url=' + encodeURIComponent(JSON.stringify(url)) + '&val=' + value,
    })
  },

  /**
   * 单击功能栏跳转事件
   */
  onTapFunctionBar: function(e) {
    let targetID = e.currentTarget.id;
    let that=this;
    switch (targetID) {
      case "recentlyView":
      {
          let url = {
            data: "https://tzl.cyyself.name/plans/allHistory?uid="+ that.data.uid
          }
          wx.navigateTo({
            url: '../moreResult/moreBooks/moreBooks?type=recentlyView&url=' + encodeURIComponent(JSON.stringify(url)),
          })
          break;
      }
      case "favorites":
      {
          let url = {
            data: "https://tzl.cyyself.name/plans/allCollection?uid=" + that.data.uid
          }
          wx.navigateTo({
            url: '../moreResult/moreBooks/moreBooks?type=favorites&url=' + encodeURIComponent(JSON.stringify(url)),
          })
          break;
      }
      case "cloudfile":
        {
          let url = {
            data: "https://tzl.cyyself.name/plans/myPlans?uid=" + that.data.uid
          }
          wx.navigateTo({
            url: '../moreResult/moreBooks/moreBooks?type=cloudfile&url=' + encodeURIComponent(JSON.stringify(url)),
          })
          break;
        }
      case "practice":
      case "art":
      case "sport":
      case "volunteer":
        {
          wx.navigateTo({
            url: './bookList/bookList?type=' + targetID,
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