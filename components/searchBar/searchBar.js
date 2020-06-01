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
    val: "",
    bool:false  // 设置直接返回广场界面
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
      let val = e.detail.value;
      wx.navigateTo({
        url: '/pages/ground/searchResult/searchResult?val=' + val,
      })
    },


    /**
     * 进入搜索结果界面修改左侧icon
     */
    changeIcon:function(){
      let that = this;
      that.setData({
        bool: true
      })
    },

    /**
     * 返回广场界面
     */
    returnGround:function(){
      let that = this;
      that.setData({
        bool: false
      })
      wx.switchTab({
        url:'/pages/ground/ground'
      })
    }
  }

})