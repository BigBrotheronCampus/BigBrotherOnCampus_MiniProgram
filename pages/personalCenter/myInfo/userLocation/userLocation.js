// pages/personalCenter/personalInfo/userLocation/userLocation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userID: '',
    region: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    that.setData({
      userID: wx.getStorageSync('information').id,
      region: wx.getStorageSync('information').area
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
   * 地区选择器
   */
  bindRegionChange: function(e) {
    let that = this;
    wx.request({
      url: 'https://tzl.cyyself.name/users/updateInfo',
      header: {
        "Content-Type": "application/json"
      },
      method: "POST",
      data: {
        'id': that.data.userID,
        'area': e.detail.value.join('|'), // 上传数据，转换为字符串数据
      },
      success: function(res) {
        if (res.data.code == 0) {
          console.log(res.data.data);
          // 修改本地缓存信息，每次更新app.globalData都需修改
          let info = wx.getStorageSync('information');
          info.area = e.detail.value;
          wx.setStorageSync("information", info);
          wx.showToast({
            title: '信息修改成功！',
            icon: 'success',
            duration: 1000
          });
          that.setData({
            region: e.detail.value
          })
          setTimeout(function() {
            wx.navigateBack({ //返回上一页面或多级页面
              delta: 1
            })
          }, 1000);
        } else {
          wx.showToast({
            title: "信息修改失败，请重试！",
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
})