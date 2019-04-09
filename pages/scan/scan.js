// pages/scan/scan.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host: app.globalData.remoteDomain
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  // 扫码
  scan: function() {
    wx.scanCode({
        success: (res) => {
          console.log(res)

          let code = res.result;

          wx.request({
            url: app.globalData.remoteDomainApi + 'scan.php',
            data: {
              code: code,
              y: ''
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              console.log(res.data)
              // 分类
              let catagory = res.data.catagory;

              // PID
              let pid = res.data.pid;

              if (!catagory || !pid) {

                console.log('抱歉，没有该产品!');

              }else{

                if (catagory == 'book') {
                  wx.navigateTo({
                    url: '../detailbook/detailbook?id=' + pid,
                  })
                } else if (catagory == 'music') {
                  wx.navigateTo({
                    url: '../detailmusic/detailmusic?id=' + pid,
                  })
                } else if (catagory == 'movie') {
                  wx.navigateTo({
                    url: '../detailmovie/detailmovie?id=' + pid,
                  })
                }
              }
            }
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