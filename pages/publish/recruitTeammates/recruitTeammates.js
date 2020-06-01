// pages/publish/recruitTeammates/recruitTeammates.js
var myDate = new Date(); //获取系统当前时间

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userID: "",
    time: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取当前日期
    var y = myDate.getFullYear(); //年份
    var m = myDate.getMonth() + 1; //月份
    var d = myDate.getDate(); //日期
    this.setData({
      time: y + "/" + m + "/" + d,
      userID: wx.getStorageSync('information').id
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.onLoad();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: 'CQU校园大哥大',
      path: '/pages/home/home',
      imageUrl: '/icons/eye.png'
    }
  },

  /**
   * 单击按钮提交表单信息事件
   */
  recruitSubmit: function(event) {
    var that = this;
    // 检查表单信息是否完整
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
        url: 'https://tzl.cyyself.name/findTeammates/add?uid=' + that.data.userID,
        header: {
          "Content-Type": "application/json"
        },
        method: "POST",
        data: {
          'name': formData.recruitName,
          'contact': formData.recruitPhoneNum,
          'content': formData.recruitContent,
          'time': that.data.time
        },
        success: function(res) {
          //console.log(res.data);
          if (res.data.code == 0) {
            wx.showToast({
              title: '提交成功！',
              icon: 'success',
              duration: 1000
            })
            setTimeout(function() {
              wx.switchTab({
                url: '../../ground/ground',
              })
            }, 1000);
          } else {
            wx.showToast({
              title: "招募信息提交失败，请重试！",
              icon: "none",
              duration: 1500
            })
          }
        },
        fail: function(err) {
          console.log(err);
          wx.showToast({
            title: "未连接到服务器！",
            icon: "none",
            duration: 1500
          })
        }
      })
    }
  }
})