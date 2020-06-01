// pages/ground/searchResult/searchResult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    val: "",
    people: [], // 检索的相关用户
    activities: [], // 检索的活动发布
    recruits: [], // 检索的队友招募
    moments: [], // 检索的精彩瞬间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;

    // 父组件选中子组件以便调用子组件函数，#searchBar代表的是component组件id名称
    that.searchBar = that.selectComponent("#searchBar");

    /**
     * 调用子组件函数
     */ 
    // 改变搜索框初始值
    that.searchBar.changeVal(options.val);

    //console.log(options.val);

    // 改变左侧icon
    that.searchBar.changeIcon();


    // 设置搜索初始值
    that.setData({
      val: options.val
    })


    that.getPeople();
    that.getActivities();
    that.getRecruits();
    that.getMoments();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    var that = this;
    that.getPeople();
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
   * 获取相关用户信息
   */
  getPeople() {
    var that = this;
    wx.request({
      url: 'https://tzl.cyyself.name/users/search?search=' + that.data.val,
      method: 'get',
      header: {
        "Content-Type": 'application/json'
      },
      success: function(res) {
        //console.log(res);
        if (res.data.code == 0) {
          that.setData({
            people: res.data.data
          })
        } else {
          wx.showToast({
            title: '搜索相关用户信息失败,请重试！',
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
   * 获取相关活动发布信息
   */
  getActivities() {
    var that = this;
    wx.request({
      url: 'https://tzl.cyyself.name/activities/search?search=' + that.data.val,
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
   * 获取相关队友招募信息
   */
  getRecruits() {
    var that = this;
    wx.request({
      url: 'https://tzl.cyyself.name/findTeammates/search?search=' + that.data.val,
      method: 'get',
      header: {
        "Content-Type": 'application/json'
      },
      success: function(res) {
        //console.log(res);
        if (res.data.code == 0) {
          that.setData({
            recruits: res.data.data.posts
          })
        } else {
          wx.showToast({
            title: '搜索相关队友招募信息失败,请重试！',
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
   * 获取相关精彩瞬间信息
   */
  getMoments() {
    var that = this;
    wx.request({
      url: 'https://tzl.cyyself.name/moments/search?search=' + that.data.val,
      method: 'get',
      header: {
        "Content-Type": 'application/json'
      },
      success: function(res) {
        //console.log(res);
        if (res.data.code == 0) {
          that.setData({
            moments: res.data.data.moments
          })
        } else {
          wx.showToast({
            title: '搜索相关精彩瞬间信息失败,请重试！',
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
    var that = this;
    var id = e.currentTarget.id;
    // url传值
    switch (id) {
      case "morePeople":
        {
          // 传递url必须使用json格式
          let url = {
            data: 'https://tzl.cyyself.name/users/search?search=' + that.data.val
          }
          wx.navigateTo({
            url: "../../moreResult/morePeople/morePeople?&url=" + encodeURIComponent(JSON.stringify(url)),
          })
          break;
        }
      case "moreActivity":
        {
          let url = {
            data: 'https://tzl.cyyself.name/activities/search?search=' + that.data.val
          }
          wx.navigateTo({
            url: "../../moreResult/moreActivity/moreActivity?&url=" + encodeURIComponent(JSON.stringify(url))+'&type=search',
          })
          break;
        }
      case "moreRecruit":
        {
          let url = {
            data: 'https://tzl.cyyself.name/findTeammates/search?search=' + that.data.val
          }
          wx.navigateTo({
            url: "../../moreResult/moreRecruit/moreRecruit?&url=" + encodeURIComponent(JSON.stringify(url)),
          })
          break;
        }
      case "moreMoment":
        {
          let url = {
            data: 'https://tzl.cyyself.name/moments/search?search=' + that.data.val
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
    var id = e.currentTarget.id;
    var item = e.currentTarget.dataset.item;
    //console.log(item);
    if (id == 'people') {
      wx.navigateTo({
        url: '../../othersInfo/othersInfo?uid=' + item.id,
      })
    } else if (id == 'activities') {
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