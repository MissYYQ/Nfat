Page({
  data: {
    isAllChecked: false,
    total: 3338,
    cart: [
      {
        id: 1,
        imgUrl: "http://qbgf6efcq.bkt.clouddn.com/image/mine/cart/1.jpg",
        title: "NFat 智能运动手环B1-夜跑",
        color: "白色",
        money: 139,
        count: 1
      },
      {
        id: 2,
        imgUrl: "http://qbgf6efcq.bkt.clouddn.com/image/mine/cart/2.jpg",
        title: "NFat 智能动感单车C1",
        color: "白色",
        money: 3199,
        count: 1
      }
    ]
  },

  // 减数
  delCount: function(e){
    var index= e.target.dataset.index
    var count = this.data.cart[index].count
    var that = this
    if(count > 1){
      --count;
    }
    that.setData({
      ["cart["+index+"].count"]:count
    })
  },

  // 加数
  addCount: function(e){
    var index= e.target.dataset.index
    var count = this.data.cart[index].count
    if(count < 10){
      ++count
    }
    this.setData({
      ["cart["+index+"].count"]:count
    })
  },

  // 全选
  allChecked: function(e){
    let isAllChecked = this.data.isAllChecked
    this.setData({
      isAllChecked: !isAllChecked
    })
    console.log("isAllChecked："+  this.data.isAllChecked)
  },
  
})