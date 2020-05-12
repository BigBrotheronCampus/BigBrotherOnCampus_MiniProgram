// pages/books/bookDetails/bookDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book:"",
    bid:"",
    uid:"",
    who:["仅自己能见","所有人可见"],
    bool:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    that.setData({
      bid:options.id,
      uid:wx.getStorageSync('information').id
    })
    that.getDetails();
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
   * 获取策划详情
   */
  getDetails:function(){
    let that = this;
    let uid = that.data.uid;
    let bid = that.data.bid;
    wx.request({
      url: 'https://tzl.cyyself.name/plans/plan?uid=' + uid +'&pid=' + bid,
      method: 'get',
      header: {
        "Content-Type": 'application/json'
      },
      success: function (res) {
        console.log(res);
        if (res.data.code == 0) {
          that.setData({
            book: res.data.data
          })
        } else {
          wx.showToast({
            title: '获取策划信息失败,返回上一界面请重试！',
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
   * 下载策划
   */
  downloadBook:function(){
    let that=this;
    let book=that.data.book;
    that.setData({
      bool:true
    })
  },

  /**
   * 收藏事件
   */
  collect: function (e) {
    let that = this;
    let tap = that.data.currentTap;
    let url;
    //console.log(tap);
    wx.showModal({
      title: '提示',
      content: '是否确定收藏',
      success: function (res) {
        if (res.confirm) {
          url ='https://tzl.cyyself.name/plans/addCollection?uid='+that.data.uid + '&pid=' + that.data.bid;
          wx.request({
            url: url,
            header: {
              'content-type': 'application/json'
            },
            method: "GET",
            success: function (res) {
              console.log(res);
              if (res.data.code == 0) {
                wx.showToast({
                  title: '添加收藏成功',
                  icon: 'success',
                  duration: 1000
                })
              } else {
                wx.showToast({
                  title: '添加收藏失败。请重试',
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
        } else {
          // 取消收藏
        }
      }
    })
  },
})