// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userAvatarPath: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    that.setData({
      userAvatarPath: wx.getStorageSync('information').photo
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
   * 单击功能栏跳转事件
   */
  onTapFunctionBar: function(e) { // 待完善
    var targetID = e.currentTarget.id;
    switch (targetID) {
      case "sign":
      case "teachers":
      case "recommend":
      case "news":
        {
          wx.showToast({
            title: '暂不支持此功能',
            icon: 'loading',
            duration: 1500
          })
          break;
        }
      case "volunteer":
        {
          let url = {
            data: "https://tzl.cyyself.name/activities/getActivities?type=" + "志愿活动"
          }
          wx.navigateTo({
            url: '../moreResult/moreActivity/moreActivity?type=' + targetID + '&url=' + encodeURIComponent(JSON.stringify(url)),
          })
          break;
        }
      case "sport":
        {
          let url = {
            data: "https://tzl.cyyself.name/activities/getActivities?type=" + "文体活动"
          }
          wx.navigateTo({
            url: '../moreResult/moreActivity/moreActivity?type=' + targetID + '&url=' + encodeURIComponent(JSON.stringify(url)),
          })
          break;
        }
      case "competition":
        {
          let url = {
            data: "https://tzl.cyyself.name/activities/getActivities?type=" + "科研竞赛"
          }
          wx.navigateTo({
            url: '../moreResult/moreActivity/moreActivity?type=' + targetID + '&url=' + encodeURIComponent(JSON.stringify(url)),
          })
          break;
        }
      case "lecture":
        {
          let url = {
            data: "https://tzl.cyyself.name/activities/getActivities?type=" + "校园讲座"
          }
          wx.navigateTo({
            url: '../moreResult/moreActivity/moreActivity?type=' + targetID + '&url=' + encodeURIComponent(JSON.stringify(url)),
          })
          break;
        }
      case "books":
        {
          let url = {
            data: "https://tzl.cyyself.name/plans/allPlans"
          }
          wx.navigateTo({
            url: '../moreResult/moreBooks/moreBooks?type=home&url=' + encodeURIComponent(JSON.stringify(url)),
          })
          break;
        }
      case "recruit":
        {
          let url = {
            data: "https://tzl.cyyself.name/findTeammates/allPost"
          }
          wx.navigateTo({
            url: '../moreResult/moreRecruit/moreRecruit?url=' + encodeURIComponent(JSON.stringify(url)),
          })
        }
      default:
        break;
    }
  },

  /**
   * 跳转发布界面
   */
  toPublish:function(){
    wx.switchTab({
      url: '../publish/publish',
    })
  }
})