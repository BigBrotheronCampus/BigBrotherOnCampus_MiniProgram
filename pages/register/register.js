// pages/register/register.js
var date = new Date();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    pwd: "",
    account: "",
    name: "",
    trueName: "",
    getCode: "",
    trueCode: "",
    getCodeTime: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /***
   * 设置输入栏信息
   */
  inputPhone: function(e) {
    this.setData({
      phone: e.detail.value
    });
  },

  inputPassword: function(e) {
    this.setData({
      pwd: e.detail.value
    });
  },

  inputAccount: function(e) {
    this.setData({
      account: e.detail.value
    });
  },

  inputName: function(e) {
    this.setData({
      name: e.detail.value
    });
  },

  inputTrueName: function(e) {
    this.setData({
      trueName: e.detail.value
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
    if (that.data.phone == "") {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 1500
      })
    } else {
      wx.request({
        url: 'https://tzl.cyyself.name/users/getCode',
        method: 'post',
        data: {
          'phone': that.data.phone
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          if (res.data.code == 0) {
            that.setData({
              getCodeTime: res.data.data.tamp,
              trueCode: res.data.data.code
            })
            wx.showModal({
              title: '温馨提示',
              content: '获取验证码成功,请注意查收',
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
    }
  },

  /**
   * 验证验证码
   */
  check: function() {
    var that = this;
    if (that.data.phone == "" ||
      that.data.account == "" ||
      that.data.pwd == "" ||
      that.data.name == "" ||
      that.data.trueName == "") {
      wx.showToast({
        title: '请将信息填写完整',
        icon: 'none',
        duration: 1500
      })
    } else {
      wx.request({
        url: 'https://tzl.cyyself.name/users/checkCode',
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
          // 验证码验证成功则提交表单信息，进行注册
          if (res.data.code == 0) {
            wx.request({
              url: 'https://tzl.cyyself.name/users/register',
              method: 'POST',
              data: {
                'phone': that.data.phone,
                'pwd': that.data.pwd,
                'account': that.data.account,
                'name': that.data.name,
                'trueName': that.data.trueName
              },
              header: {
                'Content-Type': 'application/json'
              },
              success: function(res) {
                console.log(res);
                if (res.data.code == 0) {
                  wx.showToast({
                    title: '注册成功',
                    icon: 'none',
                    duration: 1000,
                  })
                  wx.switchTab({
                    url: '../home/home'
                  })
                } else if (res.data.code == -1) {
                  wx.showToast({
                    title: '学号或电话号已使用',
                    icon: 'none',
                    duration: 1500
                  })
                } else {
                  wx.showToast({
                    title: '注册失败',
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
   * 展示服务与隐私协议
   */
  showPolicy: function() {
    wx.navigateTo({
      url: './policy/policy',
    })
  }
})