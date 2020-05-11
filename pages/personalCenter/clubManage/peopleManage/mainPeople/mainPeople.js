// pages/personalCenter/clubManage/peopleManage/mainPeople/mainPeople.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teacher: "",
    president: "",
    vicePresident: "",
    members: [],
    cid: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 初始化数据
    let that = this;
    that.setData({
      cid: options.cid
    })
    that.getMembers();
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
    let that = this;
    that.getMembers();
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
   * 点击编辑跳转到添加成员界面
   */
  edit: function() {
    wx.navigateTo({
      url: './addMember/addMember?cid=' + that.data.cid,
    })
  },

  /**
   * 获取全部成员信息
   */
  getMembers: function() {
    let that = this;
    wx.request({
      url: 'https://tzl.cyyself.name/communities/communityMember?id=' + that.data.cid,
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function(res) {
        if (res.data.code == 0) {
          if (res.data.teacher == "" || res.data.teacher == null) {
            that.setData({
              teacher: "暂无",
            })
          } else {
            that.setData({
              teacher: res.data.teacher,
            })
          }
          that.setData({
            president: res.data.data.president,
            vicePresident: res.data.data.vice_president,
            members: res.data.data.members
          })
        } else {
          wx.showToast({
            title: '获取社团成员信息失败',
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