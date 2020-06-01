// pages/moreResult/moreBooks/moreBooks.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerBar: [{
        type: 'search',
        text: "搜索策划"
      },
      {
        type: 'recentlyView',
        text: "最近浏览"
      },
      {
        type: 'favorites',
        text: "收藏夹"
      },
      {
        type: 'cloudfile',
        text: "云文件"
      },
      {
        type: 'home',
        text: '精品策划'
      }
    ],
    url: "",
    index: 0,
    type: ["全部", "实践", "文艺", "体育", "公益"],
    typeIndex: 0,
    typeBool: 1,
    value: "" // 搜索框初始值
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
    if (options.type == "search") {
      that.setData({
        value: options.val
      })
    }
    //console.log(that.data.url);
    that.getBooks();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    let that = this;
    that.getBooks();
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
   * 点击搜索
   */
  search: function(e) {
    let that = this;
    that.setData({
      url: "https://tzl.cyyself.name/plans/search?search=" + e.detail.value
    })
    that.getBooks();
  },

  /**
   * 返回精品策划界面
   */
  returnBooks: function() {
    let that = this;
    wx.switchTab({
      url: '/pages/books/books'
    })
  },

  /*
   * 顶部导航栏切换
   */
  navbarTap: function(e) {
    let that = this;
    if (e.currentTarget.dataset.index == 0) {
      that.setData({
        typeIndex: e.currentTarget.dataset.index,
        typeBool: 1,
      })
    } else {
      that.setData({
        typeIndex: e.currentTarget.dataset.index,
        typeBool: 0,
      })
    }
  },


  /**
   * 获取全部的策划信息
   */
  getBooks: function() {
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
            books: res.data.data.plans
          })
        } else {
          wx.showToast({
            title: '获取策划信息失败,请重试！',
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
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../../books/bookDetails/bookDetails?id=' + id,
    })
  }
})