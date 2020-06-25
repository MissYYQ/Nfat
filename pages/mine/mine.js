var app = getApp();

/**
 * modified by xml at 2020-06-20
 */
Page({
  data: {
    // userImgSrc: "http://qbgf6efcq.bkt.clouddn.com/image/mine/tx.jpg",
    // app: getApp(),
    one: [
      {num: 0, name:"关注"},
      {num: 0, name:"粉丝"},
      {num: 0, name:"动态"},
      {num: 0, name:"N币"},
    ],
    mineOther: [{
        id: 1,
        imgUrl: 'http://qbgf6efcq.bkt.clouddn.com/image/mine/set.png',
        title: "设置"
      },
      {
        id: 2,
        imgUrl: 'http://qbgf6efcq.bkt.clouddn.com/image/mine/yinshi.png',
        title: "饮食指南"
      },
      {
        id: 3,
        imgUrl: 'http://qbgf6efcq.bkt.clouddn.com/image/mine/kecheng.png',
        title: "我的课程"
      },
      {
        id: 4,
        imgUrl: 'http://qbgf6efcq.bkt.clouddn.com/image/mine/gouwuche-01.png',
        title: "购物车"
      },
      {
        id: 5,
        imgUrl: 'http://qbgf6efcq.bkt.clouddn.com/image/mine/qiandao.png',
        title: "签到"
      },
      {
        id: 6,
        imgUrl: 'http://qbgf6efcq.bkt.clouddn.com/image/mine/location.png',
        title: "附近"
      },
      {
        id: 7,
        imgUrl: 'http://qbgf6efcq.bkt.clouddn.com/image/mine/xiaoyouxi.png',
        title: "小游戏"
      },
      {
        id: 8,
        imgUrl: 'http://qbgf6efcq.bkt.clouddn.com/image/mine/zhibo.png',
        title: "直播"
      },
      {
        id: 9,
        imgUrl: 'http://qbgf6efcq.bkt.clouddn.com/image/mine/sys.png',
        title: "扫一扫"
      },
      {
        id: 10,
        imgUrl: 'http://qbgf6efcq.bkt.clouddn.com/image/mine/xiaoxi.png',
        title: "消息"
      },
      {
        id: 11,
        imgUrl: 'http://qbgf6efcq.bkt.clouddn.com/image/mine/dingdan.png',
        title: "我的订单"
      },
      {
        id: 12,
        imgUrl: 'http://qbgf6efcq.bkt.clouddn.com/image/mine/mubiao.png',
        title: "我的目标"
      },
    ],
    user: null,
    status: false
  },
  // 点击登录事件
  bindGetUserInfo: function () {
    var that = this;
    app.onLogin(() => {
      that.onLoad();
    });

  },
  onLoad: function () {

    // 页面加载时校验token
    // this.checkToken();
    
    // var user = this.data.user;
    // if (user != null) {
    //   var arr = [];
    //   arr.push({
    //     num: user.attentions,
    //     name: "关注"
    //   });
    //   arr.push({
    //     num: user.fans,
    //     name: "粉丝"
    //   });
    //   arr.push({
    //     num: user.dynamics,
    //     name: "动态"
    //   });
    //   arr.push({
    //     num: user.coins,
    //     name: "N币"
    //   });

    //   this.setData({
    //     one: arr
    //   })
    // }


  },
  onReady: function () {

  },
  onShow: function () {
    // 应该再页面加载时校验token,页面显示做局部刷新
    // 偷个懒，直接在页面显示时校验token
    this.checkToken();

    console.log("show");

  },
  //登录事件函数结束
  change: function (e) {
    var index = e.currentTarget.dataset.index
    if (index === 0 || index === 1) { // 关注、粉丝页面跳转
      wx.navigateTo({
        url: 'mine-attention-fans/attention-fans?index=' + index,
      })
    }
    if (index === 2) { //动态页面跳转
      wx.navigateTo({
        url: 'mine-dynamic/dynamic',
      })
    }
  },

  changeOther: function (e) {
    var index = e.currentTarget.dataset.index
    if (index === 1) {
      wx.navigateTo({
        url: 'mine-foodGuides/foodGuides',
      })
    }
    // 我的课程
    if (index === 2) {
      wx.navigateTo({
        url: 'mine-class/class',
      })
    }
    // 购物车
    if (index === 3) {
      wx.navigateTo({
        // url: 'mine-shoppingCart/shoppingCart',
        url: '../../pages/mall/shoppingCart/cart',
      })
    }
  },

  /**
   * 校验token
   */
  checkToken: function () {
    var that = this;
    // 先获取token
    var Storagetoken = wx.getStorageSync('token')

    // 如果token存在,验证其有效性
    if (Storagetoken != "" && Storagetoken != undefined) {
      // token有效性验证
      wx.request({
        url: 'http://test.xsir.chat/auth/check',
        data: {
          token: Storagetoken
        },
        success: function (res) {
          // 正确则后台返回用户信息，不正确则跳转登录
          if (res.data.success == true) {
            wx.setStorage({
              data: true,
              key: 'logStatus',
            });
            wx.setStorage({
              data: res.data.data.id,
              key: 'uid',
            })

            that.setData({
              status: true,
              user: res.data.data
            });

            var user = that.data.user;
            if (user != null) {
              var arr = [];
              arr.push({
                num: user.attentions,
                name: "关注"
              });
              arr.push({
                num: user.fans,
                name: "粉丝"
              });
              arr.push({
                num: user.dynamics,
                name: "动态"
              });
              arr.push({
                num: user.coins,
                name: "N币"
              });
        
              that.setData({
                one: arr
              })
            }

            console.log(user);

          } else {
            // token不一致
            console.log("token已过期，重新登录")
            wx.setStorage({
              data: false,
              key: 'logStatus',
            })
            app.onLogin();
          }
        }
      })
    }
  }
 
})