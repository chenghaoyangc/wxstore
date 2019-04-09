// component/star.js
Component({

properties:{
  starnums: Number
},
  

  /**
   * 页面的初始数据
   */
  data: {
  list:[]
  },
ready(){

  // 获取父组件传递的星星数量
let stars=this.properties.starnums;

// 创建星星
let totalStars=5;

// 临时数组
var tempArr=[];

for(let i=1;i<totalStars+1;i++){

// 一颗红星
let redStar='../static/ico/star.png';

// 一颗灰星
  let grayStar = '../static/ico/star-gray.png';

if(i>stars){
  // 存入灰星
  tempArr.push(grayStar);
}else{
  // 存入红星
  tempArr.push(redStar);
}


// 存入数组


}
this.setData({
  list:tempArr
})
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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