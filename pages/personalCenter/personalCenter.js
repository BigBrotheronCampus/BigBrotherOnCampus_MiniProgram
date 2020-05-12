// pages/personalCenter/personalCenter.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userID: "",
    userAvatarPath: "",
    name: [], //   用户参加的社团名称
    id: [], // 用户参加的社团id
    bool:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    that.setData({  
      userID: wx.getStorageSync('information').id,
      userAvatarPath: wx.getStorageSync('information').photo
    })
    if(that.data.userID==""){
      that.setData({
        bool:false
      })
    }
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
    let that = this;
    that.setData({
      userAvatarPath: wx.getStorageSync('information').photo
    })
    // 修改本地缓存信息，每次更新app.globalData都需修改
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
              that.setData({ // 上传成功后更新头像
                userAvatarPath: result.data
              })
              // 修改本地缓存信息，每次更新app.globalData都需修改
              let info = wx.getStorageSync('information');
              info.photo = result.data;
              wx.setStorageSync("information", info);
              wx.showToast({
                title: "头像修改成功",
                icon: "success",
                duration: 1000
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
    });
  },

  /** 
   * 单击功能栏跳转事件
   */
  onTapFunctionBar: function(event) {
    let that = this;
    let targetID = event.currentTarget.id;
    if (targetID == "signOut") {
      wx.removeStorageSync('information');
      // 跳转到登录界面，必须设置login界面为初始索引界面
      wx.reLaunch({
        url: '../login/login',
      })
    } else if (targetID == "myHistory" || targetID == "myFavorite") {
      wx.navigateTo({
        url: './myPost/myPost?type=' + targetID, //依据id进行不同的跳转
      })
    } else if (targetID == 'clubManage') {
      that.getClubs();
      if (that.data.name == [] && that.data.id==[]) {
        wx.showToast({
          title: '您还未加入社团',
          duration: 1500
        })
      } else {
        wx.showActionSheet({
          itemList: that.data.name,
          success: function(res) {
            if (!res.cancel) {
              //console.log(res.tapIndex) //这里是点击了那个按钮的下标
              wx.navigateTo({
                url: "./" + targetID + "/" + targetID + '?cid=' + that.data.id[res.tapIndex], // 传递选择的社团id
              })
            }
          }
        })
      }
    } else {
      wx.navigateTo({
        url: "./" + targetID + "/" + targetID, // 依据id进行不同的跳转
      })
    }
  },

  /**
   * 单击社交栏跳转事件
   */
  onTapSocial: function(event) {
    let that = this;
    let targetID = event.currentTarget.id;
    if (targetID == 'myActivity') {
      wx.navigateTo({
        url: './myPost/myPost?type=myActivity',
      })
    } else {
      wx.navigateTo({
        url: './myFansFollows/myFansFollows?type=' + targetID,
      })
    }
  },

  /**
   * 获取用户参加过的社团
   */
  getClubs: function() {
    let that = this;
    wx.request({
      url: 'https://tzl.cyyself.name/communities/getUserCommunities?uid=' + that.data.userID,
      method: 'get',
      header: {
        "Content-Type": 'application/json'
      },
      success: function(res) {
        if (res.data.code == 0) {
          that.setData({
            name: res.data.data.name,
            id: res.data.data.id
          })
        } else {
          wx.showToast({
            title: '获取社团信息失败,请重试！',
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
   * 点击登录
   */
  toLogin:function(){
    wx.reLaunch({
      url: '../login/login',
    })
  }
})