var helper = {

  titleName: "我的图书",

  //统计购物车数量
  cartCount: function(that, allDatas) {

    //获取当前购物车中的所购买的产品的总数量

    var totalCounts = 0;

    //购买的图书的总数量
    if (allDatas.book.length > 0) {

      for (let i = 0; i < allDatas.book.length; i++) {

        totalCounts += parseInt(allDatas.book[i].count)

      }

    }

    //购买的音乐的总数量
    if (allDatas.music.length > 0) {

      for (let i = 0; i < allDatas.music.length; i++) {

        totalCounts += parseInt(allDatas.music[i].count)

      }

    }


    //购买的电影的总数量
    if (allDatas.movie.length > 0) {

      for (let i = 0; i < allDatas.movie.length; i++) {

        totalCounts += parseInt(allDatas.movie[i].count)

      }

    }

    //显示购物车数量
    that.setData({
      cartCounts: totalCounts
    })

    //返回购买数量
    return totalCounts;

  },

  // 数量+1
  addsub: function(e, openid, that_, action) {

    //  所点的分类
    let item = e.currentTarget.dataset.item;

    // 所点的产品ID
    let pid = e.currentTarget.dataset.pid;

    // 每点击一次，重新更新S投入阿哥，2.重新渲染数据

    console.log(e);

    // 1.获取本地数据
    var storageDatas = wx.getStorageSync(openid);
    // console.log(openid)
    // 1.2更新本地数据
    var bookData = storageDatas.book;

    var musicData = storageDatas.music;

    var movieData = storageDatas.movie;

    var this_=this;

    if (item == 'book') {
      for (let i = 0; i < bookData.length; i++) {

        if (bookData[i].pid == pid) {
          if (action == 'add') {
            bookData[i].count++;
          } else if (action == 'sub') {
            if (bookData[i].count == 1) {

              // 直接删除
              // bookData.splice(i, 1);
              wx.showModal({
                title: '提示',
                content: '数据为0被清出购物车',
                success(res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                    // bookData.splice(i, 1);
                    this_.addsub(e, openid, that_, 'del');
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            } else {
              bookData[i].count--;
            }
          } else {
            bookData.splice(i, 1)
          }
        }
      }
    } else if (item == 'music') {
      for (let i = 0; i < musicData.length; i++) {

        if (musicData[i].pid == pid) {
          if (action == 'add') {
            musicData[i].count++;
          } else if (action == 'sub') {
            if (musicData[i].count == 1) {

              // 直接删除
              // musicData.splice(i, 1);
              wx.showModal({
                title: '提示',
                content: '数据为0被清出购物车',
                success(res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                    // bookData.splice(i, 1);
                    this_.addsub(e, openid, that_, 'del');
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            } else {
              musicData[i].count--;
            }
          } else {
            musicData.splice(i, 1);
          }
        }
      }

    } else {
      for (let i = 0; i < movieData.length; i++) {

        if (movieData[i].pid == pid) {
          if (action == 'add') {
            movieData[i].count++;
          } else if (action == 'sub') {
            if (movieData[i].count == 1) {

              // 直接删除
              // movieData.splice(i, 1);
              wx.showModal({
                title: '提示',
                content: '数据为0被清出购物车',
                success(res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                    this_.addsub(e, openid, that_, 'del');
                    // bookData.splice(i, 1);
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            } else {
              movieData[i].count--;
            }
          } else {
            movieData.splice(i, 1);
          }
        }
      }


    }

    // console.log(storageDatas)
    // 1.3重新设置Storage
    wx.setStorageSync(openid, storageDatas)

    that_.setData({
      bookDatas: storageDatas.book,
      musicDatas: storageDatas.music,
      movieDatas: storageDatas.movie
    })

    // 3.购物车数量的显示
    let counts = this.cartCount(that_, storageDatas);
    // console.log(counts)
    wx.setTabBarBadge({
      index: 2,
      text: counts.toString()
    })
    // 4.统计总价
    let totalPrice=this.countPrice(storageDatas);
    
    // 渲染到模板
    that_.setData({
      totalPrice: totalPrice
    })

  },
  // 统计购物车总金额
  countPrice:function(allDatas){
    // console.log(allDatas)
   let totalPrice=0;


  for (let i = 0; i < allDatas.book.length; i++) {
    //数量
    let counts = allDatas.book[i].count;
    // 单价
    let price = allDatas.book[i].pdatas.price;
    //总计
    totalPrice += counts * price;
  }

  for (let i = 0; i < allDatas.music.length; i++) {
    //数量
    let counts = allDatas.music[i].count;
    // 单价
    let price = allDatas.music[i].pdatas.price;
    //总计
    totalPrice += counts * price;
  }

  for (let i = 0; i < allDatas.movie.length; i++) {
    //数量
    let counts = allDatas.movie[i].count;
    // 单价
    let price = allDatas.movie[i].pdatas.price;
    //总计
    totalPrice += counts * price;
  }

return totalPrice;
    //图书总价

    //音乐总价

    // 电影总价

}

}

module.exports = helper;