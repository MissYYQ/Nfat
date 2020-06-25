// pages/mine/mine-foodGuides/foodIdiotIndex/IdiotIndex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    day:0,
    time:0,
    recipe_type:
    [
    ]
  },
  jumpToChoose:function(e)
  {
    wx.navigateTo({
      url: '../foodChoose/foodChooseIdiot?foodtype='+e.currentTarget.dataset.foodtype+'&day='+this.data.day+'&time='+this.data.time,
    })
  },
  onLoad:function(e)
  {
    this.setData({
day:e.day,time:e.time
    })
  },
  onShow: function () {
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    var prevPage = pages[pages.length - 2]; //上一个页面
    console.log(prevPage.data.recipe_domain)
    currPage.setData({
      recipe_type:prevPage.data.recipe_domain[this.data.day].recipeinfo[this.data.time].recipe
    })
  }
})