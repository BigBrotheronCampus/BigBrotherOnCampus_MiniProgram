// pages/plan/plan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    func:[
      {index:0, img:"../../icons/history.png", txt:"最近浏览"},
      { index: 0, img: "../../icons/favorite_2.png", txt: "收藏夹" },
      { index: 0, img: "../../icons/cloud.png", txt: "云文件" },
      { index: 0, img: "../../icons/upload.png", txt: "上传" },
    ],
    content:["实践活动","文艺活动","体育活动","公益活动"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  }
})