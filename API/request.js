// request get 请求
const getData = (url, param) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: 'GET',
      data: param,
      success(res) {
        console.log(res)
        resolve(res.data)
      },
      fail(err) {
        console.log(err)
        reject(err)
      }
    })
  })
}

// request post 请求
const postData = (url, param) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: 'POST',
      data: param,
      success(res) {
        console.log(res)
        resolve(res.data)
      },
      fail(err) {
        console.log(err)
        reject(err)
      }
    })
  })
}

// uploadFile 请求
const uploadFileData = (url,filePath)=>{
  return new Promise((resolve,reject)=>{
    wx.uploadFile({
      url: url,
      filePath: filePath,
      name: 'file',
      header: {
        'content-type': 'multipart/form-data'
      },
      success(res) {
        var data = JSON.parse(res.data); // 坑，上传文件返回的是json数据，需要解析
        resolve(data.data);
      },
      fail(err) {
        reject(err);
      }
    })
  })
}

// loading加载提示
const showLoading = () => {
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: '加载中...',
      mask: true,
      success(res) {
        //console.log('显示loading')
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

// 关闭loading
const hideLoading = () => {
  return new Promise((resolve) => {
    wx.hideLoading()
    //console.log('隐藏loading')
    resolve()
  })
}

module.exports = {
  getData,
  postData,
  uploadFileData,
  showLoading,
  hideLoading
}