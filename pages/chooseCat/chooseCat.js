Page({
  data: {
    username: '',
    petname: '',
    imgUrls: [
      '../../resource/cat.jpg',
      '../../resource/elegant.png',
      '../../resource/dog.png',
      '../../resource/rabbit.png'
    ],
    swiperIndex: 0 ,
  },
  onLoad: function(option){
    console.log("chooscat parameter:"+option.username)
    this.setData({
      username : option.username
    })
  },

  bindchange(e) {
    this.setData({
      swiperIndex: e.detail.current
    })
  },

  setPetName: function(e){
    this.setData({
      petname: e.detail.value
    })
  },

  select: function(e){
    var that = this;
    console.log("petname: " + this.data.petname);
    wx.request({
      url:'https://wechatapiserver.azurewebsites.net/api/game/createPet?username='+that.data.username+'&urlnum='+e.target.id+'&petname='+that.data.petname,
      method:'GET',
      success:function(res){
        console.log("chooscat"+that.data.username)
        wx.redirectTo({
          url: '../game/game?username='+that.data.username,
        })
      }
    })
  }
})