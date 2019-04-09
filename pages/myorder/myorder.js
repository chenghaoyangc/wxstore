
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    myhost: app.globalData.remoteDomainPathMy
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;

    //获取该用户下的所有订单信息
    wx.request({
      url: app.globalData.remoteDomainApi+'getorderinfo.php',
      data: {
        openid: app.globalData.openId,
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)

        //渲染数据
        that.setData({
          list: res.data
        })

      }
    })

  },
  /**
   * 跳转到评论页面
   * 
   */
  goComment:function(e){
    console.log(e)
    //分类名
    let catagory = e.currentTarget.dataset.catagory

    //产品ID
    let pid = e.currentTarget.dataset.pid


    wx.navigateTo({
      url: '../mycc/mycc?catagory=' + catagory+'&pid='+pid,
    })

  },
  /**
   * 编辑评论
   */

  editComment:function(e){
console.log(e)
    let catagory = e.currentTarget.dataset.catagory

    let pid = e.currentTarget.dataset.pid

    let stars = e.currentTarget.dataset.stars;

    let notes = e.currentTarget.dataset.notes

    wx.navigateTo({
      url: '../mycc/mycc?action=edit&catagory=' + catagory + '&pid=' + pid + '&stars=' + stars + '&notes=' + notes,
    })

  }

})