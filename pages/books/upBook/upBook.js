// pages/books/upBook/upBook.js
var myDate = new Date(); //获取系统当前时间

Page({

  /**
   * 页面的初始数据
   */
  data: {
    whoIndex: 1,
    typeIndex: 0,
    types: ['实践', '文艺', '体育', '公益'],
    who: ['仅自己可见', '所有人可见'],
    content: "",
    filePath: "",
    title: "",
    userID: "",
    time: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取当前日期
    var y = myDate.getFullYear(); //年份
    var m = myDate.getMonth() + 1; //月份
    var d = myDate.getDate(); //日期
    this.setData({
      time: y + "/" + m + "/" + d,
      userID: wx.getStorageSync('information').id
    })
    //console.log(this.data.time);
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
    var targetID = e.target.id;
    var ex = ['dox', 'docx'];
    if (targetID == "pdf") {
      ex = ['pdf', 'PDF'];
    }
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      extension: ex,
      success(res) {
        that.setData({
          filePath: res.tempFiles[0].path,
          title: res.tempFiles[0].name
        })
        //console.log(res.tempFiles[0]);
      }
    })
  },

  /**
   * 单击选好的文件删除
   */
  delete: function(e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定是否删除',
      success: function(res) {
        if (res.confirm) { // 用户确定修改
          that.setData({
            filePath: "",
            title: ""
          })
        } else {
          // 取消删除
        }
      }
    })
  },

  /**
   * 上传策划文件
   */
  uploadFile: async function() {
    var that = this;
    var bool = true;
    wx.uploadFile({
      url: 'https://tzl.cyyself.name/file/uploadPlan',
      filePath: that.data.filePath,
      name: 'file',
      header: {
        'content-type': 'multipart/form-data'
      },
      success: async function(res) {
        var data = JSON.parse(res.data); // 坑，上传文件返回的是json数据，需要解析
        //console.log(res);
        if (data.code == 0) {
          that.setData({
            filePath: data.data,
          })
          console.log(that.data.filePath);
          wx.showToast({
            title: '文件上传成功',
            icon: 'none',
            duration: 500,
          })
        } else {
          wx.showToast({
            title: '文件上传失败',
            icon: 'none',
            duration: 1500
          })
          bool = false;
        }
      },
      fail: function(err) {
        console.log(err);
        wx.showToast({
          title: '未连接到服务器',
          icon: 'none',
          duration: 1500
        })
        bool = false;
      }
    })
    return bool;
  },

  /**
   * 上传策划信息
   */
  upBook: async function() {
    var that = this;
    if (that.data.content == "" ||
      that.data.filePath == "") {
      wx.showToast({
        title: '策划文件及其描述不能为空',
        icon: 'none',
        duration: 1500
      })
    } else {
      let val = await that.uploadFile();    // 同步问题，有待修改
      console.log(val);
      if (val) {
        var typeIndex = that.data.typeIndex;
        wx.showLoading({
          title: '正在上传其他信息',
        })
        wx.request({
          url: 'https://tzl.cyyself.name/plans/uploadPlan?uid=' + that.data.userID,
          header: {
            'content-type': 'application/json'
          },
          method: "POST",
          data: {
            'uid': that.data.userID,
            'title': that.data.title,
            'theme': that.data.types[typeIndex],
            'content': that.data.content,
            'path': that.data.filePath,
            'visible': that.data.whoIndex,
            'time': that.data.time
          },
          success: function(res) {
            if (res.data.code == 0) {
              wx.showToast({
                title: '提交成功',
                icon: 'none',
                duration: 1000,
              })
              setTimeout(function() {
                wx.switchTab({
                  url: '../books',
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
    }
  }
})