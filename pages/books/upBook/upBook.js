// pages/books/upBook/upBook.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    whoIndex: 0,
    typeIndex: 0,
    types: ['实践活动', '文艺活动', '体育活动', '公益活动'],
    who:['所有人可见','仅社团成员可见','仅自己可见']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
   * 选择策划类别
   */
  bindPickerChange:function(e){
    var targetID=e.currentTarget.id;
    var that=this;
    if(targetID=="type"){
      that.setData({
        typeIndex:e.detail.value
      })
    }
    else {
      that.setData({
        whoIndex: e.detail.value
      })
    }
  }
})