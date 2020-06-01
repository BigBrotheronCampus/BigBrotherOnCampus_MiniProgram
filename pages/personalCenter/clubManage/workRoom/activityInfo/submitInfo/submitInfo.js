// pages/personalCenter/clubManage/workRoom/activityInfo/submitInfo/submitInfo.js
const app = getApp()

const api = app.globalData.api

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cid: "",
    title: "",
    img: [],
    video: [],
    name: "",
    time: "",
    filePath: "",
    addVideo: true,
    boolSync: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      cid: options.cid
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: 'CQU校园大哥大',
      path: '/pages/home/home',
      imageUrl: '/icons/eye.png'
    }
  },

  /**
   * 输入活动名称
   */
  inputName: function(e) {
    this.setData({
      name: e.detail.value
    })
  },

  /**
   * 输入举办时间
   */
  inputTime: function(e) {
    this.setData({
      time: e.detail.value
    })
  },

  /**
   * 选择文件，仅支持从客户端会话选择文件，
   * 即需要将文件发送给某个微信用户，从与该用户的会话记录中选择文件上传
   */
  chooseFile: function(e) {
    let that = this;
    let targetID = e.target.id;
    let ex = ['dox', 'docx'];
    wx.showModal({
      title: '温馨提示',
      content: '仅支持从客户端会话选择文件,即需要将文件发送给某个微信好友，从与该好友的会话记录中选择文件上传',
      success: function(res) {
        if (res.confirm) {
          if (targetID == "pdf") {
            ex = ['pdf', 'PDF'];
          }
          wx.chooseMessageFile({
            count: 1,
            type: 'file',
            extension: ex,
            success(res) {
              that.setData({
                filePath: res.tempFiles[0].path,
                title: res.tempFiles[0].name
              })
              //console.log(res.tempFiles[0]);
            }
          })
        } else {
          // 用户取消
        }
      }
    })
  },

  /**
   * 单击选好的文件删除
   */
  deleteFile: function(e) {
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确定是否删除',
      success: function(res) {
        if (res.confirm) { // 用户确定修改
          that.setData({
            filePath: "",
            title: ""
          })
        } else {
          // 取消删除
        }
      }
    })
  },

  /**
   * 选择图片/视频
   */
  chooseImg: function() {
    let that = this;
    if (that.data.img.length <= 3) {
      wx.chooseImage({
        count: 3, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          //console.log(res)
          that.setData({
            img: res.tempFilePaths
          })
        }
      })
    } else {
      wx.showToast({
        title: '最多只能选择3张图片',
        icon: 'none',
        duration: 1500
      })
    }
  },

  chooseVideo: function() {
    let that = this;
    wx.chooseVideo({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        console.log(res)
        if (res.size < 500 * 1024 * 1024) {
          let path = that.data.video;
          path.push(res.tempFilePath)
          that.setData({
            video: path,
          })
          //console.log(that.data.video);
          //console.log(that.data.video.length);
          if (that.data.video.length == 3) {
            that.setData({
              addVideo: false,
            })
          }
        } else {
          wx.showToast({
            title: '视频大小不能超过500M！',
            icon: 'none',
            duration: 1500
          })
        }
      }
    })
  },

  /**
   * 长按删除图片/视频
   */
  delete: function(e) {
    let that = this;
    wx.showModal({
      title: '提示',
      content: '是否确认删除？',
      success(res) {
        if (res.confirm) {
          let delNum = e.currentTarget.dataset.index,
            delType = e.currentTarget.id,
            upImgArr = that.data.img,
            upVideoArr = that.data.video;
          if (delType == 'img') {
            upImgArr.splice(delNum, 1)
            that.setData({
              img: upImgArr
            })
          } else if (delType == 'video') {
            upVideoArr.splice(delNum, 1)
            that.setData({
              video: upVideoArr,
              addVideo: true
            })
          }
        } else if (res.cancel) {
          //console.log('用户点击取消')
        }
      }
    })
  },

  /**
   * 上传策划文件
   */
  uploadFile: function() {
    let that = this;
    return new Promise((resolve, reject) => {
      api.uploadFileData("https://tzl.cyyself.name/file/uploadCommunityPlan?name="+that.data.title, that.data.filePath).then((res) => {
          this.setData({
            filePath: res
          })
          //console.log('文件路径：' + res);
          resolve();
        })
        .catch((err) => {
          console.error(err);
          reject(err);
          that.setData({
            boolSync: false
          })
          wx.showToast({
            title: '上传策划文件错误',
            icon: "none",
            duration: 1500
          })
        })
    })
  },

  /**
   * 提交图片/视频
   */
  uploadImg: function(i) {
    let that = this;
    return new Promise((resolve, reject) => {
      //console.log(i + ':');
      //console.log(that.data.img[i]);
      api.uploadFileData("https://tzl.cyyself.name/file/uploadCommunityImg", that.data.img[i]).then((res) => {
          let imgArr = that.data.img;
          imgArr[i] = res[0];
          that.setData({
            img: imgArr
          })
          //console.log(res[0]);
          resolve();
        })
        .catch((err) => {
          console.error(err);
          reject(err);
          that.setData({
            boolSync: false
          })
          wx.showToast({
            title: '上传图片文件错误',
            icon: "none",
            duration: 1500
          })
        })
    })
  },

  uploadVideo: function(i) {
    let that = this;
    return new Promise((resolve, reject) => {
      api.uploadFileData("https://tzl.cyyself.name/file/uploadCommunityVideo", that.data.video[i]).then((res) => {
          let videoArr = that.data.video;
          videoArr[i] = res[0];
          that.setData({
            video: videoArr
          })
          //console.log(i + ':');
          //console.log(res[0]);
          resolve();
        })
        .catch((err) => {
          console.error(err);
          reject(err);
          that.setData({
            boolSync: false
          })
          wx.showToast({
            title: '上传视频文件错误',
            icon: "none",
            duration: 1500
          })
        })
    })
  },

  /**
   * 上传其他信息
   */
  async submit() {
    let that = this;
    if (that.data.name == "" ||
      that.data.time == "") {
      wx.showToast({
        title: '活动名称与举办时间不能为空',
        icon: 'none',
        duration: 1500
      })
    } else {
      if (that.data.filePath != "") {
        await api.showLoading() // 显示loading
        await that.uploadFile() // 请求数据
        await api.hideLoading() // 等待请求数据成功后，隐藏loading
      }
      if (that.data.img.length != 0) {
        //console.log('img');
        //console.log(that.data.img);
        await api.showLoading() // 显示loading
        for (let i = 0; i < that.data.img.length; i++) {
          await that.uploadImg(i) // 请求数据
        }
        await api.hideLoading() // 等待请求数据成功后，隐藏loading
        //console.log(that.data.img);
      }
      if (that.data.video.length != 0) {
        //console.log('video');
        //console.log(that.data.video);
        await api.showLoading() // 显示loading
        for (let i = 0; i < that.data.video.length; i++) {
          await that.uploadVideo(i) // 请求数据
        }
        await api.hideLoading() // 等待请求数据成功后，隐藏loading
        //console.log(that.data.video);
      }
      if (that.data.boolSync) {
        wx.showLoading({
          title: '正在上传其他信息',
        })
        wx.request({
          url: 'https://tzl.cyyself.name/data/addData?cid=' + that.data.cid,
          header: {
            'content-type': 'application/json'
          },
          method: "POST",
          data: {
            'name': that.data.name,
            'time': that.data.time,
            'plan': that.data.filePath,
            'title': that.data.title,
            'img1': that.data.img[0],
            'img2': that.data.img[1],
            'img3': that.data.img[2],
            'video1': that.data.video[0],
            'video2': that.data.video[1],
            'video3': that.data.video[2]
          },
          success: function(res) {
            //console.log(res);
            if (res.data.code == 0) {
              wx.showToast({
                title: '提交成功',
                icon: 'none',
                duration: 1000,
              })
              setTimeout(function() {
                wx.navigateBack({ //返回上一页面或多级页面
                  delta: 1
                })
              }, 1000);
            } else {
              wx.showToast({
                title: '提交失败',
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
      } else {
        // 上传文件发生错误
      }
    }
  }

})