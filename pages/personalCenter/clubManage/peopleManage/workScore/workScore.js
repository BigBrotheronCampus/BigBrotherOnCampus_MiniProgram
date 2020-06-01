// pages/personalCenter/clubManage/peopleManage/workScore/workScore.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    multiIndex: [49, 1],
    mulArray: [
      [],
      []
    ],
    period: ["第一期", "第二期", "第三期", "第四期", "第五期", "第六期", "第七期", "第八期", "第九期", "第十期", "第十一期", "第十二期", "第十三期", "第十四期", "第十五期", "第十六期", "第十七期", "第十八期", "第十九期", "第二十期"],
    periodIndex: 0,
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
      cid: options.id
    })
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
   * 进入评分界面
   */
  toScore: function() {
    let that = this;
    let pIndex = that.data.periodIndex;
    let mIndex = that.data.multiIndex;
    let mArray = that.data.multiArray;
    wx.navigateTo({
      url: './scoreIndex/scoreIndex?cid=' + that.data.cid + '&term=' + mArray[0][mIndex[0]] + "学年" + mArray[1][mIndex[1]] + '&period=' + that.data.period[pIndex],
    })
  }
})