// pages/books/bookList/bookList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navBar: [{
        type: "practice",
        text: "实践"
      },
      {
        type: "art",
        text: "文艺"
      },
      {
        type: "sport",
        text: "体育"
      },
      {
        type: "volunteer",
        text: "公益"
      }
    ],
    index: 0,
    books: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    for (let x = 0; x < 4; x++) {
      if (that.data.navBar[x].type == options.type) {
        that.setData({
          index: x
        })
      }
    }
    that.getBooks();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.getBooks();
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
   * 获取相应类型的策划
   */
  getBooks: function() {
    let that = this;
    let index = that.data.index;
    wx.request({
      url: 'https://tzl.cyyself.name/plans/all?theme=' + that.data.navBar[index].text,
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
      url: '../bookDetails/bookDetails?id=' + id,
    })
  }
})