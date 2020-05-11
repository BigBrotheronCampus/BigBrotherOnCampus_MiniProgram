// pages/publish/publishActivity/publishActivity.js
var myDate = new Date(); //获取系统当前时间

Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    types: ['志愿活动', '文体活动', '科研竞赛', '校园讲座'],
    userID: "",
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
    this.setData({
      userID:wx.getStorageSync('information').id
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
          //console.log(res);
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
   * 单击选好的图片删除
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
  activitySubmit: function(event) {
    var that = this;
    // 检查表单信息是否完整
    //console.log(event.detail.value);
    var formData = event.detail.value;
    if (formData.activityName == "" ||
      formData.activityPublisher == "" ||
      formData.activityLeader == "" ||
      formData.activityPhoneNum == "" ||
      formData.activityContent == "") {
      wx.showToast({
        title: '请填写完整信息！',
        icon: 'loading',
        duration: 1500,
      })
    } else {
      // 先上传图片/视频，再上传表单信息
      if (that.uploadImg() && that.uploadVideo()) {
        wx.showLoading({
          title: '正在上传其他信息',
        })
        wx.request({
          url: 'https://tzl.cyyself.name/activities/add?uid=' + that.data.userID,
          header: {
            "Content-Type": "application/json"
          },
          method: "POST",
          data: {
            'title': formData.activityName,
            'publisher': formData.activityPublisher,
            'type': that.data.types[that.data.index],
            'principal': formData.activityLeader,
            'contact': formData.activityPhoneNum,
            'content': formData.activityContent,
            'img': that.data.imgPath,
            'video': that.data.videoPath,
            'time': that.data.time
          },
          success: function(res) {
            //console.log(res);
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
                title: "活动信息提交失败，请重试！",
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
  },

  /**
   * 选择活动类别
   */
  bindPickerChange: function(e) {
    var that = this;
    that.setData({
      index: e.detail.value
    })
  }
})