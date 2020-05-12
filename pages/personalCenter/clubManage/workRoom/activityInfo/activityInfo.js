// pages/personalCenter/clubManage/workRoom/activityInfo/activityInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    records: [],
    cid: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
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
    this.getRecords();
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
    let that = this;
    wx.navigateTo({
      url: './submitInfo/submitInfo?cid=' + that.data.cid,
    })
  },

  /**
   * 单击进入查看详情界面
   */
  onTapFunctionBar: function(e) {
    let item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: './infoDetails/infoDetails' + '?id=' + item.id,
    })
  },

  /**
   * 长按删除
   */
  delete: function(e) {
    let that = this;
    let item = e.currentTarget.dataset.item;
    wx.showModal({
      title: '提示',
      content: '是否确定删除活动资料',
      success: function(res) {
        if (res.confirm) {
          wx.request({
            url: 'https://tzl.cyyself.name/data/deleteData?id=' + item.id,
            header: {
              'content-type': 'application/json'
            },
            method: "GET",
            success: function(res) {
              if (res.data.code == 0) {
                console.log(res);
                wx.showToast({
                  title: '删除资料成功',
                  icon: 'success',
                  duration: 1000
                })
              } else {
                wx.showToast({
                  title: '删除活动资料失败',
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
        } else {
          // 用户取消删除
        }
      }
    })
  },

  /**
   * 获取所有荣誉记录
   */
  getRecords: function() {
    let that = this;
    wx.request({
      url: 'https://tzl.cyyself.name/data/getData?cid=' + that.data.cid,
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function(res) {
        if (res.data.code == 0) {
          console.log(res);
          that.setData({
            records: res.data.data.data
          })
        } else {
          wx.showToast({
            title: '获取活动记录失败',
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