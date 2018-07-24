Page({
    feed: function(){
        wx.chooseImage({
            count: 1,
            success: function(){
                //Todo validate image after input data
                console.log("Successfully feed!");
            }
        });
    }
})
