// pages/listbook/listbook.js
// 获取全局APP
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    myhost: app.globalData.remoteDomainPathMy,
    activeHealth: '',
    activeYounth: '',
    activeScience: '',
    activePeople: '',
    activeChild: '',
    activeNine: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 加载loading
    wx.showLoading({
      title: '加载中',
    })
console.log(options);
    //  定义this指向
    var that = this;

    // 是搜索还是查询分类

    if (options.tap) { //查询分类
      // 获取TAP
      let tap = options.tap;

      //  初始化变量
      let res = '';

      // 处理分类样式
      switch (tap) {

        case 'science':
          this.setData({
            activeScience: 'active'
          })
          break;

        case 'health':
          this.setData({
            activeHealth: 'active'
          })
          break;

         
        case 'child':
          this.setData({
            activeChild: 'active'
          })
          break;

        case 'people':
          this.setData({
            activePeople: 'active'
          })
          break;

        case 'youth':
          this.setData({
            activeYounth: 'active'
          })
          break;

        case 'free99':
          this.setData({
            activeNine: 'active'
          })
          break;

        case 'bookmoretop':
          this.setData({
            activehostsale: 'active'
          })
          break;
      
      }


      // console.log(tap)
      // 根据tap，从服务器拿对应数据
      wx.request({
        url: app.globalData.remoteDomainApi + 'booklist.php', // 仅为示例，并非真实的接口地址
        data: {
          tap: tap,
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {

          // 取消loading
          setTimeout(function () {
          wx.hideLoading();
          }, 2000)

          // 给模板提供数据
          that.setData({
            list: res.data
          })
          console.log(res.data)

        }
      })
    } else if (options.keywords) { //搜索

      // 搜索词
      let searchKeywords=options.keywords

      // 查询哪个字段
      let comlumn=options.action


     
// 后端查询
// 根据options,从服务器拿对应的数据
      wx.request({
        url: app.globalData.remoteDomainApi + 'booklist.php', // 仅为示例，并非真实的接口地址
        data: {
          searchKeywords: searchKeywords,
          comlumn: comlumn
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {

          // 取消loading
          // setTimeout(function () {
          wx.hideLoading();
          // }, 2000)

          // 给模板提供数据
          that.setData({
            list: res.data
          })
          console.log(res.data)

        }
      })
    }

  },

  // 详情页
  gobookdetail: function(e) {
    console.log(e)
    // 获取ID
    let id = e.currentTarget.dataset.id
console.log(id)
    wx.navigateTo({
      url: '../detailbook/detailbook?id=' + id,
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