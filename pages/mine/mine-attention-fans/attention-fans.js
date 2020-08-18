const app = getApp();

Page({
  data: {
    item: 0,
    tab: 0,
    attention: [{
        id: 1,
        userImgUrl: "http://qbgf6efcq.bkt.clouddn.com/image/mine/tx.jpg",
        userName: "流浪的小奶猫"
      },
      {
        id: 2,
        userImgUrl: "http://qbgf6efcq.bkt.clouddn.com/image/mine/tx.jpg",
        userName: "伊娃Evaa"
      },
      {
        id: 3,
        userImgUrl: "http://qbgf6efcq.bkt.clouddn.com/image/mine/tx.jpg",
        userName: "我是豆子吖"
      }
    ],
    fans: [{
        id: 1,
        userImgUrl: "http://qbgf6efcq.bkt.clouddn.com/image/mine/tx.jpg",
        userName: "流浪的小奶猫"
      },
      {
        id: 2,
        userImgUrl: "http://qbgf6efcq.bkt.clouddn.com/image/mine/tx.jpg",
        userName: "伊娃Evaa"
      },
      {
        id: 3,
        userImgUrl: "http://qbgf6efcq.bkt.clouddn.com/image/mine/tx.jpg",
        userName: "我是豆子吖"
      }
    ],
  },

  //生命周期函数--监听页面加载
  onLoad: function (options) {
    //选择显示的页面是关注还是粉丝
    this.setData({
      item: options.index
    })

    // console.log(this.data.item);

    if (this.data.item == "0") {
      this.getAttentions();
    } else {
      this.getFans();
    }



  },

  //标签栏点击切换页面时的监听函数
  changeItem: function (e) {
    this.setData({
      item: e.currentTarget.dataset.item
    })

    if (this.data.item == 1) {
      this.getFans();
    } else {
      this.getAttentions();
    }

  },

  //滑动滑块切换页面时的监听函数
  changeTab: function (e) {
    this.setData({
      tab: e.detail.current
    })

  },

  /**
   * worte by xml at 2020-06-21
   */
  getAttentions: function () {
    var that = this;

    // 获取uid
    wx.getStorage({
      key: 'uid',
      success: (res) => {
        var uid = res.data;

        wx.request({
          url: 'http://test.xsir.chat/user/attentions',
          type: "get",
          data: {
            id: uid
          },
          success: (res) => {
            console.log(res.data);
            that.setData({
              attentions: res.data.data
            })
          }
        })

      },
      fail: () => {
        console.log("undefined!");
      }
    });

  },
  getFans: function () {
    var that = this;

    // 获取uid
    wx.getStorage({
      key: 'uid',
      success: (res) => {
        var uid = res.data;

        wx.request({
          url: 'http://test.xsir.chat/user/fans',
          type: "get",
          data: {
            id: uid
          },
          success: (res) => {
            console.log(res.data);
            that.setData({
              fans: res.data.data
            })
          }
        })

      },
      fail: () => {
        console.log("undefined!");
      }
    });

  },
  unfocus: function (e) {
    console.log(e);

    var id = e.currentTarget.dataset.id;
    wx.getStorage({
      key: 'uid',
      success: (res) => {
        wx.request({
          url: 'http://test.xsir.chat/user/unfollow',
          data: { pid: id, cid: res.data },
          success: () => {
            
          }
        })
      },
      fail: (res) => {
        console.log(res);
      }
    });




  }


})