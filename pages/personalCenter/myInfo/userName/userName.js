// pages/personalCenter/personalInfo/userName/userName.js
const app = getApp();       // 获取全局数据

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userID:app.globalData.id,
    userName:"",
    flag:false,
  },

  // 输入完成时通过PHPH接口上传到MySQL，并显示完成图标
  bindconfirm:function(event){
    var that = this;
    var inValue = event.detail.value;
    console.log(inValue);           // 打印修改的值
    if (inValue.length == 0) {      // 昵称不能为空
      wx.showToast({
        title: '昵称不能为空',
        icon:'none',
        duration: 1000
      })
    }
    else{
      wx.request({
        url: 'http://47.94.45.122:88/infoUpdate.php',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
          },
        method: "POST",
        data: { 
          userID: that.data.userID,
          infotype:"userName",
          targetinfo:inValue
        },
        success: function (res) {
          if (res.data == true){
            wx.showToast({
              title: '提交成功！',
              icon: 'success',
              duration: 1000
            });
            that.setData({
              flag: true,
            })
          }
          else{
            wx.showToast({
              title: "提交失败，后台将尽快为您解决！",
              icon: "none",
              duration: 2000
            })
          }
        },
        fail:function(err){
          console.log(err);
          wx.showToast({
            title: "提交失败，后台将尽快为您解决！",
            icon: "none",
            duration: 2000
          })
        }

      })
    }
  },

  // 输入框聚焦时显示编辑图标
  bindfocus: function () {
    this.setData({
      flag: false,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userName: options.title
    })   
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

  }
})