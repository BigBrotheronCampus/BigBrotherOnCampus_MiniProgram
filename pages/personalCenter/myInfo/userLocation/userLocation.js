// pages/personalCenter/personalInfo/userLocation/userLocation.js
var app = getApp();       // 获取全局数据

Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: app.globalData.info.area,
  },

  /**
   * 地区选择器
   */
  bindRegionChange: function (e) {
    wx.request({
      url: 'https://tzl.cyyself.name:2333/users/updateInfo',
      header: {
        "Content-Type": "application/json"
      },
      method: "POST",
      data: {
        'id': that.data.userID,
        'area': e.detail.value,
      },
      success: function (res) {
        if (res.data.code == 0) {
          console.log(res.data.data);
          app.globalData.info.area = e.detail.value;
          wx.setStorageSync("information", app.globalData.info);
          wx.showToast({
            title: '信息修改成功！',
            icon: 'success',
            duration: 1000
          });
          this.setData({
            region: e.detail.value
          })
        } else {
          wx.showToast({
            title: "信息修改失败，请重试！",
            icon: "none",
            duration: 1500
          })
        }
      },
      fail: function (err) {
        console.log(err);
        wx.showToast({
          title: "未连接到服务器！",
          icon: "none",
          duration: 1500
        })
      }
    })
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

  }

})