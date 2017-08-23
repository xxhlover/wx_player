var that;
var page = 0;
// more.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    that.linkNet(0);
  },
  jumpTomore: function (e) {
    console.log(e.currentTarget.id);
    wx.navigateTo({
      url: '/pages/more/more?id=' + e.currentTarget.id,
    })
  },
  linkNet: function (page) {
    wx.request({
      header: {
        "Content-Type": "json"
      },
      url: 'https://api.douban.com/v2/movie/in_theaters',
      data: {
        start: 10 * page,
        count: 10,
        city: '成都'
      },
      success: function (e) {
        console.log(e);
        if (e.data.subjects.length == 0) {
          wx.showToast({
            title: '没有更多数据',
          })
        } else {
          that.setData({
            movies: that.data.movies.concat(e.data.subjects)
          })
        }
      }
    })
  },
  onReachBottom: function () {
    that.linkNet(++page);
  }
})