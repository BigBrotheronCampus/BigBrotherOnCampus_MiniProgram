// pages/books/upBook/upBook.js
const app = getApp(); // 获取全局数据

Page({

  /**
   * 页面的初始数据
   */
  data: {
    whoIndex: 0,
    typeIndex: 0,
    types: ['实践活动', '文艺活动', '体育活动', '公益活动'],
    who: ['所有人可见', '仅自己可见'],
    id: app.globalData.id,
    content: "",
    filePath:""
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
   * 输入策划内容
   */
  inputContent: function(e) {
    this.setData({
      content: e.detail.value
    })
  },

  /**
   * 选择策划类别
   */
  bindPickerChange: function(e) {
    var targetID = e.currentTarget.id;
    var that = this;
    if (targetID == "type") {
      that.setData({
        typeIndex: e.detail.value
      })
    } else {
      that.setData({
        whoIndex: e.detail.value
      })
    }
  },

  /**
   * 选择文件，仅支持从客户端会话选择文件，
   * 即需要将文件发送给某个微信用户，从与该用户的会话记录中选择文件上传
   */
  chooseFile: function(e) {
    var that = this;
    var targetID=e.target.id;
    var ex=['dox','docx'];
    if(targetID == "pdf"){
      ex=['pdf','PDF'];
    }
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      extension:ex,
      success(res) {
        that.setData({
          filePath: res.tempFiles[0]
        }) 
      }
    })
  },

  /**
   * 上传策划
   */
  uploadFile: function() {
    var that = this;
    if (that.data.content == "" ||
    that.data.filePath == "") {
      wx.showToast({
        title: '策划文件及其描述不能为空',
        icon:'none',
        duration:1500
      })
    } else {

      wx.uploadFile({
        url: 'http://tzl.cyyself.name:2333/plans/uploadPlan', //仅为示例，非真实的接口地址
        filePath: that.data.filePath,
        name: 'file',
        formData: {
          'user_id': that.data.id,
          'title': that.data.filePath.name,
          'theme': that.data.types[that.data.typeIndex],
          'content': that.data.content,
          //'Authority':who[whoIndex]
        },
        header: {
          'content-type': 'multipart/form-data'
        },
        success(res) {
          if (res.data.code == 0) {
            wx.showToast({
              title: '策划上传成功',
              icon: 'none',
              duration: 1000,
            })
          } else {
            wx.showToast({
              title: '策划上传失败',
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
  }
})