const util = require('../../utils/util');
var imgId;
var food;
Page({
    onLoad: function (option) {
        this.setData({
            imgId : option.id
        })
    },
    onReady: function() {
        this.drawBigFood();
        var that = this;
        this.position = {
            x: 155,
            y: 155,
            vx: 0,
            vy: 0,
            ax: 0,
            ay: 0
        }
        wx.onAccelerometerChange(function (res) {
            that.setData({
              x: res.x.toFixed(2),
              y: res.y.toFixed(2),
              z: res.z.toFixed(2)
            })
            that.position.ax = Math.sin(res.x * Math.PI / 2)
            that.position.ay = -Math.sin(res.y * Math.PI / 2)
            //that.drawSmallBall()
          })

        this.interval = setInterval(function () {
            that.drawBigFood()
        }, 17)
    },
    data: {
        foods: 0,
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
        b: 0
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
                            console.log(resSession);   //TODO DELETE
                            wx.getWeRunData({
                                success(resRun) {
                                    const encryptedData = resRun;
                                    console.log(encryptedData);
                                    wx.request({
                                        url: 'http://localhost:51000/api/values/' + '123',
                                        data: {
                                            encryptedData: resRun.encryptedData,
                                            iv: resRun.iv,
                                            sessionKey: resSession.data.session_key
                                        },
                                        method: 'POST',
                                        success: function (resDecrypt) {
                                            var tmp = resDecrypt.data.stepInfoList[0].step;
                                            console.log(tmp);
                                            that.setData({
                                                foods: tmp
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
        context.arc(151, 151, 140, 0, Math.PI * 2)
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
        var p = this.position
        var strokeStyle = 'rgba(1,1,1,0)'

        p.x = p.x + p.vx
        p.y = p.y + p.vy
        p.vx = p.vx + p.ax
        p.vy = p.vy + p.ay

        if (Math.sqrt(Math.pow(Math.abs(p.x) - 151, 2) + Math.pow(Math.abs(p.y) - 151, 2)) >= 115) {
        if (p.x > 151 && p.vx > 0) {
            p.vx = 0
        }
        if (p.x < 151 && p.vx < 0) {
            p.vx = 0
        }
        if (p.y > 151 && p.vy > 0) {
            p.vy = 0
        }
        if (p.y < 151 && p.vy < 0) {
            p.vy = 0
        }
        strokeStyle = '#ff0000'
        }

        var context = wx.createContext()
        context.beginPath(0)
        context.arc(p.x, p.y, 15, 0, Math.PI * 2)
        context.setFillStyle('#1aad19')
        context.setStrokeStyle(strokeStyle)
        context.fill()
        // context.stroke()
        wx.drawCanvas({
        canvasId: 'small-ball',
        actions: context.getActions()
        })
    },
    onUnload: function () {
        clearInterval(this.interval)
    }
})
