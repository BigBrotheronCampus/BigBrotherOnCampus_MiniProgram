// pages/personalCenter/OthersInfo/othersInfo.js
const follow = ["+ 关注", "取消关注"];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // ID指的是本人ID，userID指的是查看目标的ID
    ID: "",
    userID: "",
    info: "",
    followTxt: follow[0], // 初始化为未关注，显示“+ 关注”
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    // 初始化数据
    that.setData({
      ID: wx.getStorageSync('information').id,
      userID: options.uid
    })
    that.getInfo();
    that.checkShip();
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
   * 获取他人所有信息
   */
  getInfo() {
    var that = this;
    wx.request({
      url: 'https://tzl.cyyself.name/users/userInformation?uid=' + that.data.userID,
      method: 'get',
      header: {
        "Content-Type": 'application/json'
      },
      success: function(res) {
        console.log(res);
        if (res.data.code == 0) {
          that.setData({
            info: res.data.data
          })
          console.log(that.data.info);
        } else {
          wx.showToast({
            title: '获取用户信息失败,请重试！',
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
   * 验证是否关注
   */
  checkShip: function() {
    var that = this;
    wx.request({
      url: 'https://tzl.cyyself.name/users/checkFanFollower?fan=' + that.data.ID + '&follower=' + that.data.userID,
      method: 'get',
      header: {
        "Content-Type": 'application/json'
      },
      success: function(res) {
        // code为0，已关注，code为-1，，未关注
        if (res.data.code == 0) {
          that.setData({
            followTxt: follow[1]
          })
        } else if (res.data.code == -1) {
          that.setData({
            followTxt: follow[0]
          })
        } else {
          wx.showToast({
            title: '获取用户信息失败,请重试！',
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
   * 更新关注信息
   */
  onTapFollowBtn: function() {
    var that = this;
    var txt = that.data.followTxt;
    if (txt == follow[0]) {
      that.addFollow();
    } else {
      that.deleteFollow();
    }
  },

  /**
   * 增加关注
   */
  addFollow: function() {
    var that = this;
    wx.request({
      url: 'https://tzl.cyyself.name/users/addFanFollower?fan=' + that.data.ID + '&follower=' + that.data.userID,
      method: 'get',
      header: {
        "Content-Type": 'application/json'
      },
      success: function(res) {
        if (res.data.code == 0) {
          that.setData({
            followTxt: follow[1]
          })
        } else {
          wx.showToast({
            title: '关注失败,请重试！',
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
   * 取消关注
   */
  deleteFollow: function() {
    var that = this;
    wx.request({
      url: 'https://tzl.cyyself.name/users/deleteFanFollower?fan=' + that.data.ID + '&follower=' + that.data.userID,
      method: 'get',
      header: {
        "Content-Type": 'application/json'
      },
      success: function(res) {
        if (res.data.code == 0) {
          that.setData({
            followTxt: follow[0]
          })
        } else {
          wx.showToast({
            title: '取消关注失败,请重试！',
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