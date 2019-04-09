// pages/myinfo/myinfo.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: '',
    tempFilePaths: '',
    myname: '',
    mytel: '',
    mypost: '',
    myheader: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var that = this;

    wx.request({
      url: app.globalData.remoteDomainApi + 'getmyinfo.php', // 仅为示例，并非真实的接口地址
      data: {
        openid: app.globalData.openId,
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        let data = res.data;

        if (data != null) {

          that.setData({
            myname: data.uname,
            mytel: data.tel,
            mypost: data.post,
            address: data.address,
            myheader: app.globalData.remoteDomainPathMy + data.header
          })

        }

        console.log(res.data)
      }
    })

  },

  // 提交表单

  formSubmit: function(e) {
    // console.log(e)
    // console.log('提交表单');
    // 姓名
    let uname = e.detail.value.uname;

    //  手机号
    let tel = e.detail.value.tel;

    // 收货地址
    let address = e.detail.value.address;

    // 邮政编码
    let post = e.detail.value.post;

    // console.log(uname,tel,address,post)

    // 获取头像临时地址
    let tempFilePaths = this.data.tempFilePaths;

    if (tempFilePaths.length > 0) {
      // console.log(tempFilePaths);
      wx.uploadFile({
        url: app.globalData.remoteDomainApi + 'upload.php',
        filePath: tempFilePaths,
        name: 'file',
        formData: {
          uname: uname,
          tel: tel,
          address: address,
          post: post,
          openid: app.globalData.openId
        },
        success(res) {
          const data = res.data;
          console.log(data);
          // do something
          if (data == 'success') {
            wx.showToast({
              title: '注册成功',
              icon: 'success',
              duration: 2000,
              
              success: function() {
                setTimeout(function() {
                  wx.navigateBack({
                    delta: 1
                  })
                }, 2000)
              }

            })
          } else {
            wx.showToast({
              title: '注册失败',
              icon: 'none',
              duration: 2000,
              success: function() {
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 1
                  })
                }, 2000)
              }
            })
          }

        }
      })
    } else { //不选择头像


      wx.request({
        url: app.globalData.remoteDomainApi + 'upload.php', // 仅为示例，并非真实的接口地址
        data: {
          uname: uname,
          tel: tel,
          address: address,
          post: post,
          openid: app.globalData.openId
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          const data = res.data
          console.log(res)
          if (data == 'success') {
            wx.showToast({
              title: '注册成功',
              icon: 'success',
              duration: 2000,
              success: function() {
                setTimeout(function() {
                  wx.navigateBack({
                    delta: 1
                  })
                }, 2000)

              }
            })
          } else {
            wx.showToast({
              title: '注册失败',
              icon: 'none',
              duration: 2000,
              success: function() {
                setTimeout(function () {
                wx.navigateBack({
                  delta: 1
                })
                }, 2000)
              }
            })
          }
        }
      })
    }
  },

  formReset: function() {
    console.log('提交表单22');
  },

  // 获取位置
  getLocation: function() {

    var that = this;

    wx.chooseLocation({
      success: function(res) {
        // console.log(res);
        //地址
        let address = res.address;

        //渲染
        that.setData({
          address: address
        })

      }
    })
  },

  // 获取头像
  getPhoto: function() {

    var that = this;

    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths

        console.log(tempFilePaths)
        // 更新数据tempFilePaths的值
        that.setData({
          tempFilePaths: tempFilePaths[0]
        })
      }
    })
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

  }
})