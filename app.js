// app.js
App({
  globalData:{
    screenWidth:375,
    screenHeight:667,
    statusHeight:20,
    contentHeight:500
  },
  onLaunch(){
    // 1、获取设备的信息
    wx.getWindowInfo({
      success:(res)=>{
        this.globalData.screenWidth = res.screenWidth
        this.globalData.screenHeight = res.screenHeight
        this.globalData.statusHeight = res.statusHeight
        // 44为导航栏的固定高度
        this.globalData.contentHeight = res.screenHeight - res.statusBarHeight - 44
      }
    })
  }
})
