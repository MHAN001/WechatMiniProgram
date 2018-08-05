//index.js
//获取应用实例
const app = getApp()
var username
Page({
  data: {
    username:'',
    motto: 'Welcome',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  startGame: function(){
    
    wx.navigateTo({
      url:'../game/game'
    }
    )
  },
  animation: function(res){
    console.log(res);
    console.log(res.touches[0]);
    var x=182;
    var y=458+100;
    this.setData({
      rippleStyle:''
    });
    this.setData({
      rippleStyle:'top:'+y+'px;left:'+x+'px;-webkit-animation: ripple 0.4s linear;animation:ripple 0.4s linear;'
    });
    wx.navigateTo({
      url: '../chooseCat/chooseCat'
    });
    // wx.navigateTo({
    //   url: '../animation/animation'
    // })
  },
  onLoad: function () {
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    // }
    var that = this
    wx.login({
      success: function(res){
        wx.getUserInfo({
          withCredentials: true,
          success: res => {
            app.globalData.userInfo = res.userInfo
            that.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
          }
        })
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            appid: 'wx1730947c98cfd8ad',
            secret:'e91a300b390e45e4133cea893b7fca0c',
            js_code:res.code,
            grant_type:'authorization_code'
          },
          method: 'GET',
          success: function(res){
            console.log(res)
          }
        })
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
