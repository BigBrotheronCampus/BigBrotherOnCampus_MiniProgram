// pages/personalCenter/myFansFollows/myFansFollows.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userID: "",
    people: [],
    navBar:[
      {
        type:"myFollows",
        url: 'https://tzl.cyyself.name/users/myFollowers?uid=',
        text:"我的关注"
      },
      {
        type: "myFans",
        url: 'https://tzl.cyyself.name/users/myFans?uid=',
        text: "我的粉丝"
      }
    ],
    index:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 初始化数据
    that.setData({
      userID: wx.getStorageSync('information').id
    })
    if(options.type=="myFans"){
      that.setData({
        index: 1
      })
    }
    that.getPeople();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this;
    that.getPeople();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 获取所有关注对象
   */
  getPeople() {
    var that = this;
    var index=that.data.index;
    wx.request({
      url: that.data.navBar[index].url + that.data.userID,
      method: 'get',
      header: {
        "Content-Type": 'application/json'
      },
      success: function (res) {
        console.log(res);
        if (res.data.code == 0) {
          that.setData({
            people: res.data.data
          })
        } else {
          wx.showToast({
            title: '获取关注信息失败,请重试！',
            icon: 'none',
            duration: 1500
          })
        }
      },
      fail: function (err) {
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
  onTapFollowsBar: function (event) {
    var id = event.currentTarget.dataset.uid;
    wx.navigateTo({
      url: '/pages/othersInfo/othersInfo?uid=' + id,
    })
  }
})