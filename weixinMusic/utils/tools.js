function playMusic(animationContext){
  animationContext = wx.createAnimation({
    duration: 100,
    timingFunction: 'linear'
  })
  return animationContext
}
module.exports = {
  playMusic: playMusic

}