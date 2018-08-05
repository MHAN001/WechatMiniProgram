Page({
  data: {
    imgUrls: [
      '../../resource/cat.jpg',
      '../../resource/elegant.png',
      '../../resource/dog.png',
      '../../resource/rabbit.png'
    ],
    swiperIndex: 0 ,
    username:'',
    petname:''
  },
  onLoad:function(option){
    this.data.username = option.username;
    wx.request({
      url:'http://localhost:5000/api/game/createuser/'+this.data.username,
      method:'GET',
      success:function(res){
        console.log(res.statusCode);
      }
    })
  },

  bindchange(e) {
    this.setData({
      swiperIndex: e.detail.current
    })
  },

  setPetName:function(e){
    this.setData({
      petname:e.detail.value,
    })
  },

  select(o){
    wx.request({
      url:'http://localhost:5000/api/game/createPet/'+this.data.username+"?urlnum=1&petname="+this.data.petname,
      method:'GET',
      success:function(res){
        console.log(res.statusCode),
        wx.redirectTo({
          url: '../game/game?username='+this.data.username,
        })
      }
    })
  }
})