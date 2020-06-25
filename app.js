//app.js
App({
  globalData: {
    userInfo: null,
    token: "",
    logStatus: false
  },
  onLaunch: function () {


  },
  //若不存在登录态
  //微信用户登陆
  //小程序端 wx.login 获取code 并 wx.request 提交 code 给己方服务器
  //服务器 提交Appid + appSecret + code 到微信方服务器 获取 session_key & openid
  //服务器 根据 session_key & openid 生成 token（微信方提出的基于安全性的考虑，建议开发者不要将openid等关键性信息进行数据传输） 并返回 token 到小程序端
  //小程序端 wx.setStorage 存储 token 在后续用户操作需要凭证时 附带该参数
  //小程序端 wx.getUserInfo 获取用户信息 + wx.getStorage 获取 token 数据后，一并 wx.request 提交给己方服务器
  //服务器 mySQL 用户数据信息更新
  onLogin: function (callback) {
    var that = this;

    // 先login，再getUserInfo
    wx.login({
      success: function (res) {
        if (res.code) {

          wx.getUserInfo({
            success: (UserInfo) => {
              // console.log(UserInfo)
              // 发起网络请求
              wx.request({
                url: 'http://test.xsir.chat/auth/login',//服务器地址
                data: {
                  code: res.code,
                  encryptedData: UserInfo.encryptedData,
                  iv: UserInfo.iv,
                },
                success: (res) => {
                  //  获取到用户凭证 存儲 token 
                  if (res.data.success == true) {
                    // 设置全局用户信息
                    that.globalData.userInfo = res.data.data;
                    that.globalData.token = res.data.token;
                    that.globalData.logStatus = true

                    console.log(res);

                    // 存储token
                    wx.setStorage({
                      key: "token",
                      data: res.data.token,
                    })
                    wx.setStorage({
                      key: "logStatus",
                      data: that.globalData.logStatus,
                    })
                    wx.setStorage({
                      data: that.globalData.userInfo.id,
                      key: 'uid',
                    })
                    
                    // 执行回调函数
                    if (callback) {
                      callback();
                    }

                  } else {
                    console.log(res)
                    wx.showModal({
                      title: '提示',
                      content: '登陆请求错误',
                    })
                  }
                }
              })
            },
            fail: () => {
              console.log("getUserInfo失败")
            }
          })
        }
      }
    })




  },



})