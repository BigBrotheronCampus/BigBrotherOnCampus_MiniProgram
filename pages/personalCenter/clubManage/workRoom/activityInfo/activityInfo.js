// pages/personalCenter/clubManage/workRoom/activityInfo/activityInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    records: [{
        "time": "2020年",
        "name": "赢在重大"
      },
      {
        "time": "2020年",
        "name": "赢在重大"
      },
      {
        "time": "2020年",
        "name": "赢在重大"
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
  add: function() {
    wx.navigateTo({
      url: './submitInfo/submitInfo',
    })
  },

  /**
   * 单击进入查看详情界面
   */
  onTapFunctionBar:function(e){
    var time;
    var name;
    wx.navigateTo({
      url: './submitInfo/submitInfo'+'?time='+time+'&name'+name,
    })
  }

})