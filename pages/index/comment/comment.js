Page({

  /**
   * 页面的初始数据
   */
  data: {
    listHeight: 100,
    commentNum:"",
    commentContentGet: "",
    focusInput: false,
    height: '',
    isInput: false,
    value: "",
    index: 0,
    key: "",        //判断评论还是回复
    varyHeight:0,   // 评论区动态高度
    comment: [{
        id: 0,
        commentName: "泰坦尼克号",
        commentContent: "冰山不值一提。",
        commentUrl: "http://qbgf6efcq.bkt.clouddn.com/image/index/daren.jpg",
        commentTime: "9 小时前",
        reply: [{
          replyContent: "自信就是这么好看",
          replyName: "迷小梦",
        }]
      },
      {
        id:1,
        commentName:"阿泰坦尼克号",
        commentContent:"你们都不是我对手",
        commentUrl:"http://qbgf6efcq.bkt.clouddn.com/image/index/daren.jpg",
        commentTime:"12 小时前",
        reply:[{
          replyContent:"我们都很棒",
          replyName:"迷小梦",
        }]
      }
    ],
  },

  //页面加载启动函数
  onLoad: function (options) {
    this.setData({
      commentNum:this.data.comment.length,
    })
    this.getVaryHeight();
  },

  inputFocus(e) {
    console.log(e, '键盘弹起')
    this.setData({
      height: "200",
    })
    console.log(this.data.height)
  },
  inputBlur() {
    console.log('键盘收起')
    this.setData({
      isInput: false,
      value: "",
      height: "0",
    })
  },
  focusButn: function (e) {
    this.setData({
      focusInput: true,
      isInput: true,
      key: 1,
      index: e.currentTarget.dataset.index
    })
  },
  commentReply: function (e) {
    console.log(e);
    this.setData({
      commentContentGet: e.detail.value,
    })
  },

  // 发送评论
  send: function () {
    var name = "迷小萌";
    var index = this.data.comment.length;
    console.log(index);
    var content = this.data.commentContentGet;
    if (content == "") {
      wx.showToast({
        icon: "none",
        title: "请输入内容",
      })
    } else {
      this.setData({
        ["comment.[" + index + "].commentName"]: name,
        ["comment.[" + index + "].commentContent"]: content,
        ["comment.[" + index + "].commentUrl"]: "http://qbgf6efcq.bkt.clouddn.com/image/index/daren.jpg",
        ["comment.[" + index + "].commentTime"]: "12 小时前",
        commentContentGet: '',
      })
    }
  },

  // 回复评论
  send1: function () {
    var index = this.data.index;
    var index_reply = this.data.comment[index].reply.length;
    var commentReplyContent = this.data.commentContentGet;
    var _comment = 'comment[' + index + ']';
    var _reply = _comment + '.reply[' + index_reply + '].replyContent';
    var _name = _comment + '.reply[' + index_reply + '].replyName';
    this.setData({
      [_name]: "迷小萌",
      [_reply]: commentReplyContent,
      key: 0,
      commentContentGet: '',
    })
    this.getVaryHeight();
  },
  //获取动态的评论区高度
  getVaryHeight: function () {
    var _this=this;
    var query = wx.createSelectorQuery();
    query.select('.comment-content-reply').boundingClientRect();
    query.exec(function (res) {
      _this.setData({
        varyHeight:res[0].height
      })
    })
  }
})