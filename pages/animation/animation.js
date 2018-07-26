Page({
    containerTap:function(res){
        console.log(res);
        console.log(res.touches[0]);
        var x=184.8;
        var y=307;
        this.setData({
          rippleStyle:''
        });
        this.setData({
          rippleStyle:'top:'+y+'px;left:'+x+'px;-webkit-animation: ripple 0.4s linear;animation:ripple 0.4s linear;'
        });
      }
})