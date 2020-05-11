// pages/publish/wonderfulMoment/wonderfulMoment.js
const app = getApp(); // 获取全局数据
var myDate = new Date(); //获取系统当前时间

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userID: app.globalData.info.id,
    imgPath: "",
    videoPath: "",
    disImgVal: "none",
    disVideoVal: "none",
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
      time: y + "/" + m + "/" + d
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
   * 单击图片附加图片以及单击视频附加视频按键
   */
  onTapImg: function(event) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        if (res.size > 1 * 1024 * 1024) {
          wx.showToast({
            title: '图片文件不能超过1M！',
            icon: 'none',
            duration: 1500,
          })
        } else {
          console.log(res);
          that.setData({
            imgPath: res.tempFilePaths[0],
            disImgVal: "",
          })
        }
      },
      fail: function(err) {
        console.log(err);
        wx.showToast({
          title: '选择图片错误请重试！',
          icon: 'none',
          duration: 1500
        })
      }
    })
  },

  onTapVideo: function(event) {
    var that = this;
    wx.chooseVideo({
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        if (res.size > 500 * 1024 * 1024) {
          wx.showToast({
            title: '视频文件不能超过500M！',
            icon: 'none',
            duration: 1500,
          })
        } else {
          //console.log(res);
          that.setData({
            videoPath: res.tempFilePath,
            disVideoVal: ""
          })
        }
      },
      fail: function(err) {
        console.log(err);
        wx.showToast({
          title: '选择视频错误请重试！',
          icon: 'none',
          duration: 1500
        })
      }
    })
  },

  /**
   * 长按选好的图片删除
   */
  delete: function(e) {
    var targetID = e.currentTarget.id;
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定是否删除',
      success: function(res) {
        if (res.confirm) { // 用户确定修改
          if (targetID == 'img') {
            that.setData({
              imgPath: "",
              disImgVal: "none"
            })
          } else {
            that.setData({
              videoPath: "",
              disVideoVal: "none"
            })
          }
        } else {
          // 取消删除
        }
      }
    })
  },

  /**
   * 提交图片/视频，返回执行结果
   */
  uploadImg: function() {
    var that = this;
    var bool = true;
    if (that.data.imgPath == "") {
      return true;
    }
    wx.showLoading({
      title: '正在上传图片',
    })
    wx.uploadFile({
      url: "https://tzl.cyyself.name/file/saveActivityImg",
      filePath: that.data.imgPath,
      name: "file",
      method: "POST",
      header: {
        'content-type': 'multipart/form-data',
      },
      success: function(res) {
        var data = JSON.parse(res.data);  // 坑，上传文件返回的是json数据，需要解析
        //console.log(data);
        if (data.code == 0) {
          wx.showToast({
            title: '图片已上传！',
            icon: 'success',
            duration: 1000
          })
          that.setData({
            // 将图片路径改为返回的url
            imgPath: data.data
          })
        } else {
          wx.showToast({
            title: '图片上传失败，请重试！',
            icon: "none",
            duration: 1500
          })
          bool = false;
        }
      },
      fail: function(err) {
        console.log(err);
        wx.showToast({
          title: '未连接到服务器',
          icon: "none",
          duration: 1500
        })
        bool = false;
      }
    })
    return bool;
  },

  uploadVideo: function() {
    var that = this;
    var bool = true;
    if (that.data.videoPath == "") {
      return true;
    }
    wx.showLoading({
      title: '正在上传视频',
    })
    wx.uploadFile({
      url: "https://tzl.cyyself.name/file/saveActivityVideo",
      filePath: that.data.videoPath,
      name: "file",
      method: "POST",
      header: {
        'content-type': 'multipart/form-data',
      },
      success: function(res) {
        var data = JSON.parse(res.data);  // 坑，上传文件返回的是json数据，需要解析
        //console.log(data);
        if (data.code == 0) {
          wx.showToast({
            title: '视频已上传！',
            icon: 'success',
            duration: 1000
          })
          that.setData({
            // 将图片路径改为返回的url
            videoPath: data.data
          })
        } else {
          wx.showToast({
            title: '视频上传失败，请重试！',
            icon: "none",
            duration: 1500
          })
          bool = false;
        }
      },
      fail: function(err) {
        console.log(err);
        wx.showToast({
          title: '未连接到服务器',
          icon: "none",
          duration: 1500
        })
        bool = false;
      }
    })
    return bool;
  },

  /**
   * 单击按钮提交表单信息事件
   */
  momentSubmit: function(event) {
    var that = this;
    // 检查表单信息是否完整
    var formData = event.detail.value;
    if (that.data.imgPath == "" &&
      that.data.videoPath == "" &&
      formData.momentContent == "") { // 媒体与文字不能同时为空
      wx.showToast({
        title: '请添加内容！',
        icon: 'loading',
        duration: 1500,
      })
    } else {
      // 先上传图片/视频，返回上传结果，再上传表单信息
      if (that.uploadImg() && that.uploadVideo() && formData.momentContent != "") {
        // 上传表单信息
        wx.showLoading({
          title: '正在上传其他信息',
        })
        wx.request({
          url: 'https://tzl.cyyself.name/moments/add?uid=' + that.data.userID,
          header: {
            "Content-Type": "application/json"
          },
          method: "POST",
          data: {
            'content': formData.momentContent,
            'img': that.data.imgPath,
            'video': that.data.videoPath,
            'time': that.data.time
          },
          success: function(res) {
            //console.log(res.data);
            if (res.data.code == 0) {
              wx.showToast({
                title: '提交成功！',
                icon: 'success',
                duration: 1000
              })
              setTimeout(function() {
                wx.switchTab({
                  url: '../../ground/ground',
                })
              }, 1000);

            } else {
              wx.showToast({
                title: "信息提交失败，请重试！",
                icon: "none",
                duration: 1500
              })
            }
          },
          fail: function(err) {
            console.log(err);
            wx.showToast({
              title: "未连接到服务器！",
              icon: "none",
              duration: 1500
            })
          }
        })
      }
    }
  }
})