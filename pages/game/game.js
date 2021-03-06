
 const util = require('../../utils/util');
// var imgId;
// var food;
Page({
  data: {
    username: '',
    //foods,
    imgUrls: [
      '../../resource/cat.jpg',
      '../../resource/elegant.png',
      '../../resource/dog.png',
      '../../resource/rabbit.png'
    ],
    x: 0,
    y: 0,
    z: 0,
    a: 0,
    b: 0,
    name: '',
    age: 0,
    weight: 0,
    imgNum: 0,
    petexercise: 0,
  },

  onReady: function() {
    this.drawBigFood();
  },


  onLoad: function (option) {
    this.setData({
      username: option.username
    })
    this.getSteps()
    this.getPetData()
  },

  getPetData:function(){
    var that = this;
    wx.request({
      url: 'https://wechatapiserver.azurewebsites.net/api/game/getpet?username=' + this.data.username,
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        that.setData({
          age: res.data.age,
          name: res.data.name,
          weight: res.data.weight,
          imgNum: res.data.imageNum
        })
      }
    })
  },

  onReady: function() {
    this.drawBigFood();
    var that = this;

    this.positions = new Array(
      { x: 20, y: 80, vx: 0, vy: 0, ax: 0, ay: 0, rate: 0.8 },
      { x: 40, y: 80, vx: 0, vy: 0, ax: 0, ay: 0, rate: 0.6},
      { x: 60, y: 80, vx: 0, vy: 0, ax: 0, ay: 0, rate: 1 },
      { x: 80, y: 80, vx: 0, vy: 0, ax: 0, ay: 0, rate: 0.7 },
      { x: 100, y: 80, vx: 0, vy: 0, ax: 0, ay: 0, rate: 0.9 }
    );
      
    wx.onAccelerometerChange(function (res) {
      that.setData({
        x: res.x.toFixed(2),
        y: res.y.toFixed(2),
        z: res.z.toFixed(2)
      })

      for(var i = 0;i<5;i++){
        var p = that.positions[i];
        p.ax = Math.sin(res.x * Math.PI / 2)
        p.ay = -Math.sin(res.y * Math.PI / 2)
      }
      // that.drawSmallBall()
    });

    this.interval = setInterval(function () {
      that.drawsmallFood();
    }, 50);
  },

  
  feed: function () {
      wx.chooseImage({
          count: 1,
          success: function () {
              //Todo validate image after input data
              console.log("Successfully feed!");
          }
      });
  },
  getSteps: function () {
      var that = this;

      var secret = "Secret tst";
      wx.login({
          success: function (resLogin) {
              if (resLogin.code) {
                  wx.request({
                      url: "https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code",
                      data: {
                          js_code: resLogin.code,
                          appid: "wx1730947c98cfd8ad",
                          secret: "e91a300b390e45e4133cea893b7fca0c",
                          grant_type: "authorization_code"
                      },
                      success: function (resSession) {
                          wx.getWeRunData({
                              success(resRun) {
                                  const encryptedData = resRun;
                                  console.log(encryptedData);
                                  wx.request({
                                      url: 'https://wechatapiserver.azurewebsites.net/api/decrypt/' + '123',
                                      data: {
                                          encryptedData: resRun.encryptedData,
                                          iv: resRun.iv,
                                          sessionKey: resSession.data.session_key
                                      },
                                      method: 'POST',
                                      success: function (resDecrypt) {
                                          var tmp = resDecrypt.data.stepInfoList[30].step;
                                          console.log(tmp);
                                          that.setData({
                                            petexercise: tmp
                                          });
                                          // var runData = JSON.parse(resDecrypt.data.data);
                                          // console.log(runData);
                                      }
                                  });
                              }
                          });

                      }
                  });
              } else {
                  console.log("login failed");
              }
          }
      });
  },
  onChange: function(e) {
      console.log(e.detail)
  },
  onScale: function(e) {
    console.log(e.detail)
  },
  drawBigFood: function(){
      var context = wx.createContext()
      context.beginPath(0)
      context.rect(0, 0, 100, 100) //Math.PI * 2
      context.setFillStyle('#ffffff')
      context.setStrokeStyle('#aaaaaa')
      context.fill()
      // context.stroke()
      wx.drawCanvas({
        canvasId: 'big-ball',
        actions: context.getActions()
      })
  },
  drawsmallFood: function(){
      var points = this.positions
      var strokeStyle = 'rgba(1,1,1,0)'

      //iterate 5 balls, cal their positions
      for(var i = 0;i<5;i++)
      {
        var p = points[i];
        p.x = p.x + p.vx
        p.y = p.y + p.vy
        p.vx = p.vx + p.ax*p.rate
        p.vy = p.vy + p.ay*p.rate
      

        //specify the border of coordinator X:
        if((p.x < 7.5 && p.vx < 0) || (p.x > 300 && p.vx > 0)){
          p.vx = 0;
        }

        //specify the border of coordinator Y:
        if((p.y < 7.5 && p.vy < 0) || (p.y > 180 && p.vy > 0)){
          p.vy = 0;
        }
      }

        // if (Math.sqrt(Math.pow(Math.abs(p.x) - 151, 2) + Math.pow(Math.abs(p.y) - 151, 2)) >= 115)
        //   if (p.x > 151 && p.vx > 0) {
        //     p.vx = 0
        //   }
        //   if (p.x < 151 && p.vx < 0) {
        //     p.vx = 0
        //   }
        //   if (p.y > 151 && p.vy > 0) {
        //     p.vy = 0
        //   }
        //   if (p.y < 151 && p.vy < 0) {
        //     p.vy = 0
        //   }
        //   strokeStyle = '#ff0000'
        // }
        //console.log("px"+p.x+ "py:"+p.y);
      
      var context = wx.createContext()
      var clearCanvas = false;
      for(var i = 0;i<5;i++)
      {
        var p = points[i];
        if(p.y>20){
          context.beginPath(0);
          context.arc(p.x, p.y, 15, 0, Math.PI * 2);
          context.setFillStyle('#1aad19');
          context.setStrokeStyle(strokeStyle);
          context.fill();
        }

        else{
          clearCanvas = true;
        }
      }
      if(!clearCanvas){
        wx.drawCanvas({
          canvasId: 'big-ball',
          actions: context.getActions()
        })
      }
      else{
        context.clearActions();
        console.log("this is in else case");
        wx.drawCanvas({
          canvasId:'big-ball',
          actions: context.getActions()
        });
        this.EatFood();
      }
      
  },
  EatFood:function(){
    clearInterval(this.interval);
    var that = this;
    wx.request({
      url:'https://wechatapiserver.azurewebsites.net/api/game/update/testuser',
      method: 'POST',
      data:'1/5',
      success:function(res){
        console.log("success feed");
        that.getPetData();
      }
    });
  },
  onUnload: function () {
      clearInterval(this.interval)
  }
})
