// pages/publish/wonderfulMovement/wonderfulMovement.js
const app = getApp(); // 获取全局数据

Page({

  /**
   * 页面的初始数据
   */
  data: {
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
  movementSubmit: function(event) {
    // 生成活动项目随机数
    var randNum = Math.floor(Math.random() * 10000);
    var that = this;
    //console.log(event.detail.value);
    const tempFilePath = that.data.attachedFilePath;
    var formData = event.detail.value;
    if (tempFilePath.length == 0 &&
      formData.movementContent.length == 0) { // 媒体与文字不能同时为空
      wx.showToast({
        title: '请添加内容！',
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
          tableName: "movementInfo",
          userID: that.data.userID,
          movementRandNum: randNum,
          movementContent: formData.movementContent,
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
              title: "精彩瞬间提交失败，后台将尽快为您解决！",
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

      // 活动信息提交成功再上传图片/视频
      if (tempFilePath.length != 0) {
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
  }
})