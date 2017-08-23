var that;
// singer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    singers:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
    wx.request({
      url: 'http://tingapi.ting.baidu.com/v1/restserver/ting?from=qianqian&version=2.1.0&method=baidu.ting.artist.get72HotArtist&format=json?=1&offset=0&limit=20',
      success:function(e){
        console.log(e);
        that.setData({
          singers:e.data.artist  
        })
      }
    })
  },
  chooseSinger:function(e){
    console.log(e.currentTarget.id);
    wx.navigateTo({
      url: '/pages/chooseSinger/chooseSinger?id=' + e.currentTarget.id,
    })
  }

})