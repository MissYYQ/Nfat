Page({
  data: {
    allClass: 2,
    recommendList: [],
  },
  onLoad: function(){
    var _this = this
    // 课程
    wx.request({
      url: 'http://test.xsir.chat/course/findAll',
      method:'GET',
      success(res){
        // console.log("课程资源：",res.data.data)
        _this.setData({
          recommendList: res.data.data
        })
      },
      fail:function(res){
        console.log("失败");
      }
    })
  },
  // 跳转至我的课程页面
  toMyClass: function(){
    wx.navigateTo({
      url: '../../pages/mine/mine-class/class'
    })
  },
  //跳转至课程库页面
  toClassAll: function(){
    wx.navigateTo({
      url: '../../pages/train/train-classAll/classAll',
    })
  },
  //跳转至课程详情页面
  toClassDetails:function(e){
    var index = e.currentTarget.dataset.index
    var id = this.data.recommendList[index].id
    wx.navigateTo({
      url: '../../pages/train/train-classDetails/classDetails?id='+id,
    })
  },
})