// pages/moreResult/morePeople/morePeople.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: "",
    people: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var url = JSON.parse(decodeURIComponent(options.url));
    that.setData({
      url: url.data,
    })
    that.getPeople();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    let that=this;
    that.getPeople();
  },

  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function () {
    return {
      title: 'CQU校园大哥大',
      path: '/pages/home/home',
      imageUrl: '/icons/eye.png'
    }
  },

  /**
   * 获取相关用户对象
   */
  getPeople() {
    var that = this;
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
              people: res.data.data
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
   * 单击跳转至他人信息界面
   */
  onTapFansBar: function(event) {
    var id = event.currentTarget.dataset.item.id;
    wx.navigateTo({
      url: '/pages/othersInfo/othersInfo?uid=' + id,
    })
  }
})