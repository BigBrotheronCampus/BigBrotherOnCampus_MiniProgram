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
    activity:[],
    recruit:[],
    movement:[],
    consult:[]
  },

  allActivities: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    this.getActivities();
    this.allActivities = wx.getStorageSync("activities");
    for(var i in this.allActivities){
      if (this.allActivities[i].theme == "activity"){
        this.setData({ 
          activity: this.data.activity.concat(this.allActivities[i])
        })
      }
      else if (this.allActivities[i].theme == "consult") {
        this.setData({
          consult: this.data.consult.concat(this.allActivities[i])
        })
      }
      else if (this.allActivities[i].theme == "recruit") {
        this.setData({
          recruit: this.data.recruit.concat(this.allActivities[i])
        })
      }
    }
  },

  /**
   * 监听页面下拉刷新
   */
  onPullDownRefresh: function () {
      this.onLoad()
  },

  /**
   * 顶部导航栏切换
   */
  navbarTap: function(e){
    this.setData({
      currentTab: e.currentTarget.dataset.index
    })
  },

  getActivities(){
    var that = this; 
    wx.request({
      url: 'http://47.94.166.123:2333/activities/all',
      method: 'get',
      header: {
        "Content-Type": 'application/json'
      },
      success: function (res) {
        that.allActivities = res.data.data.activities;
        wx.setStorageSync('activities', res.data.data.activities);
      },
      fail: function () {
        wx.showToast({
          title: '网络错误', 
          icon: 'loading',
          duration: 1000
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