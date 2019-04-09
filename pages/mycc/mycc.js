
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pname:'',
    stars:[],
    catagory:'',
    pid:'',
    starnum:5,
    notes:'',
    action:'add'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;

    //分类
    let catagory = options.catagory;

    //产品id
    let pid = options.pid;

    //网络请求，获取产品名称
    wx.request({
      url: app.globalData.remoteDomainApi+'getpname.php',
      data: {
        catagory: catagory,
        pid: pid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        
        //产品名称
        that.setData({
          pname: res.data.pname,
          catagory: catagory,
          pid: pid
        })
      }
    })

    //星星
    var tempArr = [];

    for(let i=1;i<6;i++){

      if (!options.stars){

        let starUrl = '../../static/ico/star.png';

        tempArr.push({ id: i, starurl: starUrl })

      } else {

        //红星
        let redStar = '../../static/ico/star.png'

        //灰星
        let grayStar = '../../static/ico/star-gray.png'

        if (i > options.stars) {

          tempArr.push({ id: i, starurl: grayStar })

        } else {

          tempArr.push({ id: i, starurl: redStar })

        }

      }

    }

    //渲染星星
    this.setData({
      stars: tempArr,
      notes:options.notes
    })

    //如果能够接收到action （来自于订单评论的编辑），则修改data的action 的值
    if (options.action){
      this.setData({
        action: options.action
      })
    }

  },
  /**
   * 选择星星
   */
  selectStar:function(e){

    console.log(e);

    var tempArr = [];

    //点击的是哪颗星
    let starNum = e.currentTarget.id

    //重置stars的内容
    for(let i=1;i<6;i++){

      //红星
      let redStar = '../../static/ico/star.png'

      //灰星
      let grayStar = '../../static/ico/star-gray.png'

      if (i > starNum){

        tempArr.push({ id: i, starurl: grayStar })

      } else {

        tempArr.push({ id: i, starurl: redStar })

      }


    }
    //渲染
    this.setData({
      stars: tempArr,
      starnum: starNum
    })

  },

  /**
   * 提交评论
   */
  formSubmit:function(e){

    var that = this;

    //分类
    let catagory = this.data.catagory;

    //产品ID
    let pid = this.data.pid;

    //openid
    let openid = app.globalData.openId;

    //星星数
    let starnums = this.data.starnum;

    //评论内容
    let content = e.detail.value.notes;

    //提交数据
    wx.request({
      url: app.globalData.remoteDomainApi+'comment.php',
      data: {
        action: that.data.action,
        catagory: catagory,
        pid: pid,
        openid: openid,
        starnums: starnums,
        content: content
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        if (res.data == 'success'){
          wx.showToast({
            title: '发表成功',
            icon: 'success',
            duration: 2000,
            success: function () {
              setTimeout(function () {
                wx.navigateBack({
                  delta: 1
                })
              }, 2000)
            }
          })
        } else {
          wx.showToast({
            title: '抱歉，发布失败!',
            duration: 2000
          })
        }
      }
    })

  },


  
})