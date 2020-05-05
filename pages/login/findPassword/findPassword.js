// pages/login/findPassword/findPassword.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    account: "",
    getCode: "",
    trueCode: "",
    getCodeTime: "",
    pwd0: "",
    pwd1: "",
    uid: "",
    isHidden: true
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /***
   * 设置输入栏信息
   */
  inputPhone: function(e) {
    this.setData({
      phone: e.detail.value
    });
  },

  inputPwd0: function(e) {
    this.setData({
      pwd0: e.detail.value
    });
  },

  inputPwd1: function(e) {
    this.setData({
      pwd1: e.detail.value
    });
  },

  inputAccount: function(e) {
    this.setData({
      account: e.detail.value
    });
  },


  inputCode: function(e) {
    this.setData({
      getCode: e.detail.value
    });
  },

  /**
   * 获取验证码
   */
  getCode: function() {
    var that = this;
    wx.request({
      url: 'https://tzl.cyyself.name:2333/users/findPwd',
      method: 'post',
      data: {
        'phone': that.data.phone,
        'account': that.data.account
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        //console.log(that.data);
        //console.log(res);
        if (res.data.code == 0) {
          that.setData({
            getCodeTime: res.data.data.tamp,
            trueCode: res.data.data.code,
            uid: res.data.data.uid
          })
        } else if (res.data.code == -2) {
          wx.showToast({
            title: '学号与手机号不匹配',
            icon: 'none',
            duration: 1500
          })
        } else {
          wx.showToast({
            title: '获取验证码失败,请重试',
            icon: 'none',
            duration: 1500
          })
        }
      },
      fail: function(err) {
        console.log(err);
        wx.showToast({
          title: '未连接到服务器',
          icon: 'none',
          duration: 1500
        })
      }
    })
  },

  /**
   * 验证验证码
   */
  checkCode: function(e) {
    var that = this;
    if (that.data.phone == "" ||
      that.data.account == "") {
      console.log(that.data);
      wx.showToast({
        title: '请将信息填写完整',
        icon: 'none',
        duration: 1500
      })
    } else {
      wx.request({
        url: 'https://tzl.cyyself.name:2333/users/checkCode',
        method: 'post',
        data: {
          'getCodeTime': that.data.getCodeTime,
          'checkCode': that.data.getCode,
          'trueCode': that.data.trueCode
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          // 验证码验证成功则填写新密码
          if (res.data.code == 0) {
            that.setData({
              isHidden: false
            })
          } else if (res.data.code == -2) {
            wx.showToast({
              title: '验证码已过期',
              icon: 'none',
              duration: 1500,
            })
          } else if (res.data.code == -1) {
            wx.showToast({
              title: '验证码错误',
              icon: 'none',
              duration: 1500,
            })
          } else {
            wx.showToast({
              title: '验证码验证失败',
              icon: 'none',
              duration: 1500,
            })
          }
        },
        fail: function(err) {
          console.log(err);
          wx.showToast({
            title: '未连接到服务器',
            icon: 'none',
            duration: 1500
          })
        }
      })
    }
  },

  /**
   * 提交新密码
   */
  submitPwd: function() {
    var that = this;
    var pwd0 = that.data.pwd0;
    var pwd1 = that.data.pwd1;
    if (pwd0 == "" ||
      pwd1 == "") {
      wx.showToast({
        title: '请将信息填写完整',
        icon: 'none',
        duration: 1500
      })
    } else if (pwd0 != pwd1) {
      wx.showToast({
        title: '两次输入密码不相同',
        icon: 'none',
        duration: 1500
      })
    } else {
      wx.request({
        url: 'https://tzl.cyyself.name:2333/users/updatePwd',
        method: 'post',
        data: {
          'id': that.data.uid,
          'firstPwd': pwd0,
          'secondPwd': pwd1
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          if (res.data.code == 0) {
            wx.showToast({
              title: '密码修改成功,请重新登录',
              icon: 'none',
              duration: 1000
            })
            setTimeout(function() {
              wx.navigateBack({
                delta: 1
              })　　　　
            }, 1000);
          } else {
            wx.showToast({
              title: '验证码验证失败',
              icon: 'none',
              duration: 1500,
            })
          }
        },
        fail: function(err) {
          console.log(err);
          wx.showToast({
            title: '未连接到服务器',
            icon: 'none',
            duration: 1500
          })
        }
      })
    }
  }

})