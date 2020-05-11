// pages/personalCenter/clubManage/workRoom/clubIntro/clubIntro.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cid:"",
    avatarPath:"",
    name:"",
    time:"",
    intro:"x",
    president:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    that.setData({
      cid:options.cid
    })
    that.getClubIntro();
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
   * 获取社团信息
   */
  getClubIntro:function(){
    let that=this;
    wx.request({
      url: 'https://tzl.cyyself.name/communities/getCommunity?id=' + that.data.cid,
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        if (res.data.code == 0) {
          console.log(res);
          that.setData({
            avatarPath: res.data.data.community.photo,
            name:res.data.data.community.name,
            time: res.data.data.community.time,
            intro: res.data.data.community.introduction,
            president: res.data.data.community.president
          })
        } else {
          wx.showToast({
            title: '获取社团信息失败',
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
  }
})