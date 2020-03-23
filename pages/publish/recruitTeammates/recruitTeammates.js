// pages/publish/recruitTeammates/recruitTeammates.js
const app = getApp(); // 获取全局数据

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userID: app.globalData.id,
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
   * 单击按钮提交表单信息事件
   */
  recruitSubmit: function(event) {
    var that = this;
    // 检查表单信息是否完整
    console.log(event.detail.value);
    var formData = event.detail.value;
    if (formData.recruitName.length == 0 ||
      formData.recruitPhoneNum.length == 0 ||
      formData.recruitContent.length == 0) {
      wx.showToast({
        title: '请填写完整信息！',
        icon: 'loading',
        duration: 1500,
      })
    } else {
      // 上传表单信息
      wx.request({
        url: 'http://47.94.45.122:88/publishInfo.php',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: {
          tableName: "recruitInfo",
          userID: that.data.userID,
          recruitName: formData.recruitName,
          recruitPhoneNum: formData.recruitPhoneNum,
          recruitContent: formData.recruitContent,
        },
        success: function(res) {
          console.log(res.data);
          if (res.data==true) {
            wx.showToast({
              title: '提交成功！',
              icon: 'success',
              duration: 1500
            })
            wx.switchTab({
              url: '../../ground/ground',
            })
          } else {
            wx.showToast({
              title: "招募信息提交失败，后台将尽快为您解决！",
              icon: "none",
              duration: 1500
            })
            return
          }
        },
        fail: function(err) {
          console.log(err);
          wx.showToast({
            title: "网络连接错误，请重试！",
            icon: "none",
            duration: 1500
          })
          return
        }
      })
    }
  }
})