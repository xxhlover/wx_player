var that;
var isPlay;
var audioContext;
var animationContext;
var n;
var timer;
var index;
var songList;
var songId;
var obj = require('../../utils/tools.js')
var arr = ['../../image/shunxu.png', '../../image/xunhuan.png', '../../image/suiji.png']
var i = 0;
// play.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    percent: 0,
    musicUrl: 0,
    musicName: 0,
    bgImage: 0,
    playOrPause: '../../image/play.png',
    animationData: {},
    playTypeUrl: arr[i]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    isPlay = false;
    n = 0;
    that = this;
    index = options.index;
    var app = getApp();
    songList = app.globalData.songList;
    songId = songList[index].song_id;
    animationContext = obj.playMusic(animationContext)
    audioContext = wx.createAudioContext('myMusic')
    that.getSongFromNet();
    clearInterval(timer);
  },
  play: function () {
    //暂停
    if (isPlay) {
      audioContext.pause();
      that.setData({
        playOrPause: '../../image/play.png'
      })
      isPlay = false;
      clearInterval(timer);
      timer = null;
    } else {
      //播放
      audioContext.play();
      that.setData({
        playOrPause: '../../image/pause.png'
      })
      timer = setInterval(function () {
        that.rotate();
      }, 50)
      isPlay = true;
    }
  },
  rotate: function () {
    animationContext.rotate(1 * n++);
    animationContext.step();
    that.setData({
      animationData: animationContext.export()
    })
  },
  last: function () {
    if (i == 0) {
      if (index > 0) {
        songId = songList[--index].song_id;
      } else {
        songId = songList[index].song_id;
      }
    } else if (i == 2) {
      index = parseInt(Math.random() * 20)
      songId = songList[index].song_id;
    } else if (i == 1) {
      songId = songList[index].song_id;
    }
    animationContext = obj.playMusic(animationContext)
    audioContext = wx.createAudioContext('myMusic')
    that.play();
    that.getSongFromNet();
    clearInterval(timer);
  },
  next: function () {
    if (i == 0) {
      if (index < songList.length - 1) {
        songId = songList[++index].song_id;
      } else {
        songId = songList[index].song_id;
      }
    } else if (i == 2) {
      console.log('这时候i=' + i);
      index = parseInt(Math.random() * 20);
      songId = songList[index].song_id;
    } else if (i == 1) {
      songId = songList[index].song_id;
    }
    animationContext = obj.playMusic(animationContext)
    audioContext = wx.createAudioContext('myMusic')
    that.play();
    that.getSongFromNet();
    clearInterval(timer);


  },
  timeUpdate: function (e) {
    if (e.detail.currentTime == e.detail.duration) {
      that.next();
    }
    var mypercent = e.detail.currentTime / e.detail.duration * 100;
    that.setData({
      percent: mypercent
    })
  },
  playType: function (e) {
    i++;
    if (i == 3) {
      i = 0;
    }
    this.setData({
      playTypeUrl: arr[i]
    })
    if (i == 0) {
      wx.showToast({
        title: '现在是循环播放',
      })
    } else if (i == 1) {
      wx.showToast({
        title: '现在是单曲循环',
      })
    } else {
      wx.showToast({
        title: '现在是随机播放',
      })
    }


  },
  getSongFromNet: function () {
    //从全局的app.js中的数组中拿到该索引对应的歌曲id
    var songId = songList[index].song_id;
    //向网络请求该id对应的歌曲的详细信息。
    wx.request({
      url: 'http://tingapi.ting.baidu.com/v1/restserver/ting?size=2&type=2&format=json&method=baidu.ting.song.play&songid=' + songId,
      success: function (e) {
        console.log(e)
        that.setData({
          musicUrl: e.data.bitrate.file_link,
          bgImage: e.data.songinfo.pic_big,
          percent: 0,
          musicName: e.data.songinfo.title
        })
        audioContext.setSrc(e.data.bitrate.file_link);
        that.play();
      }
    })
  }

})