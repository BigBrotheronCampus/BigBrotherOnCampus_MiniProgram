// pages/personalCenter/clubManage/peopleManage/peopleManage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid: "",
    cid: "",
    boolManager: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      cid: options.cid,
      uid: wx.getStorageSync('information').id
    })
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
   * 单击功能栏跳转事件
   */
  onTapFunctionBar: function(e) {
    var targetID = e.currentTarget.id;
    wx.navigateTo({
      url: './' + targetID + '/' + targetID + '?cid=' + this.data.cid,
    })
  },

  /**
   * 检验是否是管理者
   * 判定是否可以进行考核评分
   */
  checkManager: function() {
    let that = this;
    wx.request({
      url: 'https://tzl.cyyself.name/communities/checkManager',
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      data: {
        'cid': that.data.cid,
        'uid': that.data.uid
      },
      success: function(res) {
        //console.log(res);
        if (res.data.code == 0) {
          if (res.data.data == 1 || res.data.data == 2) {
            that.setData({
              boolManager: true
            })
          }
        } else {
          wx.showToast({
            title: '获取社团身份失败',
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
  }
})