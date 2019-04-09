//app.js
App({
  onLaunch: function () {

   

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {

        var that = this;
        // console.log(res.code);
        
        // 用户CODE
        let code=res.code
        
        // 发送 res.code 到后台换取 openId, sessionKey, unionId

        wx.request({
          url: that.globalData.remoteDomainApi + 'getopenid.php', 
          data: {
            code: code,
            y: ''
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            // 输出有无接收到后台数据
            // console.log(res)
            let openid=res.data.openid;
            // 把openID存入全局APP属性中，便于后面业务所需
            that.globalData.openId=openid;

            // 把openID本地存储(同步)
            wx.setStorageSync('openid',openid )
         
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // console.log(res);
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    remoteDomain:'https://www.fuhushi.com',
    remoteDomainApi:'https://www.fuhushi.com/web10/chy_bookstore/api/',
    remoteDomainPathMy:'https://www.fuhushi.com/web10/chy_bookstore/',
  }
})