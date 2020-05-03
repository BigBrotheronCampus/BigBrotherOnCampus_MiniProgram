// pages/publish/publishActivity/publishActivity.js
const app = getApp(); // 获取全局数据

Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    types: ['志愿活动', '文体活动', '科研竞赛', '校园讲座'],
    userID: app.globalData.id,
    attachedFilePath: "",
    disImgVal: "none",
    disVideoVal: "none"
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
   * 单击图片附加图片以及单击视频附加视频按键
   */
  onTapImg: function(event) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        that.setData({
          attachedFilePath: res.tempFilePaths[0],
          disImgVal: "",
          disVideoVal: "none"
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
        if (res.size > 100 * 1024 * 1024) {
          wx.showToast({
            title: '视频文件不能超过100M！',
            icon: 'none',
            duration: 1500,
          })
        } else if (res.duration > 60) {
          wx.showToast({
            title: '视频时长不能超过一分钟！',
            icon: 'none',
            duration: 1500,
          })
        } else {
          that.setData({
            attachedFilePath: res.tempFilePath,
            disImgVal: "none",
            disVideoVal: ""
          })
        }
      }
    })
  },

  /**
   * 单击按钮提交表单信息事件
   */
  activitySubmit: function(event) {
    // 生成活动项目随机数
    var randNum = Math.floor(Math.random() * 10000);
    var that = this;
    // 检查表单信息是否完整
    //console.log(event.detail.value);
    var formData = event.detail.value;
    if (formData.activityName.length == 0 ||
      formData.activityPublisher.length == 0 ||
      formData.activityType.length == 0 ||
      formData.activityLeader.length == 0 ||
      formData.activityPhoneNum.length == 0 ||
      formData.activityContent.length == 0) {
      wx.showToast({
        title: '请填写完整信息！',
        icon: 'loading',
        duration: 1500,
      })
    } else {
      // 上传表单信息
      wx.request({
        url: 'http://47.94.45.122:88/publishInfo.php',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: {
          tableName: "activityInfo",
          userID: that.data.userID,
          activityRandNum: randNum,
          activityName: formData.activityName,
          activityPublisher: formData.activityPublisher,
          activityType: formData.activityType,
          activityLeader: formData.activityLeader,
          activityPhoneNum: formData.activityPhoneNum,
          activityContent: formData.activityContent,
        },
        success: function(res) {
          //console.log(res.data);
          if (res.data == true) {
            wx.showToast({
              title: '提交成功！',
              icon: 'success',
              duration: 1500
            })
          } else {
            wx.showToast({
              title: "活动信息提交失败，后台将尽快为您解决！",
              icon: "none",
              duration: 1500
            })
            return
          }
        },
        fail: function(err) {
          console.log(err);
          wx.showToast({
            title: "网络连接错误，请重试！",
            icon: "none",
            duration: 1500
          })
          return
        }
      })

      const tempFilePath = that.data.attachedFilePath;
      if (tempFilePath != 0) { // 活动信息提交成功后根据需要上传图片/视频
        wx.showLoading({
          title: '上传文件中',
        })
        wx.uploadFile({
          url: "http://47.94.45.122:88/uploadImg_Video.php",
          filePath: tempFilePath,
          name: "file",
          method: "POST",
          formData: {
            tableName: "activityInfo", // 数据表名称
            userID: that.data.userID,
            activityRandNum: randNum
          },
          header: {
            'content-type': 'multipart/form-data',
            'cache-control': 'no-cache',
          },
          success: function(res) {
            //console.log(res.data);
            //console.log(res);
            wx.hideLoading(); // 隐藏加载框
            var result = JSON.parse(res.data); // 将JSON字符串转换成对象
            var message = "";
            switch (result.status) {
              case 1:
                message = "文件格式不正确！";
                break;
              case 2:
                message = "上传图片不能大于2M！";
                break;
              case 3:
                message = "发布活动成功！";
                break;
              case 4:
                message = "网络连接错误，请重试！";
                break;
              case 5:
                message = "网络连接错误，请重试！";
                break;
              case 6:
                message = "上传方式错误！";
                break;
              default:
                message = "上传文件错误，后台将尽快为您解决！";
            }
            if (result.status == 3) {
              wx.showToast({
                title: '提交成功！',
                icon: 'success',
                duration: 1500
              })
            } else {
              wx.showToast({
                title: message,
                icon: "none",
                duration: 1500
              })
            }
          },
          fail: function(err) {
            console.log("fail");
            console.log(err);
            wx.showToast({
              title: '网络连接错误，请重试！',
              icon: "loading",
              duration: 1500
            })
          }
        })
      }
      wx.switchTab({
        url: '../../ground/ground',
      })
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