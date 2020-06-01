// pages/personalCenter/personalInfo/userAge/userAge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userID: "",
    userAge: "",
    flag: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    that.setData({
      userID: wx.getStorageSync('information').id,
      userAge: wx.getStorageSync('information').age
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
   * 输入完成时上传数据到数据库并显示完成图标
   */
  bindconfirm: function(event) {
    var that = this;
    var inValue = Number(event.detail.value);
    if (event.detail.value.length == 0) {
      wx.showToast({
        title: '请输入真实年龄!',
        icon: 'loading',
        duration: 1500
      })
    } else {
      wx.request({
        url: 'https://tzl.cyyself.name/users/updateInfo',
        header: {
          "Content-Type": "application/json"
        },
        method: "POST",
        data: {
          'id': that.data.userID,
          'age': inValue,
        },
        success: function(res) {
          if (res.data.code == 0) {
            // 修改本地缓存信息，每次更新app.globalData都需修改
            let info = wx.getStorageSync('information');
            info.age = inValue;
            wx.setStorageSync("information", info);
            wx.showToast({
              title: '信息修改成功！',
              icon: 'success',
              duration: 1000
            });
            that.setData({
              userAge: inValue,
              flag: true
            })
            setTimeout(function() {
              wx.navigateBack({ //返回上一页面或多级页面
                delta: 1
              })
            }, 1000);
          } else {
            wx.showToast({
              title: "信息修改失败，请重试！",
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
  },


  /**
   * 输入框聚焦时显示编辑图标
   */
  bindfocus: function() {
    this.setData({
      flag: false,
    })
  }
})