Page({
  data: {
    classData: []
  },
  onLoad: function(){
    var _this = this
    // 课程
    wx.request({
      url: 'http://test.xsir.chat/course/findAll',
      method:'GET',
      success(res){
        _this.setData({
          classData: res.data.data
        })
      },
      fail:function(res){
        console.log("失败");
      }
    })
  },
  //跳转至课程详情页面
  toClassDetails:function(e){
    var index = e.currentTarget.dataset.index
    var id = this.data.classData[index].id
    wx.navigateTo({
      url: '/pages/train/train-classDetails/classDetails?id='+id,
    })
  }
})