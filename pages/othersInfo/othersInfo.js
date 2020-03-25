// pages/personalCenter/OthersInfo/othersInfo.js
const app = getApp();       // 获取全局数据
const follow = ["+ 关注", "取消关注"];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // ID指的是本人ID，userID指的是查看目标的ID
    ID: app.globalData.id,
    userID:"",
    info: {
      userName: "",
      userSex: "",
      userAge: "",
      userSchool: "",
      userLocation: "",
    },
    userAvatarPath: "",
    boolFollow:0,
    followTxt:follow[0],      // 初始化为未关注，显示“+ 关注”
    tableName:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    // 获取他人id,头像
    that.setData({
      //userID:12138,
      userID:options.id,
      userAvatarPath:options.path
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    // 获取并加载个人信息
    wx.request({
      url: 'http://47.94.45.122:88/infoQuery.php?userID=' + that.data.userID,  //此处不能用https，需勾选不校验合法域名，上线需使用https协议
      data: {

      }, //传参
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        that.setData({
          info: res.data[0] //设置数据，将表中查询出来的信息传给info
        })
      },
      fail: function (err) {
        var checkNetWork = require("../../../function/checkNet.js");
        if (checkNetWork.checkNetStatu() == false) console.log("无网络");
        else {
          console.log(err),
            wx.showToast({
              title: "个人信息获取失败，后台将尽快为您解决！",
              icon: "none",
              duration: 1500
            })
        }
      }
    })

    // 获取是否关注信息
    wx.request({
      url: 'http://47.94.45.122:88/followCheck.php?userID=' + that.data.userID + "&ID=" + that.data.ID,  //此处不能用https，需勾选不校验合法域名，上线需使用https协议
      data: {

      }, //传参
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        var result = res.data;
        if (result != -1) {
          that.setData({
            boolFollow: result,
            followTxt: follow[result]
          })
        } else {
          wx.showToast({
            title: "关注信息获取失败，后台将尽快为您解决！",
            icon: "none",
            duration: 1500
          })
        }
      },
      fail: function (err) {
        var checkNetWork = require("../../../function/checkNet.js");
        if (checkNetWork.checkNetStatu() == false) console.log("无网络");
        else {
          console.log(err),
            wx.showToast({
              title: "关注信息获取失败，后台将尽快为您解决！",
              icon: "none",
              duration: 1500
            })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
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
   * 更新关注信息
   */
  onTapFollowBtn:function(){
    var that=this;
    var bool = Math.abs(that.data.boolFollow-1);    // 修改boolFollow，不能直接取反，因为true不能作为list索引
    wx.request({
      url: 'http://47.94.45.122:88/fans_followsUpdate.php',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        boolFollow:bool,
        ID: that.data.ID,
        userID: that.data.userID
      },
      success: function (res) {
        console.log(res.data);
        if (res.data == true) {
          that.setData({
            boolFollow:bool,
            followTxt: follow[bool]
          })
        }
        else {
          wx.showToast({
            title: "修改失败，后台将尽快为您解决！",
            icon: "none",
            duration: 1500
          })
        }
      },
      fail: function (err) {
        console.log(err);
        wx.showToast({
          title: "修改失败，后台将尽快为您解决！",
          icon: "none",
          duration: 1500
        })
      }

    })
  }
})