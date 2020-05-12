// pages/ground/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oid: "", // 另外三种类型信息的id值，aid,mid,tid
    uid: "",
    currentTap: "",
    item: "",
    forwards: [],
    comments: [],
    likes: [],
    comment:"",
    boolComment:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    // 设置初始信息，以便不断刷新
    that.setData({
      uid: wx.getStorageSync('information').id, // 用户本身id，以便添加浏览历史
      currentTap: options.currentTap,
      oid: options.oid
    })
    //console.log(that.data.oid);
    var tap = that.data.currentTap;
    if (tap == 0) that.getActivity();
    else if (tap == 1) that.getRecruit();
    else that.getMoment();
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
    var that = this;
    var tap = that.data.currentTap;
    if (tap == 0) that.getActivity();
    else if (tap == 1) that.getRecruit();
    else that.getMoment();
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
   * 获取活动具体信息
   */
  getActivity: function() {
    var that = this;
    // 请求具体内容
    wx.request({
      url: "https://tzl.cyyself.name/activities/activity",
      method: 'GET',
      data: {
        'uid': that.data.uid,
        'aid': that.data.oid,
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log(res);
        if (res.data.code == 0) {
          that.setData({
            item: res.data.data.activity,
            forwards: res.data.data.forwards,
            comments: res.data.data.comments,
            likes: res.data.data.likes
          })
        } else {
          wx.showToast({
            title: '获取详细信息失败，请返回上一界面重试!',
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
   * 获取队友招募具体信息
   */
  getRecruit: function() {
    var that = this;
    // 请求具体内容
    wx.request({
      url: "https://tzl.cyyself.name/findTeammates/post",
      method: 'GET',
      data: {
        'uid': that.data.uid,
        'tid': that.data.oid,
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log(res);
        if (res.data.code == 0) {
          that.setData({
            item: res.data.data.post,
            forwards: res.data.data.forwards,
            comments: res.data.data.comments,
            likes: res.data.data.likes
          })
        } else {
          wx.showToast({
            title: '获取详细信息失败，请返回上一界面重试!',
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
   * 获取精彩瞬间具体信息
   */
  getMoment: function() {
    var that = this;
    // 请求具体内容
    wx.request({
      url: "https://tzl.cyyself.name/moments/moment",
      method: 'GET',
      data: {
        'uid': that.data.uid,
        'mid': that.data.oid,
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log(res);
        if (res.data.code == 0) {
          that.setData({
            item: res.data.data.moment,
            forwards: res.data.data.forwards,
            comments: res.data.data.comments,
            likes: res.data.data.likes
          })
        } else {
          wx.showToast({
            title: '获取详细信息失败，请返回上一界面重试!',
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
   * 长按收藏事件
   */
  collect: function(e) {
    let that = this;
    let tap = that.data.currentTap;
    let url;
    //console.log(tap);
    wx.showModal({
      title: '提示',
      content: '是否确定收藏',
      success: function(res) {
        if (res.confirm) {
          if (tap == 0) {
            url = 'https://tzl.cyyself.name/activities/addCollection?uid=' + that.data.uid + '&aid=' + that.data.oid;
          } else if (tap == 1) {
            url = 'https://tzl.cyyself.name/findTeammates/addCollection?uid=' + that.data.uid + '&tid=' + that.data.oid;
          } else {
            url = 'https://tzl.cyyself.name/moments/addCollection?uid=' + that.data.uid + '&mid=' + that.data.oid;
          }
          wx.request({
            url: url,
            header: {
              'content-type': 'application/json'
            },
            method: "GET",
            success: function(res) {
              console.log(res);
              if (res.data.code == 0) {
                wx.showToast({
                  title: '添加收藏成功',
                  icon: 'success',
                  duration: 1000
                })
              } else {
                wx.showToast({
                  title: '添加收藏失败。请重试',
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
        } else {
          // 取消收藏
        }
      }
    })
  },

  /**
   * 点赞、评论、转发
   */
  // 检查是否点赞
  checkLike: function() {
    let that = this;
    let tap = that.data.currentTap;
    let url;
    let bool;
    if (tap == 0) {
      url = 'https://tzl.cyyself.name/activities/checkLike?uid=' + that.data.uid + '&aid=' + that.data.oid;
    } else if (tap == 1) {
      url = 'https://tzl.cyyself.name/findTeammates/checkLike?uid=' + that.data.uid + '&tid=' + that.data.oid;
    } else {
      url = 'https://tzl.cyyself.name/moments/checkLike?uid=' + that.data.uid + '&mid=' + that.data.oid;
    }
    wx.request({
      url: url,
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function(res) {
        console.log(res);
        if (res.data.code == 0) {
          bool = true;
        } else if (res.data.code == -1) {
          bool = false;
        }
        return bool;
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

  like: function(e) {
    let that = this;
    let tap = that.data.currentTap;
    let url;
    // 检查是否点赞
    if (that.checkLike()) {
      wx.showToast({
        title: '你已点赞',
        icon: 'none',
        duration: 1500
      })
    } else {
      if (tap == 0) {
        url = 'https://tzl.cyyself.name/activities/like?uid=' + that.data.uid + '&aid=' + that.data.oid;
      } else if (tap == 1) {
        url = 'https://tzl.cyyself.name/findTeammates/like?uid=' + that.data.uid + '&tid=' + that.data.oid;
      } else {
        url = 'https://tzl.cyyself.name/moments/like?uid=' + that.data.uid + '&mid=' + that.data.oid;
      }
      wx.request({
        url: url,
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success: function(res) {
          console.log(res);
          if (res.data.code == 0) {
            let likes=that.data.likes;
            likes.push(wx.getStorageSync('information').name);
            that.setData({
              likes:likes
            })
          } else {
            wx.showToast({
              title: '点赞失败',
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
   * 点击开始评论
   */
  comment: function (e) {
    let that = this;
    that.setData({
      boolComment: true
    })
  },

  /**
   * 取消评论
   */
  cancel:function(){
    let that=this;
    that.setData({
      boolComment:false
    })
  },

  /**
   * 输入评论
   */
  inputComment:function(e){
    let that=this;
    that.setData({
      comment:e.detail.value
    })
  },

  /**
   * 发送评论
   */
  send:function(){
    let that = this;
    let tap = that.data.currentTap;
    let url;
    // 提交评论
    if (tap == 0) {
      url = 'https://tzl.cyyself.name/comments/addComment?uid=' + that.data.uid + '&aid=' + that.data.oid + '&type=activity';
    } else if (tap == 1) {
      url = 'https://tzl.cyyself.name/comments/addComment?uid=' + that.data.uid + '&tid=' + that.data.oid + '&type=teammate';
    } else {
      url = 'https://tzl.cyyself.name/comments/addComment?uid=' + that.data.uid + '&mid=' + that.data.oid + '&type=moment';
    }
    wx.request({
      url: url,
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      data: {
        'comment': that.data.comment
      },
      success: function (res) {
        console.log(res);
        if (res.data.code == 0) {
          let temp = {
            'uid': that.data.uid,
            'img': wx.getStorageSync('information').photo,
            'name': wx.getStorageSync('information').name,
            'content': that.data.comment
          }
          let comments = that.data.comments;
          comments.push(temp);
          that.setData({
            comments: comments,
            comment:"",
            boolComment:false
          })
        } else {
          wx.showToast({
            title: '评论失败,请重试',
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
  },

  forward: function(e) {
    let that = this;
    let tap = that.data.currentTap;
    let url;
    if (tap == 0) {
      url = 'https://tzl.cyyself.name/activities/forward?uid=' + that.data.uid + '&aid=' + that.data.oid;
    } else if (tap == 1) {
      url = 'https://tzl.cyyself.name/findTeammates/forward?uid=' + that.data.uid + '&tid=' + that.data.oid;
    } else {
      url = 'https://tzl.cyyself.name/moments/forward?uid=' + that.data.uid + '&mid=' + that.data.oid;
    }
    wx.request({
      url: url,
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function(res) {
        console.log(res);
        if (res.data.code == 0) {
          wx.showToast({
            title: '转发成功',
            icon: 'success',
            duration: 1000
          })
        } else {
          wx.showToast({
            title: '转发失败,请重试',
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
   * 点击头像查看发布者信息
   */
  onTapAvatar: function(e) {
    let that = this;
    console.log(that.data.item.uid);
    wx.navigateTo({
      url: '../othersInfo/othersInfo?uid=' + that.data.item.uid,
    })
  }
})