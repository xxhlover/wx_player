var input;
var that;
// search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
  },
  myInput:function(e){
    input = e.detail.value;
  },
  mySearch:function(){
    wx.request({
      header:{
        "Content-Type":"json"
      },
      url: 'https://api.douban.com/v2/movie/search?q='+input,
      success:function(e){
        that.setData({
          movies:e.data.subjects
        })
      }
    })
  }

  
})