Page({
  data: {
    isAdd: false,
    recommendList: [],
    class: [],
    videoSrc: null
  },
  onLoad: function(options){
    var _this = this
    _this.setData({
      class: []
    })
    wx.request({
      url: 'http://test.xsir.chat/course/findAll',
      method:'GET',
      success(res){
        console.log("课程资源：",res.data.data)
        _this.setData({
          recommendList: res.data.data,
          class: res.data.data[options.id-1]
        })
      },
      fail:function(res){
        console.log("失败");
      }
    })
  },
  //跳转至课程库页面
  toClassAll: function(){
    wx.navigateTo({
      url: '../../train/train-classAll/classAll',
    })
  },
  //跳转至课程详情页面
  toClassDetails:function(e){
    var index = e.currentTarget.dataset.index
    var id = this.data.recommendList[index].id
    wx.navigateTo({
      url: '/pages/train/train-classDetails/classDetails?id='+id,
    })
  },
  add: function(){
    let isAdd = this.data.isAdd
    this.setData({
      isAdd: !isAdd
    })
  },
  play: function(){
    var src = null
    var kind = this.data.class.kind
    console.log(kind)
    if(kind =="腹部" || kind == "腰部"|| kind=="胸部"|| kind=="腰部"|| kind=="减脂"|| kind=="增肌"){
      src = "http://qbgf6efcq.bkt.clouddn.com/video/class/%E8%85%B9%E8%82%8C.mp4"
    }
    if(kind == "肩部"||kind == "背部"||kind=="手臂"|| kind=="塑形"|| kind=="运动康复"){
      src = "http://qbgf6efcq.bkt.clouddn.com/video/class/%E4%B8%80%E5%AD%97%E8%82%A9.mp4"
    }
    if(kind == "腿部"){
      src = "http://qbgf6efcq.bkt.clouddn.com/video/class/%E7%98%A6%E8%85%BF.mp4"
    }
    if(kind == "哈他瑜伽"||kind == "阴瑜伽"||kind == "流瑜伽"||kind == "阿斯汤加"){
      src = "http://qbgf6efcq.bkt.clouddn.com/video/class/%E7%91%9C%E4%BC%BD.mp4"
    }
    if(kind == "全身" || kind == "3-5公里" ||kind == "5-8公里" ||kind == "8公里以上"){
      src = "http://qbgf6efcq.bkt.clouddn.com/video/class/%E8%B7%91%E6%AD%A5.mp4"
    }
    this.setData({
      videoSrc: src
    })
  }
})