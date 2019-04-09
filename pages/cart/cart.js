// pages/cart/cart.js
var app = getApp();
var helper = require('../../utils/helper.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookDatas: [],
    musicDatas: [],
    movieDatas: [],
    result: '',
    myhost: app.globalData.remoteDomainPathMy,
    totalPrice:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    // 获取本地存储数据
    let openid = wx.getStorageSync('openid');

    let storageDatas = wx.getStorageSync(openid);

    if (storageDatas) {

      // 清空结果状态
      this.setData({
        result: ''
      })

      // 图书
      var bookArr = storageDatas.book;

      // 音乐
      var musicArr = storageDatas.music;

      // 电影
      var movieArr = storageDatas.movie;

      // 统计总价
      let totalPrice = helper.countPrice(storageDatas);
      console.log(storageDatas)
   
      this.setData({
        bookDatas: bookArr,
        musicDatas: musicArr,
        movieDatas: movieArr,
        totalPrice: totalPrice

      })

    } else {

      this.setData({
        result: '暂无数据！'
      })
    }
  },

//   // 数量+1
  add: function(e) {
    // console.log(e)
    // console.log(app.globalData.openid)
  helper.addsub(e,app.globalData.openId,this,'add');
//     //  所点的分类
//     let item = e.currentTarget.dataset.item;

//     // 所点的产品ID
//     let pid = e.currentTarget.dataset.pid;

//     // 每点击一次，重新更新S投入阿哥，2.重新渲染数据

//     console.log(e);

//     // 1.获取本地数据
//     var storageDatas = wx.getStorageSync(app.globalData.openId);

//     // 1.2更新本地数据
//     var bookData = storageDatas.book;

//     var musicData = storageDatas.music;

//     var movieData = storageDatas.movie;

//     if (item == 'book') {
//       for (let i = 0; i < bookData.length; i++) {

//         if (bookData[i].pid == pid) {
//           bookData[i].count++;
//         }
//       }
//     } else if (item == 'music') {
//       for (let i = 0; i <musicData.length; i++) {

//         if (musicData[i].pid == pid) {
//           musicData[i].count++;
//         }
//       }

//     } else {
//       for (let i = 0; i < movieData.length; i++) {

//         if (movieData[i].pid == pid) {
//           movieData[i].count++;
//         }
//       }
//     }
//     console.log(storageDatas)
//     // 1.3重新设置Storage
//     wx.setStorageSync(app.globalData.openId, storageDatas)

//     this.setData({
//       bookDatas : storageDatas.book,
//       musicDatas : storageDatas.music,
//       movieDatas : storageDatas.movie
//     })

//   // 3.购物车数量的显示
//   let counts=helper.cartCount(this,storageDatas);
// // console.log(counts)
//   wx.setTabBarBadge({
//     index:2,
//     text:counts.toString()
//   })

  },
  //   // 数量-1
  sub: function (e) {
    // console.log(app.globalData.openid)
    helper.addsub(e, app.globalData.openId, this,'sub');
  },

  //   // 删除
  del: function (e) {
    // console.log(app.globalData.openid)
    
    var that_=this
    wx.showModal({
      title: '提示',
      content: '数据为0被清出购物车',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          // bookData.splice(i, 1);
         helper.addsub(e, app.globalData.openId, that_, 'del');
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  gopay:function(){
    wx.navigateTo({
      url: '../pay/pay',
    })
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