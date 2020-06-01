// pages/moreResult/moreActivity/moreActivity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerBar: [{
        type: 'volunteer',
        text: '志愿活动'
      },
      {
        type: 'sport',
        text: '文体活动'
      },
      {
        type: 'competition',
        text: '科研竞赛'
      },
      {
        type: 'lecture',
        text: '校园讲座'
      },
      {
        type: 'search',
        text: '活动发布'
      }
    ],
    index: "",
    url: "",
    activities: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    let url = JSON.parse(decodeURIComponent(options.url));
    for (let x = 0; x < 5; x++) {
      if (that.data.headerBar[x].type == options.type) {
        that.setData({
          index: x,
          url: url.data
        })
      }
    }
    that.getActivities();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    let that=this;
    that.getActivities();
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
   * 获取相关活动发布信息
   */
  getActivities() {
    let that = this;
    wx.request({
      url: that.data.url,
      method: 'get',
      header: {
        "Content-Type": 'application/json'
      },
      success: function(res) {
        //console.log(res);
        if (res.data.code == 0) {
          that.setData({
            activities: res.data.data.activities
          })
        } else {
          wx.showToast({
            title: '搜索相关活动发布信息失败,请重试！',
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
   * 点击查看详情
   */
  seeDetails: function(e) {
    // 将详细信息传给详情界面
    let that = this;
    let item = e.currentTarget.dataset.item;
    let tap = 0;
    let oid = item.aid;
    //console.log(item);
    wx.navigateTo({
      url: '../../details/details?currentTap=' + tap + '&oid=' + oid,
    })
  }
})