// pages/personalCenter/clubManage/workRoom/honorRecord/honorRecord.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    records: [],
    cid:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that=this;
    that.setData({
      cid: options.cid
    })
    that.getRecords();
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
    let that=this;
    that.getRecords();
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
      url: './submitRecord/submitRecord?cid='+this.data.cid,
    })
  },

  /**
   * 获取所有荣誉记录
   */
  getRecords:function(){
    let that=this;
    wx.request({
      url: 'https://tzl.cyyself.name/honorRecord/getAll?cid=' + that.data.cid,
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        if (res.data.code == 0) {
          console.log(res);
          that.setData({
            records: res.data.data.honorRecords
          })
        } else {
          wx.showToast({
            title: '获取荣誉记录失败',
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