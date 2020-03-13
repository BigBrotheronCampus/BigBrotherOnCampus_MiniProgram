// pages/personalCenter/personalInfo/userSex/userSex.js
const app = getApp(); // 获取全局数据

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userID: app.globalData.id,
    sex: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.title == "女") {
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
            var inValue;
            if (option == "female") inValue = "女";
            else inValue = "男";
            wx.request({
              url: 'http://47.94.45.122:88/infoUpdate.php',
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              method: "POST",
              data: {
                userID: that.data.userID,
                infotype: "userSex",
                targetinfo: inValue
              },
              success: function(res) {
                if (res.data == true) {
                  if (option == "female") {
                    that.setData({
                      sex: 0,
                    })
                  } else {
                    that.setData({
                      sex: 1,
                    })
                  }
                  wx.showToast({
                    title: '提交成功！',
                    icon: 'success',
                    duration: 1000
                  });
                } else {
                  wx.showToast({
                    title: "提交失败，后台将尽快为您解决！",
                    icon: "none",
                    duration: 2000
                  })
                }
              },
              fail: function(err) {
                console.log(err);
                wx.showToast({
                  title: "提交失败，后台将尽快为您解决！",
                  icon: "none",
                  duration: 2000
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