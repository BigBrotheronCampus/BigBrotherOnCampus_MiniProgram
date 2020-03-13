// pages/ground/ground.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar:[
      { index: 0, text: '实时活动' },
      { index: 1, text: '寻找队友' },
      { index: 2, text: '活动信息咨询' },
    ],
    currentTab:0,
    activity:[],
    findTeammate:[],
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
      else if (this.allActivities[i].theme == "findTeammate") {
        this.setData({
          findTeammate: this.data.findTeammate.concat(this.allActivities[i])
        })
      }
    }
  },

  onPullDownRefresh: function () {
      this.onLoad()
  },

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
  }
})