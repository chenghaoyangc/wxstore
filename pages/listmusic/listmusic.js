// pages/listmusic/listmusic.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    myhost: app.globalData.remoteDomainPathMy,
    lis:[],
    catagory:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.request({
      url: app.globalData.remoteDomainApi + 'listmusic.php', // 仅为示例，并非真实的接口地址
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data)
        that.setData({
          list: res.data
        })

      }
    })


    wx.request({
      url: app.globalData.remoteDomainApi + 'classmusic.php', // 仅为示例，并非真实的接口地址
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data)
        that.setData({
          catagory: res.data
        })

      }
    })
  },

  // 分类浏览
 classitem:function(e){
  
  var that=this;

  // 获取属性ID
  // console.log(e)
  let id=e.currentTarget.dataset.id;

// 获取全部分类
var catagory=that.data.catagory;
 
 var tempArr=[];

// 添加分类的项目class
for(let i=0;i<catagory.length;i++){

 let item=catagory[i];

if(item.id==id){
  var newObject={id:item.id,cls:'active',cname:item.cname}
}else{
  var newObject = { id: item.id, cls: '', cname:item.cname }
}

// 把每一个新的对象存入到临时数组中
tempArr.push(newObject)

}

that.setData({
  catagory:tempArr
})


  // 网络请求-音乐列表数据
   wx.request({
     url: app.globalData.remoteDomainApi + 'listmusic.php', // 仅为示例，并非真实的接口地址
     data: {
       ccid: id,
       y: ''
     },
     header: {
       'content-type': 'application/json' // 默认值
     },
     success(res) {
      //  console.log(res)
       that.setData({
         list: res.data
       })

     }
   })
 },
 
//  音乐详情
gomusicdetail:function(e){
// console.log(e)

// 音乐ID
let id=e.currentTarget.dataset.id;
  // console.log(id)
// 跳转到音乐详情页
wx.navigateTo({
  url:'../detailmusic/detailmusic?id='+id,
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