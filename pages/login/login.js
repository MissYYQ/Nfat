// pages/login/login.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teleinput:"",
    psdinput:"",
    warninginfo:"",
    showModal: false,
  },
  telenuminputover:function(e)
  {
    this.setData({
      teleinput:e.detail.value
    })
  },
  psdinputover:function(e)
  {
    this.setData({
      psdinput:e.detail.value
    })
  },
  focus:function()
  {
    this.setData({
      warninginfo:""
    })

  },
  onLoad:function()
  {
    
  },
  //用户密码登录(非微信登录)
  normallogin:function(e)
  {
    var app=getApp()
    if(this.data.psdinput==""||this.data.teleinput=="")
    {
      var str=""
      if(this.data.teleinput=="")
      str="手机号码不能为空"
      else if(this.data.psdinput=="")
      str="密码不能为空"
       
      this.setData({
        warninginfo:str
      })
    }
    else
    {
      app.onLogin();
    }
  },
weixinlogin:function()
{
  app.onLogin();
},
showDialogBtn: function () {
  var that = this
  that.setData({
    showModal: true
  })
},
/**
 * 弹出框蒙层截断touchmove事件
 */
preventTouchMove: function () {
},
/**
 * 隐藏模态对话框
 */

})