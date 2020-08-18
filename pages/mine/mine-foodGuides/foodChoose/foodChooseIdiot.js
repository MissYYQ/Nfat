// pages/mine/mine-foodGuides/foodChoose/foodChooseIdiot.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    numrange:[1,2,3,4,5,6,7,8,9,10],//数量选择数组
    
    day:"",//要修改的日期0:今日1：明日
    time:"",//修改的早中晚时间0:早餐依次类推
    foodtype:"",//修改的食物类型[0:主食1:蛋白质2:蔬果3:油脂]
    choosen:[
    ],//选中的食物
    choosenkal:0,
    chossingFood:[
      {domain:{img:"http://qbgf6efcq.bkt.clouddn.com/image/mine/foodGuides/包子.jpg",id:"0",name:"肉包",kal:"100",num:"1",danwei:"个",perkal:"100",type:"主食"},choosed:0},
      {domain:{img:"http://qbgf6efcq.bkt.clouddn.com/image/mine/foodGuides/酸奶.jpg",id:"1",name:"酸奶",kal:"100",num:"1",danwei:"杯",perkal:"100",type:"蛋白质"},choosed:0},
      {domain:{img:"http://qbgf6efcq.bkt.clouddn.com/image/mine/foodGuides/苦瓜.jpg",id:"2",name:"苦瓜",kal:"100",num:"1",danwei:"个",perkal:"100",type:"蔬果"},choosed:0},
      {domain:{img:"http://qbgf6efcq.bkt.clouddn.com/image/mine/foodGuides/巴旦木.jpg",id:"3",name:"巴旦木",kal:"200",num:"20",danwei:"克",perkal:"10",type:"油脂"},choosed:0}
    ]
  },
  bindPickerChange:function(e)
  {
    var temp=this.data.choosen;
    var beforekal=temp[e.currentTarget.dataset.index].info.domain.kal
    temp[e.currentTarget.dataset.index].info.domain.num=this.data.numrange[e.detail.value]
    temp[e.currentTarget.dataset.index].info.domain.kal=this.data.numrange[e.detail.value]*temp[e.currentTarget.dataset.index].info.domain.perkal
    this.setData({
      choosen:temp,
      choosenkal:parseInt(parseFloat(this.data.choosenkal)+parseFloat(temp[e.currentTarget.dataset.index].info.domain.kal)-beforekal)
    })
  },
  //添加
  addfood:function(e){
    var index=e.currentTarget.dataset.index;
   if(this.data.chossingFood[index].choosed==0)//还未被选中
  {
    var temp=e.currentTarget.dataset.info;
    temp.choosed=1;
    this.data.chossingFood.splice(index,1,temp)
    temp.domain.num=this.data.numrange[e.detail.value]
    temp.domain.kal=this.data.numrange[e.detail.value]*temp.domain.perkal
    var update=this.data.choosen;
   update.push({info:temp,org:index})
      this.setData({
        choosen:update,
      choosenkal:parseInt(parseFloat(this.data.choosenkal)+parseFloat(temp.domain.kal)),
    })

  }
  },
  //删除
  deletefood:function(e){
    var arr=this.data.choosen;
    var deletetemp=arr.splice(e.currentTarget.dataset.index,1)
    this.data.chossingFood[deletetemp[0].org].choosed=0
     this.setData({
       choosen:arr,
       choosenkal:parseInt(parseFloat(this.data.choosenkal)-parseFloat(deletetemp[0].info.domain.kal))
     })
   },
   setnum:function(temp)
   {
     this.data.focus=true;
    var input=wx.createSelectorQuery().select('.weui-input')
    console.log(input)
    return temp;
   },
   save:function(e)
   {
     //存入数据库实体是choosen
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    this.data.foodtype=e.foodtype;
    this.data.day=e.day;
    this.data.time=e.time;
    //从数据库获取choosingFood数据
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})