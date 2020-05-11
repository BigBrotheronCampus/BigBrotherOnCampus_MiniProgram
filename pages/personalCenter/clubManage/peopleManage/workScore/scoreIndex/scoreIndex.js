// pages/personalCenter/clubManage/peopleManage/workScore/scoreIndex/scoreIndex.js
var score=[];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid:"",
    term: "",
    period: "",
    cid: "",
    work: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    that.setData({
      uid:wx.getStorageSync('information').id,
      term: options.term,
      period: options.period,
      cid: options.cid
    })
    that.getScores();
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
   * 阻止冒泡事件
   */
  tap:function(){
    //
  },

  /**
   * 输入分数
   */
  inputScore:function(e){
    let that=this;
    let index=e.currentTarget.id;
    //console.log(index);
    //console.log(e.detail.value);
    score[index]=e.detail.value
    //console.log(score);
  },

  /**
   * 获取所有社团成员的工作记录
   */
  getScores: function() {
    let that = this;
    wx.request({
      url: 'https://tzl.cyyself.name/examScores/getExamScore',
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      data: {
        'cid': that.data.cid,
        'semester': that.data.term,
        'period': that.data.period,
      },
      success: function(res) {
        console.log(res);
        if (res.data.code == 0) {
          that.setData({
            work: res.data.data.scores
          })
        } else {
          wx.showToast({
            title: '获取工作记录失败',
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
   * 点击查看工作内容
   */
  seeContent: function(e) {
    let that = this;
    let item = e.currentTarget.dataset.item;
    let content = item.event;
    wx.showModal({
      title: '工作记录',
      content: content ,
    })
  },

  /**
   * 提交工作记录
   */
  submitScore:function(){
    let that=this;
    let work=that.data.work;
    for(let i=0;i<work.length;i++){
      if (score[i] == "" || score[i] == null){
        wx.showToast({
          title: '有部分成员没有打分',
          icon:'none',
          duration:1500
        })
        return;
      }
    }
    for (let i = 0; i < work.length;i++){
      wx.request({
        url: 'https://tzl.cyyself.name/examScores/setScore',
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        data: {
          'uid': that.data.uid,
          'id': work[i].id,
          'score': score[i],
        },
        success: function (res) {
          //console.log(res);
          if (res.data.code == 0) {
            if(i==work.length-1){
              wx.showToast({
                title: '提交成功',
                icon: 'success',
                duration: 1000
              })
            }
          } else {
            wx.showToast({
              title: '提交分数失败，请重试',
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
  }
})