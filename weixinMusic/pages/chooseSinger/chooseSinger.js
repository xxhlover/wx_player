var that;
// chooseSinger.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sings:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
    console.log(options.id);
    wx.request({
      url: 'http://tingapi.ting.baidu.com/v1/restserver/ting?from=qianqian&version=2.1.0&method=baidu.ting.artist.getSongList&format=json?=2&offset=0&limits=50&tinguid=' + options.id,
      success:function(e){
        console.log(e);
        that.setData({
          sings: e.data.songlist
        })
        var app = getApp();
        app.globalData.songList = e.data.songlist;
      }
    })
  },
  play:function(e){
    console.log(e);
    wx.navigateTo({
      url: '/pages/play/play?index=' +e.currentTarget.id,
    })
  }
})