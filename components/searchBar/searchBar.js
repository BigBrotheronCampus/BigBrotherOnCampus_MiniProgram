// components/searchBar/searchBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    val: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 改变输入框默认值
     */
    changeVal: function(value) {
      var that=this;
      that.setData({
        val: value
      })
    },

    /**
     * 进入搜索结果界面
     */
    search: function(e) {
      var val = e.detail.value;
      wx.navigateTo({
        url: '/pages/ground/searchResult/searchResult?val=' + val,
      })
    },

    /**
     * 返回广场界面
     */
    returnGround:function(){
      /*  待修改，后期统一修改界面的返回与关闭
      wx.switchTab({
        url:'/pages/ground/ground'
      })
      */
    }
  }

})