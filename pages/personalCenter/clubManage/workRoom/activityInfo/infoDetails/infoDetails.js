// pages/personalCenter/clubManage/workRoom/activityInfo/infoDetails/infoDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    activityInfo: "",
    bool: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    that.setData({
      id: options.id
    })
    that.getDetails();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.getDetails();
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
   * 获取活动资料详情
   */
  getDetails: function() {
    let that = this;
    wx.request({
      url: 'https://tzl.cyyself.name/data/getDataById?id=' + that.data.id,
      method: 'get',
      header: {
        "Content-Type": 'application/json'
      },
      success: function(res) {
        //console.log(res);
        if (res.data.code == 0) {
          that.setData({
            activityInfo: res.data.data
          })
        } else {
          wx.showToast({
            title: '获取活动资料失败,请重试！',
            icon: 'none',
            duration: 1500
          })
        }
      },
      fail: function(err) {
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
   * 下载策划
   */
  downloadBook: function() {
    let that = this;
    if (that.data.activityInfo.plan == "") {
      wx.showToast({
        title: '本活动未上传策划',
        icon: 'none',
        duration: 1500
      })
    } else {
      that.setData({
        bool: true
      })
      wx.setClipboardData({
        data: that.data.activityInfo.plan,
        success: function() {
          // 添加下面的代码可以复写复制成功默认提示文本`内容已复制` 
          wx.showToast({
            title: '链接复制成功',
            icon: 'success',
            duration: 1000
          })
        }
      })
    }
  }
})