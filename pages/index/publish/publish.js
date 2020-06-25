// pages/index/publish/publish.js
const app = getApp();
Page({
  data: {
    img_url: '',
    content: '',
  },
  onLoad: function (options) {

  },
  input: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  // chooseimage:function(){
  //   var that = this;
  //   wx.chooseImage({
  //     count: 3, // 默认3
  //     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
  //     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
  //     success: function (res) {
  //       if (res.tempFilePaths.length>0){
  //         //图如果满了3张，不显示加图
  //         if (res.tempFilePaths.length == 3){
  //           that.setData({
  //             hideAdd:1
  //           })
  //         }else{
  //           that.setData({
  //             hideAdd: 0
  //           })
  //         }

  //         //把每次选择的图push进数组
  //         let img_url = that.data.img_url;
  //         for (let i = 0; i < res.tempFilePaths.length; i++) {
  //           img_url.push(res.tempFilePaths[i])
  //         }
  //         that.setData({
  //           img_url: img_url
  //         })
  //       }
  //     }
  //   })  
  // },

  qiniuUploader: require("../../../utils/qiniuUploader.js"),

  qnUpload: function () {


    //  var  that = this;
    // wx.chooseImage({
    //   count: 1,
    //   sizeType: ['original', 'compressed'],
    //   sourceType: ['album', 'camera'],
    //   success: (res) => {
    //     var tempFilePaths = res.tempFilePaths;
    //     console.log(tempFilePaths);
    //     const options = {     // 设置七牛上传参数
    //       region: 'ECN',      // 空间所在区域，ECN为华东区
    //       domain: 'http://qbgf6efcq.bkt.clouddn.com',  // 域名，试用阶段为测试域名（30天有效期）
    //       uptokenURL: 'http://test.xsir.chat/auth/getQnyToken',  // 开发中服务器提供的获取上传凭证token的接口
    //       key: "wudi.png",     // 指定文件key，在服务端可生成同名文件覆盖的上传凭证
    //     };
    //     this.qiniuUploader.upload(tempFilePaths[0], (res)=>{     // 上传成功，返回图片的key及url
    //       var imgUrl = res.imageURL;
    //       // 同名图片覆盖后，因为浏览器有缓存的原因，不能立刻预览到最新图片，此时需要通过在url中添加唯一参数来强制去除缓存
    //       var imgNewUrl = imgUrl + '?a=' + (new Date()).valueOf();
    //       console.log(imgNewUrl);
    //     that.setData({
    //       img_url:imgNewUrl,
    //     })
    //       // 将图片url存入自己的服务器数据库

    //     }, (error)=> {      // 上传错误，打印错误信息
    //       console.log('error' + error)
    //     }, options, (progress)=>{       // 上传进度
    //       this.setData({
    //         uploadMsg: '上传中' + progress.progress + '%'
    //       })
    //     }, null, null , (complete)=>{
    //       this.setData({
    //         uploadMsg: '上传完成'
    //       })
    //     })
    //   },
    // }
    // )

    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // var wechatma;
        var tempFilePaths = res.tempFilePaths;
        var filePath = tempFilePaths[0];
        //七牛提供的上传方法

        that.qiniuUploader.upload(filePath, (res) => {
          var wechatma = "" + res.imageURL;
          // wechatma.push(res.imageURL);
          that.setData({
            img_url: wechatma
          });
        }, (error) => {
          console.log('error: ' + error);
        }, {
          region: 'ECN',
          domain: "http://qbgf6efcq.bkt.clouddn.com",
          uptokenURL: "http://test.xsir.chat/auth/getQnyToken", // 由其他程序生成七牛 uptoken
          key: tempFilePaths[0],
        });
      }
    })


  },




  //发布按钮事件
  send: function () {
    var that = this;
    var user_id = wx.getStorageSync('uid');
    // var user_id = app.globalData.userInfo;
    var image_url = that.data.img_url;
    var content = that.data.content;
    console.log(content);
    // wx.showLoading({
    //   title: '上传中',
    // })
    // that.img_upload()
    wx.request({
      url: 'http://test.xsir.chat/dynamic/publish',
      method: "get",
      data: {
        userId: user_id,
        imageUrl: image_url,
        content: content,
      },
      success: function (res) {
        console.log(res);
        if (res.data.data == "发布成功！") {
          wx.showModal({
            // cancelColor: 'cancelColor',
            title: "发布成功",
            success: function (res) {
              if (res.confirm) {
                wx.switchTab({
                  url: '../index',
                  success:function(res){
                    var page = getCurrentPages().pop(); 
                    if (page == undefined || page == null) return;  
                    page.onLoad();  
                  }
                })
              }
            }
          })
        }
      },
      fail: function () {},
    })
  },


  // //图片上传
  // img_upload: function () {
  //   let that = this;
  //   let img_url = that.data.img_url;
  //   let img_url_ok = [];
  //   //由于图片只能一张一张地上传，所以用循环
  //   for (let i = 0; i < img_url.length; i++) {
  //     wx.uploadFile({
  //       //路径填你上传图片方法的地址
  //       url: 'http://qbgf6efcq.bkt.clouddn.com/n-fat',
  //       filePath: img_url[i],
  //       name: 'file',
  //       formData: {
  //         'user': 'test'
  //       },
  //       success: function (res) {
  //         console.log(res.data+'上传成功');
  //         //把上传成功的图片的地址放入数组中
  //         img_url_ok.push(res.data)
  //         //如果全部传完，则可以将图片路径保存到数据库
  //         if (img_url_ok.length == img_url.length) {
  //           var userid = wx.getStorageSync('userid');
  //           var content = that.data.content;
  //           wx.request({
  //             url: 'http://test.xsir.chat/dynamic/publish',
  //             data: {
  //               user_id: userid,
  //               images: img_url_ok,
  //               content: content,
  //             },
  //             success: function (res) {
  //               if (res.data.status == 1) {
  //                 wx.hideLoading()
  //                 wx.showModal({
  //                   title: '提交成功',
  //                   showCancel: false,
  //                   success: function (res) {
  //                     if (res.confirm) {
  //                       wx.navigateTo({
  //                         url: '../index',
  //                       })
  //                     }
  //                   }
  //                 })
  //               }
  //             }
  //           })
  //         }
  //       },
  //       fail: function (res) {
  //         console.log('上传失败')
  //       }
  //     })
  //   }
  // }

})