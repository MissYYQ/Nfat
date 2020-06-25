// pages/pk/pking/pking.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  error:function(e)
  {
    console.log(e);
  },
  siguoyi:function(e)
  {
    console.log("siguoyi"+e)
  },
  onShow: function () {
    var time=setTimeout(

      function()
      {
        wx.navigateTo({
          url: '../pkend/pkend',
        })
      }
      ,15000
    )
  }
})