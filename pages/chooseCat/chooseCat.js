Page({
  data: {
    imgUrls: [
      '../../resource/cat.jpg',
      '../../resource/elegant.png',
      '../../resource/dog.png',
      '../../resource/rabbit.png'
    ],
    swiperIndex: 0 
  },
  bindchange(e) {
    this.setData({
      swiperIndex: e.detail.current
    })
  },
  select(o){
    var id = o.target.id;
    wx.redirectTo({
      url: "../game/game?id="+id
    });
  }
})