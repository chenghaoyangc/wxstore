// pages/my/my.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host: app.globalData.remoteDomain,
    myhost: app.globalData.remoteDomainPathMy,
    header: app.globalData.remoteDomain +'/web10/static/images/header.png',
    uname:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
var that=this

// 去除tabbar购物车数量
    let storageDatas = wx.getStorageSync(app.globalData.openId);
    if (storageDatas){
    if (storageDatas.book.length < 1 && storageDatas.music.length < 1 && storageDatas.movie.length < 1){//表明本地存储无任何数据
      wx.removeTabBarBadge({
        index: 2
      })
    }
    }

    wx.request({
      url: app.globalData.remoteDomainApi + 'getuserinfo.php',
      data: {
        openid: app.globalData.openId,
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
          header:that.data.myhost+res.data.header,
          uname:res.data.uname
        })
      }
    })


  },

// 完善资料
myinfo:function(){
   wx.navigateTo({
     url: '../myinfo/myinfo',
   })
},

// 订单信息
myorder:function(){
  wx.navigateTo({
    url: '../myorder/myorder',
  })
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})