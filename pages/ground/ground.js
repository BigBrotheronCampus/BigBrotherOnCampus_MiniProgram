// pages/ground/ground.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar:[
      { index: 0, text: '活动发布' },
      { index: 1, text: '队友招募' },
      { index: 2, text: '精彩瞬间' },
    ],
    currentTab:0,
    activities:[],
    recruits:[],
    movements:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    var that=this;
    that.getActivities();
    that.getRecruits();
    that.getMoments();
    console.log(that.data);
  },

  /**
   * 监听页面下拉刷新
   */
  onPullDownRefresh: function () {
      this.onLoad();
  },

  /**
   * 顶部导航栏切换
   */
  navbarTap: function(e){
    this.setData({
      currentTab: e.currentTarget.dataset.index
    })
  },

  /**
   * 获取所有活动发布信息
   */
  getActivities(){
    var that = this; 
    wx.request({
      url: 'https://tzl.cyyself.name/activities/all',
      method: 'get',
      header: {
        "Content-Type": 'application/json'
      },
      success: function (res) {
        if(res.data.code==0){
          that.setData({
            activities: res.data.data.activities
          }) 
          wx.setStorageSync('activities', res.data.data.activities);
        } else {
          wx.showToast({
            title: '获取活动发布信息失败,请重试！',
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

  /**
   * 获取所有队友招募信息
   */
  getRecruits() {
    var that = this;
    wx.request({
      url: 'https://tzl.cyyself.name/findTeammates/allPost',
      method: 'get',
      header: {
        "Content-Type": 'application/json'
      },
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            recruits: res.data.data.posts
          })
          wx.setStorageSync('recruits', res.data.data.posts);
        } else {
          wx.showToast({
            title: '获取队友招募信息失败,请重试！',
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


  /**
   * 获取所有精彩瞬间信息
   */
  getMoments() {
    var that = this;
    wx.request({
      url: 'https://tzl.cyyself.name/moments/allMoments',
      method: 'get',
      header: {
        "Content-Type": 'application/json'
      },
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            movements: res.data.data.moments
          })
          wx.setStorageSync('movements', res.data.data.moments);
        } else {
          wx.showToast({
            title: '获取精彩瞬间信息失败,请重试！',
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


  /**
   * 点击查看详情
   */
  seeDetails:function(e){
    var that= this;
    // 将详细信息传给详情界面，需要调试
    var item=e.currentTarget.dataset.item;
    console.log(typeof(item));
    wx.navigateTo({
      url: '../details/details?item='+ item + "&currentTap=" + that.data.currentTab,
    })
  },

  /**
   * 长按收藏事件
   */
  collect:function(e){
    // 待补充
  }
})