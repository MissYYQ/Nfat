// pages/mine/mine-foodGuides/foodGuides.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight:0,
    windowWidth:0,
    currentTap:0,
    recipe_domain:[
      {recipeinfo:[
        {time:"早餐",recipe:    [
          {type:"主食",food:[{img:"http://qbgf6efcq.bkt.clouddn.com/image/mine/foodGuides/包子.jpg",id:"0",name:"肉包",kal:"100",num:"1",danwei:"个",perkal:"100",type:"主食"},{img:"http://qbgf6efcq.bkt.clouddn.com/image/mine/foodGuides/酸奶.jpg",id:"1",name:"奶盖",kal:"100",num:"1",danwei:"杯",perkal:"100",type:"蛋白质"}],totalcal:"200"},
          {type:"蛋白质",food:[{img:"http://qbgf6efcq.bkt.clouddn.com/image/mine/foodGuides/酸奶.jpg",id:"1",name:"酸奶",kal:"100",num:"1",danwei:"杯",perkal:"100",type:"蛋白质"}],totalcal:"100"},
          {type:"蔬果",food:[{img:"http://qbgf6efcq.bkt.clouddn.com/image/mine/foodGuides/苦瓜.jpg",id:"2",name:"苦瓜",kal:"100",num:"1",danwei:"个",perkal:"100",type:"蔬果"}],totalcal:"100"},
          {type:"油脂",food:[{img:"http://qbgf6efcq.bkt.clouddn.com/image/mine/foodGuides/巴旦木.jpg",id:"3",name:"巴旦木",kal:"200",num:"20",danwei:"克",perkal:"10",type:"油脂"}],totalcal:"200"}
        ],totalcal:"600"},
        {time:"中餐",recipe:    [
          {type:"主食",food:[{img:"http://qbgf6efcq.bkt.clouddn.com/image/mine/foodGuides/包子.jpg",id:"0",name:"肉包",kal:"100",num:"1",danwei:"个",perkal:"100",type:"主食"}],totalcal:"100"},
          {type:"蛋白质",food:[{img:"http://qbgf6efcq.bkt.clouddn.com/image/mine/foodGuides/酸奶.jpg",id:"1",name:"酸奶",kal:"100",num:"1",danwei:"杯",perkal:"100",type:"蛋白质"}],totalcal:"100"},
          {type:"蔬果",food:[{img:"http://qbgf6efcq.bkt.clouddn.com/image/mine/foodGuides/苦瓜.jpg",id:"2",name:"苦瓜",kal:"100",num:"1",danwei:"个",perkal:"100",type:"蔬果"}],totalcal:"100"},
          {type:"油脂",food:[{img:"http://qbgf6efcq.bkt.clouddn.com/image/mine/foodGuides/巴旦木.jpg",id:"3",name:"巴旦木",kal:"200",num:"20",danwei:"克",perkal:"10",type:"油脂"}],totalcal:"200"}
        ],totalcal:"500"},
        {time:"晚餐",recipe:    [
          {type:"主食",food:[{img:"http://qbgf6efcq.bkt.clouddn.com/image/mine/foodGuides/包子.jpg",id:"0",name:"肉包",kal:"100",num:"1",danwei:"个",perkal:"100",type:"主食"}],totalcal:"100"},
          {type:"蛋白质",food:[{img:"http://qbgf6efcq.bkt.clouddn.com/image/mine/foodGuides/酸奶.jpg",id:"1",name:"酸奶",kal:"100",num:"1",danwei:"杯",perkal:"100",type:"蛋白质"}],totalcal:"100"},
          {type:"蔬果",food:[{img:"http://qbgf6efcq.bkt.clouddn.com/image/mine/foodGuides/苦瓜.jpg",id:"2",name:"苦瓜",kal:"100",num:"1",danwei:"个",perkal:"100",type:"蔬果"}],totalcal:"100"},
          {type:"油脂",food:[{img:"http://qbgf6efcq.bkt.clouddn.com/image/mine/foodGuides/巴旦木.jpg",id:"3",name:"巴旦木",kal:"200",num:"20",danwei:"克",perkal:"10",type:"油脂"}],totalcal:"200"}
        ],totalcal:"500"}
      ]
        ,day:"2020/06/06"
      },
      {recipeinfo:[
        {time:"早餐",recipe:    [
          {type:"主食",food:[{img:"http://qbgf6efcq.bkt.clouddn.com/image/mine/foodGuides/包子.jpg",id:"0",name:"肉包",kal:"100",num:"1",danwei:"个",perkal:"100",type:"主食"}],totalcal:"100"},
          {type:"蛋白质",food:[{img:"http://qbgf6efcq.bkt.clouddn.com/image/mine/foodGuides/酸奶.jpg",id:"1",name:"酸奶",kal:"100",num:"1",danwei:"杯",perkal:"100",type:"蛋白质"}],totalcal:"100"},
          {type:"蔬果",food:[{img:"http://qbgf6efcq.bkt.clouddn.com/image/mine/foodGuides/苦瓜.jpg",id:"2",name:"苦瓜",kal:"100",num:"1",danwei:"个",perkal:"100",type:"蔬果"}],totalcal:"100"},
          {type:"油脂",food:[{img:"http://qbgf6efcq.bkt.clouddn.com/image/mine/foodGuides/巴旦木.jpg",id:"3",name:"巴旦木",kal:"200",num:"20",danwei:"克",perkal:"10",type:"油脂"}],totalcal:"200"}
        ],totalcal:"500"},
        {time:"中餐",recipe:    [
          {type:"主食",food:[{img:"http://qbgf6efcq.bkt.clouddn.com/image/mine/foodGuides/包子.jpg",id:"0",name:"肉包",kal:"100",num:"1",danwei:"个",perkal:"100",type:"主食"}],totalcal:"100"},
          {type:"蛋白质",food:[{img:"http://qbgf6efcq.bkt.clouddn.com/image/mine/foodGuides/酸奶.jpg",id:"1",name:"酸奶",kal:"100",num:"1",danwei:"杯",perkal:"100",type:"蛋白质"}],totalcal:"100"},
          {type:"蔬果",food:[{img:"http://qbgf6efcq.bkt.clouddn.com/image/mine/foodGuides/苦瓜.jpg",id:"2",name:"苦瓜",kal:"100",num:"1",danwei:"个",perkal:"100",type:"蔬果"}],totalcal:"100"},
          {type:"油脂",food:[{img:"http://qbgf6efcq.bkt.clouddn.com/image/mine/foodGuides/巴旦木.jpg",id:"3",name:"巴旦木",kal:"200",num:"20",danwei:"克",perkal:"10",type:"油脂"}],totalcal:"200"}
        ],totalcal:"500"},
        {time:"晚餐",recipe:    [
          {type:"主食",food:[{img:"http://qbgf6efcq.bkt.clouddn.com/image/mine/foodGuides/包子.jpg",id:"0",name:"肉包",kal:"100",num:"1",danwei:"个",perkal:"100",type:"主食"}],totalcal:"100"},
          {type:"蛋白质",food:[{img:"http://qbgf6efcq.bkt.clouddn.com/image/mine/foodGuides/酸奶.jpg",id:"1",name:"酸奶",kal:"100",num:"1",danwei:"杯",perkal:"100",type:"蛋白质"}],totalcal:"100"},
          {type:"蔬果",food:[{img:"http://qbgf6efcq.bkt.clouddn.com/image/mine/foodGuides/苦瓜.jpg",id:"2",name:"苦瓜",kal:"100",num:"1",danwei:"个",perkal:"100",type:"蔬果"}],totalcal:"100"},
          {type:"油脂",food:[{img:"http://qbgf6efcq.bkt.clouddn.com/image/mine/foodGuides/巴旦木.jpg",id:"3",name:"巴旦木",kal:"200",num:"20",danwei:"克",perkal:"10",type:"油脂"}],totalcal:"200"}
        ],totalcal:"500"}
      ]
        ,day:"2020/06/07"
      }
    ]

  },

  switchTap:function(e)
  {
    this.setData({
      currentTap:e.currentTarget.dataset.id
    })
  },

  idiot:function(e)
  {
    wx.navigateTo({
      url: './foodIdiotIndex/IdiotIndex?time='+e.currentTarget.dataset.time+'&day='+e.currentTarget.dataset.day,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getSystemInfo({
      success (res) {
        that.setData({
          statusBarHeight:res.statusBarHeight,
          windowWidth:res.windowWidth
        })
      }
    })
//从数据库中向recipe_domain实体赋值
  }
})