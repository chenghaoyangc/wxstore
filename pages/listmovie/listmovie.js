
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    myhost: app.globalData.remoteDomainPathMy,
    class_catagory:[],
    class_country:[],
    all_active_class:'active-class',
    all_active_country:'active-country',
    current_class:'all_class',            //最新的分类
    current_country:'all_country',        //最新的国家
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    //内容
    wx.request({
      url: app.globalData.remoteDomainApi+'movielist.php',
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)

        //模板渲染
        that.setData({
          class_catagory: res.data.class_catagory,
          class_country: res.data.class_country,
          list: res.data.list_datas
        })
      }
    })

  },
  /**
   * 选择分类
   */
  classSelect:function(e){

    var that = this;

    //1.当前所选电影分类
    let currentSelectedClass = e.currentTarget.dataset.selectedclass

      //改变当前分类状态（这样，别的方法就可以获取到当前的所选分类）

      //处理 “全部” 分类的状态
      if (currentSelectedClass == 'all_class'){

        var newClass = 'active-class'

      } else {

        var newClass = ''

      }

      this.setData({
        current_class: currentSelectedClass,
        all_active_class: newClass
      })


    //2.当前所选电影地区
    let currentSelectedCountry = this.data.current_country

    // console.log(currentSelectedClass, currentSelectedCountry)

    //3.根据这两个条件，读取API数据
    wx.request({
      url: app.globalData.remoteDomainApi + 'movielistclass.php',
      data: {
        cls: currentSelectedClass,
        country: currentSelectedCountry
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data)
        that.setData({
          class_catagory: res.data.class_catagory,
          class_country: res.data.class_country,
          list: res.data.list_datas
        })
      }
    })

  },
  /**
   * 选择国家
   */
  countrySelect:function(e){

    var that = this;

    //1.当前所选电影分类
    let currentSelectedClass = this.data.current_class

    //2.当前所选电影地区
    let currentSelectedCountry = e.currentTarget.dataset.selectedcountry

      //改变地区状态（这样，在别的方法中可以读取最近所选的地区）

      //当前是否选择“全部”地区
      if (currentSelectedCountry == 'all_country'){
        var newCountry = 'active-country'
      } else {
        var newCountry = ''
      }

      this.setData({
        current_country: currentSelectedCountry,
        all_active_country: newCountry
      })

    //3.根据这两个条件，读取API数据
    wx.request({
      url: app.globalData.remoteDomainApi + 'movielistclass.php',
      data: {
        cls: currentSelectedClass,
        country: currentSelectedCountry
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data)
        that.setData({
          class_catagory: res.data.class_catagory,
          class_country: res.data.class_country,
          list: res.data.list_datas
        })
      }
    })

  },
  //  电影详情
  gomoviedetail: function (e) {
    // console.log(e)

    // ID
    let id = e.currentTarget.dataset.id;
    // console.log(id)
    // 跳转到详情页
    wx.navigateTo({
      url: '../detailmovie/detailmovie?id=' + id,
    })

  },

  
})