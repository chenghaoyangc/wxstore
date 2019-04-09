// pages/pay/pay.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderUser: '无',
    orderTell: '无',
    orderAddress: '无',
    postImages: [],
    totalPrice: 0,
    myhost: app.globalData.remoteDomainPathMy,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    //  获取收货人的信息
    this.getUserInfo();

    this.cartCountent();

  },

  // 获取收货人信息
  getUserInfo: function() {
    var that = this;

    wx.request({
      url: app.globalData.remoteDomainApi + 'getUserinfo.php',
      data: {
        openid: app.globalData.openId,
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data == null) { //表明该用户还没有填写资料

          wx.showModal({
            title: '提示',
            content: '请完善个人资料',
            success(res) {
              if (res.confirm) { //跳转到完善个人资料页面

                wx.navigateTo({
                  url: '../myinfo/myinfo',
                })

                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })

          console.log('未填写')
        } else { //渲染数据到模板

          that.setData({
            orderUser: res.data.uname,
            orderTell: res.data.tel,
            orderAddress: res.data.address
          })

        }
        // console.log(res.data)
      }
    })

  },

  // 所购产品
  cartCountent: function() {

    //  定义临时数组
    var postArr = [];

    // 定义价格
    var price = 0;

    // 从storage中读取
    const products = wx.getStorageSync(app.globalData.openId);

    //  console.log(products)
    //  读取封面
    for (let i = 0; i < products.book.length; i++) {
      //  封面地址
      postArr.push(products.book[i].pdatas.cover[0].coverurl);

      //  价格
      price += parseFloat(products.book[i].pdatas.price * products.book[i].count);
    }
    for (let i = 0; i < products.music.length; i++) {
      //  封面地址
      postArr.push(products.music[i].pdatas.coverurl);

      //  价格
      price += parseFloat(products.music[i].pdatas.price * products.music[i].count);
    }

    for (let i = 0; i < products.movie.length; i++) {
      //  封面地址
      postArr.push(products.movie[i].pdatas.coverurl);

      //  价格
      price += parseFloat(products.movie[i].pdatas.price * products.movie[i].count);
    }

    console.log(postArr)
    console.log(price)
    this.setData({
      postImages: postArr,
      totalPrice: price
    })


  },

  // 提交订单
  submitOrder: function() {

    // 检验收货人
    this.getUserInfo();

    if (this.data.orderTel != '无' && this.data.totalPrice > 0) { //确保填写了联系人和购买了产品
      // console.log(wx.getStorageSync(app.globalData.openId))
      wx.request({
        url: app.globalData.remoteDomainApi + 'createorder.php',
        data: {
          openid: app.globalData.openId,

          datas: JSON.stringify(wx.getStorageSync(app.globalData.openId))
        },
        method: 'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success(res) {
          // console.log(res.data)
          if (res.data == 'success') {
      //  销毁Storage
            // wx.clearStorage()
            wx.setStorageSync(app.globalData.openId, {book:[],music:[],movie:[]})

      // 去除tabbar购物车数量
           
            //跳转到我的页面
            wx.reLaunch({
              url: '../my/my',
            })
          } else {
            console.log('失败');
          }

        }
      })


    }
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

    var that = this;

    wx.request({
      url: app.globalData.remoteDomainApi + 'getUserinfo.php',
      data: {
        openid: app.globalData.openId,
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        if (res.data != null) {
          that.setData({
            orderUser: res.data.uname,
            orderTell: res.data.tel,
            orderAddress: res.data.address
          })
        }

        // console.log(res.data)
      }
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