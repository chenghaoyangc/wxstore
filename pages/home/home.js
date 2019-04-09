// pages/home/home.js

var app = getApp();
var helper = require('../../utils/helper.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: ['../../static/ico/loading.gif'],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    isloading: true,
    newsInfo: ['相守无非这样', '熬的起孤独的汤', '敢舍弃久居的安稳', '承受的了千年的苦', '只为了百年平淡相伴'],
    host: app.globalData.remoteDomain,
    myhost: app.globalData.remoteDomainPathMy,
    barcount: 5,
    booktop3: [],
    newbook: [],
    starBook: [],
    starMusic: [],
    starMovie: [],
    musicTop6:[],
    movieTop6: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    //  定义this指向
    var that = this;

    // 根据ID从后端获取数据
    wx.request({
      url: app.globalData.remoteDomainApi + 'swiper.php', // 仅为示例，并非真实的接口地址
      success: function(res) {
        // console.log(res.data)
        that.setData({
            // datas: res.data,
            isloading: false,
            imgUrls: res.data,
          },
          function() {

          })
      }

    })
  },
  // wx.getStorage({
  //   key: app.globalData.openId,
  //   success: function (res) {

  //     // 显示tabbar购物车的数量
  //     wx.setTabBarBadge({
  //       index: 2,
  //       text: '1'
  //     })
  //   },
  // })
  // 返回时onShow函数将被重新执行
  onShow: function() { //返回的时候

    // 首先获取openid
    let openid = wx.getStorageSync('openid');

    // 获取购买产品的所有数据
    let StorageData = wx.getStorageSync(openid)

    console.log(StorageData)

    // 本地存储中有数据时
    if (StorageData) {
      // 获取购买的总数量
      let carCount = helper.cartCount(this, StorageData);

      if (carCount > 0) {
        // 显示tabbar购物车的数量
        wx.setTabBarBadge({
          index: 2,
          text: carCount.toString()
        })
      }
    }

    var that = this;

    //  畅销top3
    wx.request({

      url: app.globalData.remoteDomainApi + 'booksaletop3.php',
      data: {

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data)
        if (res.data.length > 0) {
          that.setData({
            booktop3: res.data
          })
        }

      }
    })


    // 新书特价包邮
    wx.request({

      url: app.globalData.remoteDomainApi + 'newbook.php',
      data: {

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        if (res.data.length > 0) {
          that.setData({
            newbook: res.data
          })
        }

      }
    })

    //  畅销top3
    wx.request({

      url: app.globalData.remoteDomainApi + 'star5.php',
      data: {

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.book)
        if (res.data) {

          if (res.data.book) {

            that.setData({
              starBook: res.data.book,
            })
          }
          if (res.data.book) {

            that.setData({
              starMusic: res.data.music,
            })
          }
          if (res.data.book) {

            that.setData({
              starMovie: res.data.movie,
            })
          }

        }

      }
    })
    ////////////////
    // musicTop6音乐TOP6
    wx.request({

      url: app.globalData.remoteDomainApi + 'musictop6.php',
      data: {

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data)
          that.setData({
            musicTop6: res.data
          })
       
      }
    })

    // movieTop6音乐TOP6
    wx.request({

      url: app.globalData.remoteDomainApi + 'movietop6.php',
      data: {

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
          movieTop6: res.data
        })

      }
    })
  },
// 畅销书排行榜 更多

  showmorebook3:function(){
   wx.navigateTo({
     url:'../listbook/listbook?tap=bookmoretop',
   })
  },



  // 分类跳转
  gobooklist: function(e) {

    // 获取标签参数
    let tap = e.currentTarget.dataset.tap

    // 页面跳转
    wx.navigateTo({
      url: '../listbook/listbook?tap=' + tap,
    })

  },

  gomusiclist: function(e) {

    // 获取标签参数
    let tap = e.currentTarget.dataset.tap

    // 页面跳转
    wx.navigateTo({
      url: '../listmusic/listmusic?tap=' + tap,
    })


  },

  gomovielist: function(e) {

    // 获取标签参数
    let tap = e.currentTarget.dataset.tap

    // 页面跳转
    wx.navigateTo({
      url: '../listmovie/listmovie?tap=' + tap,
    })


  },

  // 轮播跳转
  gourl: function(e) {
    console.log(e)
    // 要跳转的地址
    let url = e.currentTarget.dataset.url;

    let res_home = url.indexOf('cart');
    let res_scan = url.indexOf('scan');
    let res_listbook = url.indexOf('listbook');
    let res_listmusic = url.indexOf('listmusic');



    if (res_home > -1 || res_scan > -1) {

      // 跳转到TAB页面
      wx.switchTab({
        url: '../' + url,
      })
    } else {
      // 执行跳转
      wx.navigateTo({
        url: '../' + url,
      })
    }
  },

  // 畅销书跳转到图书详情 
  gobookdetails: function(e) {
    let pid = e.currentTarget.id;

    wx.navigateTo({
      url: '../detailbook/detailbook?id=' + pid,
    })

    console.log(e)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */

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