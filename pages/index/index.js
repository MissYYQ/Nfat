//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
   currentTab:0,
   recommend:[],
   attention:[],
   hot:[],
  },


  onLoad:function(options){
    var that = this;
    var uid = wx.getStorageSync('uid');
    // 推荐
   wx.request({
     url: 'http://test.xsir.chat/dynamic/recommend',
     method:'get',
     data:{id:uid},
     success:function(res){
       console.log(res.data);
       that.setData({
        recommend: res.data.data,
       })
     },
     fail:function(res){
       console.log("失败");
     }
   })

  //关注
  wx.request({
    url: 'http://test.xsir.chat/dynamic/attention',
    method:"get",
    data:{id:8},
    success:function(res){
      console.log(res.data);
      that.setData({
       attention: res.data.data,
      })
    },
    fail:function(res){
      console.log("失败");
    }
  })

  //  热门
   wx.request({
    url: 'http://test.xsir.chat/dynamic/hot',
    method:'get',
    success:function(res){
      console.log(res.data);
      that.setData({
       hot: res.data.data,
      })
    },
    fail:function(res){
      console.log("失败");
    }
  })
   },

   onShow: function() {
    this.videoContext = wx.createVideoContext('myvideo', this);
    this.videoContext.requestFullScreen({ direction: 90 });
  },

// 点击切换
  swichNav:function(e){
    // console.log(e);

    if(this.data.currentTab===e.target.dataset.current){
      return false;
    }else{
      this.setData({
        currentTab:e.target.dataset.current
      });
    }
  },

  // 滑动切换
  bindChange:function(e){
    // console.log(e);
    this.setData({
      currentTab:e.detail.current
    })
  },

  //关注
  guanzhu:function(e){
    var index = e.currentTarget.dataset.id;
    console.log(index);
    if(this.data.recommend[index].attention==0){
      var guan = this.data.recommend[index].attention+1;
      // console.log(guan);
      this.setData({
        ["recommend["+index+"].attention"]:guan,
      })
    }else if(this.data.recommend[index].attention==1){
      var qu = this.data.recommend[index].attention-1;
      this.setData({
        ["recommend["+index+"].attention"]:qu,
      })
    }
    var attention = this.data.recommend[index].attention;
    var attention_id = this.data.recommend[index].uid;
    var user_id = wx.getStorageSync('uid');
    var url;
    if(attention==1){
     url = "http://test.xsir.chat/user/follow";
    }else if (attention==0) {
       url = "http://test.xsir.chat/user/unfollow";
    }
    //  console.log(url);
    wx.request({
      url:url,
      method:"get",
      data:{
        pid:attention_id,
        cid:user_id,
      },
      success:function(res){
        console.log(res);
      },
      fail:function(res){
        console.log("失败");
      }
    })

  },


  // 点赞
  add:function(e){
    console.log(e);
    var index = e.currentTarget.dataset.id;
    if(this.data.recommend[index].hit==1){
      var likes = this.data.recommend[index].likes-1;
      this.setData({
        ["recommend["+index+"].hit"]:0,
        ["recommend["+index+"].likes"]:likes
      })
    }else{
      var likes = this.data.recommend[index].likes+1;
      this.setData({
        ["recommend["+index+"].hit"]:1,
        ["recommend["+index+"].likes"]:likes,
      })
    }
  },


// 关注点赞
attentionAdd:function(e){
  var index = e.currentTarget.dataset.id;
  if(this.data.attention[index].hit==1){
    var likes = this.data.attention[index].likes-1;
    this.setData({
      ["attention["+index+"].hit"]:0,
      ["attention["+index+"].likes"]:likes
    })
  }else{
    var likes = this.data.attention[index].likes+1;
    this.setData({
      ["attention["+index+"].hit"]:1,
      ["attention["+index+"].likes"]:likes,
    })
  }
  
  // wx.request({
  //   url:"",
  //   method:get,
  //   data:{hit:this.data.attention[index].hit},
  //   success:function(res){
  //     console.log("成功");
  //   },
  //   fail:function(res){
  //     console.log("失败");
  //   }
  // })
},


  // 热门点赞
  likeAdd:function(e){
    // console.log(e);
    var index = e.currentTarget.dataset.id;
    if(this.data.hot[index].hit==1){
      var likes = this.data.hot[index].likes-1;
      this.setData({
        ["hot["+index+"].hit"]:0,
        ["hot["+index+"].likes"]:likes
      })
    }else{
      var likes = this.data.hot[index].likes+1;
      this.setData({
        ["hot["+index+"].hit"]:1,
        ["hot["+index+"].likes"]:likes,
      })
    }
  },
  
  videoErrorCallback: function (e) {
    console.log('视频错误信息:'+e.detail.errMsg);
   },
  //评论
  comment:function(){
    wx.navigateTo({
      url:"comment/comment",
    })
  },

  publish:function(){
    wx.navigateTo({
      url:"publish/publish",
    })
  }
})

