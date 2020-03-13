//检查网络状态

function checkNetStatu() {
  var statu = true;

  wx.getNetworkType({
    success: function (res) {
      var networkType = res.networkType // 返回网络类型2g，3g，4g，wifi, none, unknown
      if (networkType == "none") {    //没有网络连接
        wx.showToast({
          title: '网络连接失败',
          icon:'loading',
          duration:1000
        })
        statu = false
      } else if (networkType == "unknown") {    //未知的网络类型
        wx.showToast({
          title: '未知的网络类型',
          icon:'loading',
          duration:1000
        })
        statu = false
      }
    }
  })
  return statu
}

// 模块化
module.exports = {
  checkNetStatu: checkNetStatu
}