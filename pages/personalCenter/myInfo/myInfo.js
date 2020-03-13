// pages/personalCenter/myInfo/myInfo.js
const app = getApp(); // 获取全局数据

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userID: app.globalData.id,
    info: {
      userName: "",
      userSex: "",
      userAge: "",
      userSchool: "",
      userLocation: "",
    },
    userAvatarPath: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 加载头像
    this.setData({
      userAvatarPath: options.title,
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
    var that = this;
    // 获取并加载个人信息
    wx.request({
      url: 'http://47.94.45.122:88/infoQuery.php?userID='+that.data.userID,  //此处不能用https，需勾选不校验合法域名，上线需使用https协议
      data: {
        
      }, //传参
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function(res) {
        that.setData({
          info: res.data[0] //设置数据，将表中查询出来的信息传给info
        })
      },
      fail: function(err) {
        var checkNetWork = require("../../../function/checkNet.js");
        if (checkNetWork.checkNetStatu() == false) console.log("无网络");
        else {
          console.log(err);
          wx.showToast({
            title: "个人信息获取失败，后台将尽快为您解决！",
            icon: "none",
            duration: 2000
          })
        }
      }
    })
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
   * 单击头像上传头像
   */
  onTapAvatar: function() {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        //console.log(tempFilePaths[0]);
        // 成功之后上传到服务器
        const uploadTask = wx.uploadFile({
          url: "http://47.94.45.122:88/uploadImg_Video.php",
          filePath: tempFilePaths[0],
          name: "file",
          method: "POST",
          formData: {
            tableName:"userInfo",
            userID: that.data.userID
          },
          header: {
            'content-type': 'multipart/form-data',
            'cache-control': 'no-cache',
          },
          timeout: 2500,
          success: function(res) {
            var result = JSON.parse(res.data); // 将JSON字符串转换成对象
            //console.log(result);
            var message = "";
            switch (result.status) {
              case 1:
                message = "上传图片格式不正确！";
                break;
              case 2:
                message = "上传图片不能大于2M!";
                break;
              case 3:
                message = "更改头像成功！";
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
                message = "更换头像错误，后台将尽快为您解决！";
            }
            if (result.status == 3) {
              var value="userAvatarPath"
              that.setData({      // 上传成功后更新头像
                [value]: tempFilePaths[0],
              }),
              wx.showToast({
                title: message,
                icon: "success",
                duration: 1500
              })
            } else {
              wx.showToast({
                title: message,
                icon:'none',
                duration: 1500
              })
            }
          },
          fail: function(err) {
            console.log("fail");
            console.log(err);
            wx.showToast({
              title: '网络连接错误，请重试',
              icon: "loading",
              duration: 1500
            })
          },
          /*帮助debug，不论success或fail都可以打印结果
          complete: function(res) {
            console.log(res);
            console.log("complete");
          } */ 
        })
        /*
        uploadTask.onProgressUpdate((res) => {
          console.log('上传进度', res.progress)
          console.log('已经上传的数据长度', res.totalBytesSent)
          console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
        })
        */
      }
    });
  },

  /** 
   * 单击功能栏跳转事件
   */
  onTapInfoBar: function(event) {
    wx.navigateTo({
      url: "./" + event.currentTarget.id + "/" + event.currentTarget.id + '?title=' + this.data.info[event.currentTarget.id], // 依据id进行不同的跳转，传参
      fail: function() {}
    })
  },
})