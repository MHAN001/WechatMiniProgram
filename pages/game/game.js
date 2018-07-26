const util = require('../../utils/util');
Page({
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
        // wx.getWeRunData({
        //     success(resRun) {
        //         const encryptedData = resRun;
        //         console.log(encryptedData);
        //         wx.request({
        //             url: 'http://localhost:51000/api/values/'+'123',
        //             data: {
        //                 encryptedData: resRun.encryptedData,
        //                 iv: resRun.iv
        //             },
        //             method: 'POST',
        //             success: function (resDecrypt) {
        //                 console.log(resDecrypt);
        //                 // var runData = JSON.parse(resDecrypt.data.data);
        //                 // console.log(runData);
        //             }
        //         });
        //     }
        // });
        var secret = "Secret tst";
        wx.login({
            success: function(resLogin){
                if(resLogin.code){
                    wx.request({
                        url: "https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code",
                        data:{
                            js_code : resLogin.code,
                            appid: "wx26f098a4803f8d2e",
                            secret: this.secret,
                            grant_type: "authorization_code"
                        },
                        success: function(resSession){
                            console.log(resSession);

                        }
                    });
                }else{
                    console.log("login failed");
                }
            }
        });        
    }
})
