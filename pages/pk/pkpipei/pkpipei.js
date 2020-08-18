// pages/pk/pkpipei/pkpipei.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pkindex:"0",
    pktypes:[
      "竞技热跑","举重对抗","热火拉伸","腰腹力量","日理万肌"
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      pkindex:options.id
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var time=setTimeout(

      function()
      {
        wx.navigateTo({
          url: '../pking/pking',
        })
      }
      ,5000
    )
  },



})