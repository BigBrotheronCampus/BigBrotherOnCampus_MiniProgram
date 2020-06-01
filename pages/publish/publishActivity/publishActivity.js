// pages/publish/publishActivity/publishActivity.js
var myDate = new Date(); //获取系统当前时间
const app = getApp()

const api = app.globalData.api

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
    time: "",
    boolSync: false
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
      userID: wx.getStorageSync('information').id
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.onLoad();
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
          title: '选择图片错误，请重试！',
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
          title: '选择视频错误，请重试！',
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
   * 提交图片/视频
   */
  uploadImg: function() {
    var that = this;
    return new Promise((resolve, reject) => {
      api.uploadFileData("https://tzl.cyyself.name/file/saveActivityImg", that.data.imgPath).then((res) => {
          this.setData({
            imgPath: res
          })
          //console.log(res);
          resolve();
        })
        .catch((err) => {
          console.log(err);
          reject(err);
          that.setData({
            boolSync: false
          })
          wx.showToast({
            title: '上传图片文件错误',
            icon: "none",
            duration: 1500
          })
        })
    })
  },

  uploadVideo: function() {
    var that = this;
    return new Promise((resolve, reject) => {
      api.uploadFileData("https://tzl.cyyself.name/file/saveActivityVideo", that.data.videoPath).then((res) => {
          this.setData({
            videoPath: res
          })
          //console.log(res);
          resolve();
        })
        .catch((err) => {
          console.log(err);
          reject(err);
          that.setData({
            boolSync:false
          })
          wx.showToast({
            title: '上传视频文件错误',
            icon: "none",
            duration: 1500
          })
        })
    })
  },

  /**
   * 单击按钮提交表单信息事件
   */
  async activitySubmit(event) {
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
      if (that.data.imgPath != "") {
        await api.showLoading() // 显示loading
        await that.uploadImg() // 请求数据
        await api.hideLoading() // 等待请求数据成功后，隐藏loading
      }
      if (that.data.videoPath != "") {
        await api.showLoading() // 显示loading
        await that.uploadVideo() // 请求数据
        await api.hideLoading() // 等待请求数据成功后，隐藏loading
      }
      if (that.data.boolSync) {
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
      }else{
          // 上传文件错误
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