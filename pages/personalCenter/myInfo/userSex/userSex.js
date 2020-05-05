// pages/personalCenter/personalInfo/userSex/userSex.js
var app = getApp(); // 获取全局数据

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userID: app.globalData.info.id,
    gender:app.globalData.info.gender,
    sex: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (this.data.gender == "女") {
      this.setData({
        sex: 0,
      })
    } else {
      this.setData({
        sex: 1,
      })
    }
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
   * 单击性别栏事件
   */
  onTapSexBar: function(event) {
    var that = this;
    var option = event.currentTarget.id;
    var s = that.data.sex;
    if ((option == "female" && s == 1) || (option == "male" && s == 0)) {
      wx.showModal({
        title: '提示',
        content: '确定是否修改',
        success: function(res) {
          if (res.confirm) { // 用户确定修改
            var inValue=null;
            if (option == "female") inValue = "女";
            else inValue = "男";
            wx.request({
              url: 'https://tangzl7.club:2333/users/updateInfo',
              header: {
                "Content-Type": "application/json"
              },
              method: "POST",
              data: {
                'id': that.data.userID,
                'gender': inValue
              },
              success: function(res) {
                if (res.data.code == 0) {
                  if (option == "female") {
                    that.setData({
                      sex: 0,
                    })
                  } else {
                    that.setData({
                      sex: 1,
                    })
                  }
                  app.globalData.info.gender = inValue;
                  wx.setStorageSync("information", app.globalData.info);
                  wx.showToast({
                    title: '信息修改成功！',
                    icon: 'success',
                    duration: 1000
                  });
                  that.setData({
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
          } else { //用户取消修改

          }
        }
      })
    }
  }
})