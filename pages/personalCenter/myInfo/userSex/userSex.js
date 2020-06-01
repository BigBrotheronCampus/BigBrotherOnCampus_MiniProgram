// pages/personalCenter/personalInfo/userSex/userSex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userID: "",
    gender: "",
    sex: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    that.setData({
      userID: wx.getStorageSync('information').id,
      gender: wx.getStorageSync('information').gender
    })
    if (that.data.gender == null) {
      that.setData({
        sex: null,
      })
    } else if (that.data.gender == "女") {
      that.setData({
        sex: 0,
      })
    } else {
      that.setData({
        sex: 1,
      })
    }
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
   * 单击性别栏事件
   */
  onTapSexBar: function(event) {
    var that = this;
    var option = event.currentTarget.id;
    var s = that.data.sex;
    if ((option == "female" && s == 1) || (option == "male" && s == 0) || s == null) {
      wx.showModal({
        title: '提示',
        content: '确定是否修改',
        success: function(res) {
          if (res.confirm) { // 用户确定修改
            var inValue = null;
            if (option == "female") inValue = "女";
            else inValue = "男";
            wx.request({
              url: 'https://tzl.cyyself.name/users/updateInfo',
              header: {
                "Content-Type": "application/json"
              },
              method: "POST",
              data: {
                'id': that.data.userID,
                'gender': inValue
              },
              success: function(res) {
                if (res.data.code == 0) {
                  if (option == "female") {
                    that.setData({
                      sex: 0,
                    })
                  } else {
                    that.setData({
                      sex: 1,
                    })
                  }
                  // 修改本地缓存信息，每次更新app.globalData都需修改
                  let info = wx.getStorageSync('information');
                  info.gender = inValue;
                  wx.setStorageSync("information", info);
                  wx.showToast({
                    title: '信息修改成功！',
                    icon: 'success',
                    duration: 1000
                  });
                  that.setData({
                    flag: true,
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
          } else { //用户取消修改

          }
        }
      })
    }
  }
})