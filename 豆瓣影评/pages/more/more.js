var that;
// more.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   title:0,
   imageUrl:0,
   director:0,
   casts:[],
   year:0,
   rate:0,
   summary:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
    wx.request({
      header:{
      "Content-Type":"json"
      },
      url: 'https://api.douban.com/v2/movie/subject/' + options.id,
      success:function(e){
        console.log(e)
        that.setData({
          title:e.data.original_title,
          imageUrl: e.data.images.large,
          director: e.data.directors["0"].name,
          casts: e.data.casts,
          year:e.data.year,
          rate: e.data.rating.average,
          summary: e.data.summary
        })
      }
    })
  }

})