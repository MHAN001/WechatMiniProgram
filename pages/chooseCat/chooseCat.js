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
    var that = this;
    var petname = this.data.petname;
    console.log("petname: " + petname);
    wx.request({
      url:'http://localhost:5000/api/game/createPet/'+that.data.username+"?urlnum=1&petname="+that.data.petname,
      method:'GET',
      success:function(res){
        console.log(res.statusCode),
        wx.redirectTo({
          url: '../game/game?username='+that.data.username,
        })
      }
    })
  }
})