// pages/personalCenter/myInfo/myInfo.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: "",
    bool: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    that.setData({
      info: wx.getStorageSync('information')
    })
    if (that.data.info.id == "") {
      that.setData({
        bool: false
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.onLoad();
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
   * 单击头像上传头像
   */
  onTapAvatar: function() {
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        // 成功之后上传到服务器
        wx.uploadFile({
          url: "https://tzl.cyyself.name/file/savePhoto",
          filePath: tempFilePaths[0],
          name: "file",
          method: "POST",
          success: function(res) {
            console.log(res.data);
            let result = JSON.parse(res.data); // 将JSON字符串转换成对象
            console.log(result);
            if (result.code == 0) {
              wx.request({
                url: 'https://tzl.cyyself.name/users/updateInfo',
                header: {
                  "Content-Type": "application/json"
                },
                method: "POST",
                data: {
                  'id': that.data.info.id,
                  'photo': result.data,
                },
                success: function(res) {
                  if (res.data.code == 0) {
                    // 修改本地缓存信息，每次更新app.globalData都需修改
                    let info = wx.getStorageSync('information');
                    info.photo = result.data;
                    wx.setStorageSync("information", info);
                    wx.showToast({
                      title: '头像修改成功！',
                      icon: 'success',
                      duration: 1000
                    });
                  } else {
                    wx.showToast({
                      title: "头像修改失败",
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
            } else {
              wx.showToast({
                title: "头像修改失败",
                icon: 'none',
                duration: 1500
              })
            }
          },
          fail: function(err) {
            console.log("fail");
            console.log(err);
            wx.showToast({
              title: '未连接到服务器',
              icon: "none",
              duration: 1500
            })
          }
        })
      }
    })
  },

  /** 
   * 单击功能栏跳转事件
   */
  onTapInfoBar: function(event) {
    wx.navigateTo({
      url: "./" + event.currentTarget.id + "/" + event.currentTarget.id, // 依据id进行不同的跳转，传参
      fail: function() {}
    })
  },

  /**
   * 点击登录
   */
  toLogin: function() {
    wx.reLaunch({
      url: '../../login/login',
    })
  }
})