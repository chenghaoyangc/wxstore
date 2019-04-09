
var app = getApp();

var helper = require('../../utils/helper.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    datas:{},
    covers:[],
    myhost: app.globalData.remoteDomainPathMy,
    pid:'',
    cartCounts:0,
    commentlist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(options);

    //this
    var that = this;
    
    //获取从列表页传过来的ID
    let id = options.id;

    //根据ID从后端API获取数据
    wx.request({
      url: app.globalData.remoteDomainApi+'bookdetail.php?id='+id,
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {

        console.log(res.data)

        that.setData({
          datas:res.data,
          imgUrls:res.data.cover,
          pid: id
        })

      }
    })

    // 读取评论
    wx.request({

      url: app.globalData.remoteDomainApi + 'getcomment.php',
      data: {
        catagory: 'book',
        pid: id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
          commentlist: res.data
        })
      }
    })

    //显示购物车数量
    wx.getStorage({
      key: app.globalData.openId,
      success: function(res) {
        
        helper.cartCount(that, res.data);

      },
    })

  },

  /**
   * 查看作品
   */
  viewworks:function(e){

    //获取搜索词
    let keywords = e.target.id;

    //跳转到图书列表+参数
    wx.navigateTo({
      url: '../listbook/listbook?keywords=' + keywords+'&action=author&dos=search',
    })


  },
  /**
   * 加入购物车
   */
  cart:function(){

    var that = this;

    //1.显示购物状态
    wx.showToast({
      title: '成功加入购物车!',
      icon: 'success',
      duration: 2000
    })

    //2.把产品写入到storage中（购买）

      //2.1 在Storage中是否存在该openID

      //获取本地存储
      wx.getStorage({

        key: app.globalData.openId,

        success(res) { //2.2 如果在Storage存在该openID

          console.log(res.data)

            //当前Storage中该OPENID的所有数据
            var allDatas=res.data;

            var allDatas_book = allDatas.book

            //2.2.1查看图书book中是否数据
          if (allDatas_book.length<1){ //图书中没有任何数据

            let data = [{ pid: that.data.pid, count: 1, pdatas: that.data.datas }]

            let lastData = { book: data, music: allDatas.music, movie: allDatas.movie}

            //存入storage
            wx.setStorage({
              key: app.globalData.openId,

              data: lastData,

              success: function () { //每次在成功设置Storage时，重新统计购买数量

                //第一次创建Storage时，数量总是1
                // let count = 1;

                //计算总数
                let totalCounts = helper.cartCount(that, lastData)

                //更新模板数据
                that.setData({
                  cartCounts: totalCounts
                })

              }
            })


          } else { //图书中有数据


            //定义一个临时新数组，用于存放最新的改变了数量的 数据
            var tempArr = [];

            //定义一个状态（当前产品是否在已经购买的数组中）
            var isExist = false;

            //2.2.1 它的book项中是否存在当前的产品
            for (let i = 0; i < allDatas_book.length;i++){

                //当前遍历的产品ID是否 等于当前页面加载的产品ID
                if (allDatas_book[i].pid == that.data.pid){ //如果等于（表明该产品已经购买过了，只需要数量+1）

                  // 当前变量的项目
                  let currentItem = allDatas_book[i];
                  currentItem.count++;

                  //存入新数组
                  tempArr.push(currentItem)

                  //改变是否存在该产品的状态
                  isExist = true;


                } else { //如果不等
                  
                  tempArr.push(allDatas_book[i])

                }

            }

            if (!isExist) { //表明当前的已购买的图书的数组中，没有当前的图书
              //当前图书信息
              let data = { pid: that.data.pid, count: 1, pdatas: that.data.datas }

              //存入到当前已经购买的图书的数组中
              tempArr.push(data)

            }


            //最终数据
            let lastData = { book: tempArr, music: allDatas.music, movie: allDatas.movie }

            //更改Storage的值
            wx.setStorage({
              key: app.globalData.openId,
              data: lastData,
              success:function(){

               //显示购物车数量
                helper.cartCount(that, lastData);

              }
            })

          }

        },

        fail: function () {//2.3 如果在Storage不存在该openID,创建Storage,并且存入当前的产品信息（pid,count）
          
          wx.setStorage({
            key: app.globalData.openId,

            // 数据格式：{"book":[{pid:1,count:1,pdatas:{...}},{pid:4,count:3,pdatas},{pid:45,count:5}],"music":[{pid:1,count:3},{pid:7,count:1}],"movie":[{pid:20,count:1}]}

            data: {book:[{pid:that.data.pid,count:1,pdatas:that.data.datas}],music:[],movie:[]},

            success:function(){ //每次在成功设置Storage时，重新统计购买数量

              //第一次创建Storage时，数量总是1
              let count =1;

              //更新模板数据
              that.setData({
                cartCounts: count
              })

            }
          })

        }
      })


    
  },
  /**
   * 跳转到首页
   * 
   */
  goHome:function(){

    wx.reLaunch({
      url: '../home/home',
    })

  },
  gocart: function () {

    wx.reLaunch({
      url: '../cart/cart',
    })

  }

})