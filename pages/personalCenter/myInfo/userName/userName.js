// pages/personalCenter/personalInfo/userName/userName.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userID: "",
    userName: "",
    flag: false,
  },

  // 输入完成时通过接口上传到MySQL，并显示完成图标
  bindconfirm:function(event){
    var that = this;
    var inValue = event.detail.value;
    if (inValue.length == 0) {      // 昵称不能为空
      wx.showToast({
        title: '昵称不能为空',
        icon:'none',
        duration: 1500
      })
    }
    else{
      wx.request({
        url: 'https://tzl.cyyself.name:2333/users/updateInfo',
        header: {
          "Content-Type": "application/json"
        },
        method: "POST",
        data: {
          'id': that.data.userID,
          'name': inValue,
        },
        success: function (res) {
          if (res.data.code == 0) {
            // 修改本地缓存信息，每次更新app.globalData都需修改
            let info = wx.getStorageSync('information');
            info.name = inValue;
            wx.setStorageSync("information", info);
            wx.showToast({
              title: '信息修改成功！',
              icon: 'success',
              duration: 1000
            });
            that.setData({
              userName:inValue,
              flag: true,
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
    let that = this;
    that.setData({
      userID: wx.getStorageSync('information').id,
      userName: wx.getStorageSync('information').name
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