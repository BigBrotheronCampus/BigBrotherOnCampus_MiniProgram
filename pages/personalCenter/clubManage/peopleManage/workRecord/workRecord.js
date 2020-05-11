// pages/personalCenter/clubManage/peopleManage/workRecord/workRecord.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    multiIndex: [50, 0],
    mulArray: [
      [],
      []
    ],
    period: ["第一期", "第二期", "第三期", "第四期", "第五期", "第六期", "第七期", "第八期", "第九期", "第十期", "第十一期", "第十二期", "第十三期", "第十四期", "第十五期", "第十六期", "第十七期", "第十八期", "第十九期", "第二十期"],
    periodIndex: 0,
    content: "",
    uid: "",
    cid: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    let arr = [];
    for (let i = 0; i < 300; i++) {
      arr[i] = (i + 1970) + '-' + (i + 1971);
    }
    // 初始化数据
    that.setData({
      multiArray: [arr, ["第一学期", "第二学期"]],
      uid: wx.getStorageSync('information').id,
      cid: options.cid
    })
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
   * 选择器控制
   */
  // 单列
  bindPickerChange: function(e) {
    this.setData({
      periodIndex: e.detail.value
    })
  },

  // 多列
  bindMultiPickerChange: function(e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },

  /**
   * 输入工作内容
   */
  inputContent: function(e) {
    this.setData({
      content: e.detail.value
    })
  },


  /**
   * 上传工作记录
   */
  uploadRecord: function() {
    let that=this;
    let pIndex = that.data.periodIndex;
    let mIndex = that.data.multiIndex;
    let mArray = that.data.multiArray;
    wx.request({
      url: 'https://tzl.cyyself.name/examScores/addWorkRecord',
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      data: {
        'uid': that.data.uid,
        'cid': that.data.cid,
        'semester': mArray[0][mIndex[0]] + "学年" + mArray[1][mIndex[1]],
        'period': that.data.period[pIndex],
        'event': that.data.content
      },
      success: function(res) {
        if (res.data.code == 0) {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 1000,
          })
          setTimeout(function() {
            wx.navigateBack({     //返回上一页面或多级页面
              delta: 1
            })
          }, 1000);
        } else {
          wx.showToast({
            title: '提交失败',
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
  }

})