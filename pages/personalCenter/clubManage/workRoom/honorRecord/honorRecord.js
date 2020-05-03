// pages/personalCenter/clubManage/workRoom/honorRecord/honorRecord.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    records: [{
        "time": "2020年11月1日",
        "award": "最佳新人奖"
      },
      {
        "time": "2020年11月1日",
        "award": "最佳新人奖"
      },
      {
        "time": "2020年11月1日",
        "award": "最佳新人奖"
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * 单击进入添加记录界面
   */
  add:function(){
    wx.navigateTo({
      url: './submitRecord/submitRecord',
    })
  }
})