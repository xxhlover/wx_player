// index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  jumpToSongList: function (e) {
    console.log(e.target.id);
    wx.navigateTo({
      url: '/pages/songList/songList?listType=' + e.target.id,
    })
  }
})