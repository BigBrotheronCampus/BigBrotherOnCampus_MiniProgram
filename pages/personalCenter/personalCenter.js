// pages/personalCenter/personalCenter.js
const app = getApp();       // 获取全局数据

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userID:app.globalData.id,
    userAvatarPath:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

     },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 加载头像
    var that = this;
    wx.request({
      url: 'http://47.94.45.122:88/avatarQuery.php?userID=' + that.data.userID, //此处不能用https，需勾选不校验合法域名，上线需使用https协议
      data: {}, //传参
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        that.setData({
          userAvatarPath: res.data[0].userAvatarPath //设置数据，将表中查询出来的信息传给userAvatarPath
        })
      },
      fail: function (err) {
        var checkNetWork = require("../../function/checkNet.js");
        if (checkNetWork.checkNetStatu() == false) console.log("无网络");
        else {
          console.log(err),
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
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 单击头像上传头像
   */
  onTapAvatar: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        // 成功之后上传到服务器
        wx.uploadFile({
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
          success: function (res) {
            console.log(res.data);
            var result = JSON.parse(res.data); // 将JSON字符串转换成对象
            console.log(result);
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
              var value = "userAvatarPath"
              that.setData({      // 上传成功后更新头像
                [value]: tempFilePaths[0]
              }),
              wx.showToast({
                title: message,
                icon: "success",
                duration: 1500
              })
            } else {
              wx.showToast({
                title: message,
                icon: 'none',
                duration: 1500
              })
            }
          },
          fail: function (err) {
            console.log("fail");
            console.log(err);
            wx.showToast({
              title: '网络连接错误，请重试',
              icon: "loading",
              duration: 1500
            })
          }
        })
      }
    });
  },

  /** 
   * 单击功能栏跳转事件
   */
  onTapFunctionBar:function(event){
    var targetID = event.currentTarget.id;
    if(targetID=="signOut"){
      // 跳转到登录界面,有待修缮！！！！
      wx.reLaunch({
        url: "../login/login",
        fail: function () { }
      })
    }
    else if(targetID=="myInfo"){
      wx.navigateTo({
        url: "./" + targetID + "/" + targetID + "?title=" + this.data.userAvatarPath,
        fail:function(){}
      })
    }
    else{
      wx.navigateTo({
      url: "./" + targetID + "/" + targetID,   // 依据id进行不同的跳转
      fail:function(){}  
      })
    }
  },

  /**
   * 单击社交栏跳转事件
   */
  onTapSocial:function(event){
    wx.navigateTo({
      url: "./" + event.currentTarget.id + "/" + event.currentTarget.id,    //依据id进行不同的跳转
      fail: function () { }  
    })
  }
})