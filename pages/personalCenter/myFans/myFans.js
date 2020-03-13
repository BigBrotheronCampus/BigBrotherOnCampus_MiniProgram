// pages/personalCenter/myFans/myFans.js
const app = getApp(); // 获取全局数据

Page({
  /**
   * 页面的初始数据
   */
  data: {
    blankHeight: 0,
    userID: app.globalData.id,
    fans:[]
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
    // 获取粉丝信息列表
    var that = this;
    wx.request({
      url: 'http://47.94.45.122:88/fans_followsQuery.php', //此处不能用https，需勾选不校验合法域名，上线需使用https协议
      data: {
        userID: that.data.userID,
        tableName: "userFansInfo"
      }, //传参
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      success: function (res) {
        var result = res.data;
        if (result == false) {
          wx.showToast({
            title: '粉丝信息获取失败，后台尽快为您解决',
            icon: 'none',
            duration: 1500
          })
        }
        else {
          that.setData({
            fans: result //设置数据，将表中查询出来的信息传给fans列表
          })
        }
      },
      fail: function (err) {
        var checkNetWork = require("../../../function/checkNet.js");
        if (checkNetWork.checkNetStatu() == false) console.log("无网络");
        else {
          console.log(err),
            wx.showToast({
              title: "关注信息获取失败，后台将尽快为您解决！",
              icon: "none",
              duration: 2000
            })
        }
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
  onTapFansBar:function(event){
    var id = event.currentTarget.dataset.fid;
    var boolFollow = event.currentTarget.dataset.boolFollow;
    console.log(id);
    wx.navigateTo({
      url: '../othersInfo/othersInfo?type=userFansInfo&id=' + id + "&booFollow=" + boolFollow + "&path=" + path,
      fail: function (err) {
        console.log(err);
      }
    })
  }
})