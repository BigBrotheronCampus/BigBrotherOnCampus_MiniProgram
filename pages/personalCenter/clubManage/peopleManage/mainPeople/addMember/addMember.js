// pages/personalCenter/clubManage/peopleManage/mainPeople/addMember/addMember.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid: "",
    cid: "",
    account: "",
    trueName: "",
    photo: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    that.setData({
      cid: options.cid
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    let that = this;
    if (that.data.account != "") {
      that.search();
    }
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
   * 输入学号
   */
  inputAccount: function(e) {
    let that = this;
    that.setData({
      account: e.detail.value
    })
  },

  /**
   * 根据学号查找用户
   */
  search: function() {
    let that = this;
    wx.request({
      url: 'https://tzl.cyyself.name/users/getUser?account=' + that.data.account,
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function(res) {
        if (res.data.code == 0) {
          //console.log(res.data);
          if (res.data.data == null) {
            wx.showToast({
              title: '学号不正确或用户未注册',
              icon: 'none',
              duration: 1500
            })
          } else {
            that.setData({
              uid: res.data.data.id,
              trueName: res.data.data.trueName,
              photo: res.data.data.photo
            })
          }
        } else {
          wx.showToast({
            title: '获取用户信息失败',
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
   * 添加成员
   */
  add: function() {
    let that = this;
    wx.request({
      url: 'https://tzl.cyyself.name/communities/addMember',
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      data: {
        'cid': that.data.cid,
        'uid': that.data.uid
      },
      success: function(res) {
        if (res.data.code == 0) {
          wx.showToast({
            title: '添加成员成功',
            icon: 'success',
            duration: 1000
          })
          setTimeout(function() {
            wx.navigateBack({ //返回上一页面或多级页面
              delta: 1
            })
          }, 1000);
        } else {
          wx.showToast({
            title: '该成员已加入',
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
   * 删除成员
   */
  delete:function(){
    let that = this;
    wx.request({
      url: 'https://tzl.cyyself.name/communities/deleteMember',
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      data: {
        'cid': that.data.cid,
        'uid': that.data.uid
      },
      success: function (res) {
        if (res.data.code == 0) {
          wx.showToast({
            title: '删除成员成功',
            icon: 'success',
            duration: 1000
          })
          setTimeout(function () {
            wx.navigateBack({ //返回上一页面或多级页面
              delta: 1
            })
          }, 1000);
        } else {
          wx.showToast({
            title: '删除社团成员失败',
            icon: 'none',
            duration: 1500
          })
        }
      },
      fail: function (err) {
        console.log(err);
        wx.showToast({
          title: '未连接到服务器',
          icon: 'none',
          duration: 1500
        })
      }
    })
  }
})