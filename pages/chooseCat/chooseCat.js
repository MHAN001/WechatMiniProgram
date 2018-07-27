Page({
  data: {
    imgUrls: [
      '../../resource/cat.jpg',
      '../../resource/elegant.png',
      '../../resource/dog.png',
      '../../resource/rabbit.png'
    ],
    swiperIndex: 0 //这里不写第一次启动展示的时候会有问题
  },
bindchange(e) {
    this.setData({
      swiperIndex: e.detail.current
    })
  }
})