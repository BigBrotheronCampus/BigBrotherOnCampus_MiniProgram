// pages/personalCenter/myFollows/myFollows.js
const app = getApp(); // 获取全局数据

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userID: app.globalData.info.id,
    follows: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  // 获取关注信息列表
    var that = this;
    wx.request({
      url: 'https://tzl.cyyself.name:2333/users/myFollowers', 
      data: {
        'uid': that.data.userID,
      }, //传参
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "GET",
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            follows:res.data.data
          })
        } else {
          wx.showToast({
            title: '获取关注信息失败,请重试',
            icon: 'none',
            duration: 1500
          })
        }
      },
      fail: function (err) {
        console.log(err);
        wx.showToast({
          title: '未连接到服务器',
          icon: 'none',
          duration: 1500
        })
      }
    })
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
   * 单击跳转至他人信息界面
   */
  onTapFollowsBar: function (event) {
    var id = event.currentTarget.dataset.fid;
    var path = event.currentTarget.dataset.path;
    console.log(path);
    wx.navigateTo({
      url: '/pages/othersInfo/othersInfo?type=userFollowsInfo&id=' + id,
      fail:function(err){
        console.log(err);
      }
    })
  }
})