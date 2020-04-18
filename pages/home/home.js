// pages/home/home.js
const app = getApp();     // 获取全局数据

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userAvatarPath: "http://47.94.45.122:88/uploads/img_video/userAvatar/12139107.jpg",   // 有Bug，待调试
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 单击功能栏跳转事件
   */
  onTapFunctionBar:function(e){     // 待完善
    var targetID = e.currentTarget.id;
    switch(targetID)
    {
      case "sign":
      case "teachers":
      case "recommend":
      case "news":
      {
        wx.showToast({
          title: '暂不支持此功能',
          icon:'loading',
          duration:1500
        })
        break;
      }
      case "volunteer":
      {

      }
    }
  }
})