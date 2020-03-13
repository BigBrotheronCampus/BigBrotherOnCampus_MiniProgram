// pages/register/register.js
var date = new Date();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:"",
    get_code:"",
    check_code:"",
    get_code_time:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  inputPhone: function(e){
    this.setData({
      phone:e.detail.value
    });
  },

  inputCode: function (e) {
    this.setData({
      check_code: e.detail.value
    });
  },

  getCode: function(){
    var that = this;
    wx.request({
      url: 'http://47.94.166.123:2333/users/getCode',
      method: 'post',
      data:{
        'phone': that.data.phone
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res){
        that.setData({
          get_code_time : res.data.data.tamp,
          check_code: res.data.data.code
        })
      }
    })
  },

  check: function(){
    var that = this;
    wx.request({
      url: 'http://47.94.166.123:2333/users/register',
      method: 'post',
      data: {
        'get_code_time': that.data.get_code_time,
        'check_code': that.data.check_code,
        'true_code': that.data.get_code
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        
      }
    })
  }

})