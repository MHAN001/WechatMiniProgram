const util = require('../../utils/util');

Page({
    data: {
        foods : 0
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
            success: function(resLogin){
                if(resLogin.code){
                    wx.request({
                        url: "https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code",
                        data:{
                            js_code : resLogin.code,
                            appid: "wx1730947c98cfd8ad",
                            secret: "e91a300b390e45e4133cea893b7fca0c",
                            grant_type: "authorization_code"
                        },
                        success: function(resSession){
                            console.log(resSession);   //TODO DELETE
                            wx.getWeRunData({
                                success(resRun) {
                                    const encryptedData = resRun;
                                    console.log(encryptedData);
                                    wx.request({
                                        url: 'http://localhost:51000/api/values/'+'123',
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
                                                foods : tmp
                                            });
                                            // var runData = JSON.parse(resDecrypt.data.data);
                                            // console.log(runData);
                                        }
                                    });
                                }
                            });

                        }
                    });
                }else{
                    console.log("login failed");
                }
            }
        });        
    }
})
