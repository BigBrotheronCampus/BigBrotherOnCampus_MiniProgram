// pages/personalCenter/myPost/myPost.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navBar: [{
        type: 'myActivity',
        url: [{
            type: 'activity',
            url: 'https://tzl.cyyself.name/activities/myActivity'
          },
          {
            type: 'recruit',
            url: 'https://tzl.cyyself.name/findTeammates/myPosts'
          },
          {
            type: 'moment',
            url: 'https://tzl.cyyself.name/moments/userMoments'
          }
        ],
        text: "个人动态"
      },
      {
        type: 'myHistory',
        url: [{
            type: 'activity',
            url: 'https://tzl.cyyself.name/activities/history'
          },
          {
            type: 'recruit',
            url: 'https://tzl.cyyself.name/findTeammates/history'
          },
          {
            type: 'moment',
            url: 'https://tzl.cyyself.name/moments/history'
          }
        ],
        text: "浏览历史"
      },
      {
        type: 'myFavorite',
        url: [{
            type: 'activity',
            url: 'https://tzl.cyyself.name/activities/collection'
          },
          {
            type: 'recruit',
            url: 'https://tzl.cyyself.name/findTeammates/collection'
          },
          {
            type: 'moment',
            url: 'https://tzl.cyyself.name/moments/collection'
          }
        ],
        text: "我的收藏"
      }
    ],
    index: 0, // 选择“我的动态”，“浏览历史”，“我的收藏”
    activities: [],
    recruits: [],
    moments: [],
    uid: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var x;
    for (x = 0; x < 3; x++) {
      if (that.data.navBar[x].type == options.type) {
        that.setData({
          index: x
        })
      }
    }
    that.setData({
      uid: wx.getStorageSync('information').id
    })
    that.getActivities();
    that.getRecruits();
    that.getMoments();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    var that = this;
    that.getActivities();
    that.getRecruits();
    that.getMoments();
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
   * 获取所有活动发布信息
   */
  getActivities() {
    var that = this;
    var index = that.data.index;
    wx.request({
      url: that.data.navBar[index].url[0].url + '?uid=' + that.data.uid,
      method: 'get',
      header: {
        "Content-Type": 'application/json'
      },
      success: function(res) {
        //console.log(res.data.data.activities);
        if (res.data.code == 0) {
          that.setData({
            activities: res.data.data.activities
          })
        } else {
          wx.showToast({
            title: '获取活动发布信息失败,请重试！',
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
   * 获取所有队友招募信息
   */
  getRecruits() {
    var that = this;
    var index = that.data.index;
    wx.request({
      url: that.data.navBar[index].url[1].url + '?uid=' + that.data.uid,
      method: 'get',
      header: {
        "Content-Type": 'application/json'
      },
      success: function(res) {
        //console.log(res.data.data.posts);
        if (res.data.code == 0) {
          that.setData({
            recruits: res.data.data.posts
          })
        } else {
          wx.showToast({
            title: '获取队友招募信息失败,请重试！',
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
   * 获取所有精彩瞬间信息
   */
  getMoments() {
    var that = this;
    var index = that.data.index;
    wx.request({
      url: that.data.navBar[index].url[2].url + '?uid=' + that.data.uid,
      method: 'get',
      header: {
        "Content-Type": 'application/json'
      },
      success: function(res) {
        //console.log(res.data.data.moments);
        if (res.data.code == 0) {
          that.setData({
            moments: res.data.data.moments
          })
        } else {
          wx.showToast({
            title: '获取精彩瞬间信息失败,请重试！',
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
   * 获取更多结果
   */
  getMoreResult: function(e) {
    // 将详细信息传给详情界面
    var that = this;
    var id = e.currentTarget.id;
    var index = that.data.index;
    // url传值
    switch (id) {
      case "moreActivity":
        {
          let url = {
            data: that.data.navBar[index].url[0].url + '?uid=' + that.data.uid
          }
          wx.navigateTo({
            url: "../../moreResult/moreActivity/moreActivity?&url=" + encodeURIComponent(JSON.stringify(url)) + '&type=search',
          })
          break;
        }
      case "moreRecruit":
        {
          let url = {
            data: that.data.navBar[index].url[1].url + '?uid=' + that.data.uid
          }
          wx.navigateTo({
            url: "../../moreResult/moreRecruit/moreRecruit?&url=" + encodeURIComponent(JSON.stringify(url)),
          })
          break;
        }
      case "moreMoment":
        {
          let url = {
            data: that.data.navBar[index].url[2].url + '?uid=' + that.data.uid
          }
          wx.navigateTo({
            url: "../../moreResult/moreMoment/moreMoment?&url=" + encodeURIComponent(JSON.stringify(url)),
          })
          break;
        }
      default:
        break;
    }
  },



  /**
   * 点击查看详情
   */
  seeDetails: function(e) {
    // 将详细信息传给详情界面
    var that = this;
    var item = e.currentTarget.dataset.item;
    var id = e.currentTarget.id;
    //console.log(item);
    if (id == 'activities') {
      wx.navigateTo({
        url: '../../details/details?currentTap=' + 0 + '&oid=' + item.aid,
      })
    } else if (id == 'recruits') {
      wx.navigateTo({
        url: '../../details/details?currentTap=' + 1 + '&oid=' + item.tid,
      })
    } else if (id == 'moments') {
      wx.navigateTo({
        url: '../../details/details?currentTap=' + 2 + '&oid=' + item.mid,
      })
    }
  }
})