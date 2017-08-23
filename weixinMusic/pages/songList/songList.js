var that;
// songList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songList: [],
    musicUrl: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    var listType = options.listType;
    var myurl = 'http://tingapi.ting.baidu.com/v1/restserver/ting?from=android&version=5.9.0.0&channel=ppzs&operator=0&method=baidu.ting.billboard.billList&format=json&offset=0&size=20&fields=song_id%2Ctitle%2Cauthor%2Calbum_title%2Cpic_big%2Cpic_small%2Chavehigh%2Call_rate%2Ccharge%2Chas_mv_mobile%2Clearn%2Csong_source%2Ckorean_bb_song&type=' + listType;
    wx.request({
      url: myurl,
      success: function (obj) {
        that.setData({
          songList: obj.data.song_list
        })
        var app = getApp();
        app.globalData.songList = obj.data.song_list;
      }
    })
  },
  chooseMusic: function (e) {
    wx.navigateTo({
      url: '/pages/play/play?index=' + e.currentTarget.id,
    })
  }


})