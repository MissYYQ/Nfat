//index.js
//获取应用实例

// 引入 用来发送请求的方法,,这里路径要补全
import {
  request
} from "../../request/index.js"
const util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
    swiperList: [
      {image_src:"http://qbgf6efcq.bkt.clouddn.com/image/mall/swiper/01.jpg"},
      {image_src:"http://qbgf6efcq.bkt.clouddn.com/image/mall/swiper/02.jpg"},
      {image_src:"http://qbgf6efcq.bkt.clouddn.com/image/mall/swiper/03.jpg"},
    ], //轮播图数组
    cateList:[],    //商品分类数组
    floorList:[],   //楼层数组
    //商品类型
    goodsType: [{
        src: "http://qbgf6efcq.bkt.clouddn.com/image/mall/goodsType/intellect.png",
        name: "智能硬件"
      }, {
        src: "http://qbgf6efcq.bkt.clouddn.com/image/mall/goodsType/fast.png",
        name: "轻食代餐"
      },
      {
        src: "http://qbgf6efcq.bkt.clouddn.com/image/mall/goodsType/mClothes.png",
        name: "男子服饰"
      }, {
        src: "http://qbgf6efcq.bkt.clouddn.com/image/mall/goodsType/wClothes.png",
        name: "女子服饰"
      }, {
        src: "http://qbgf6efcq.bkt.clouddn.com/image/mall/goodsType/bag.png",
        name: "运动生活"
      }
    ],
  },

  // 小程序开始加载执行
  onLoad: function () {

    // 发送异步请求获取轮播图数据 
    /*wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      success: (result) => {
        _this.setData({
          swiperList:result.data.message
        })  
      }
    }) */
    // this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },

  //获取轮播图数据
  getSwiperList: function () {
    // 下面的result等于上面的result,,传递的参数最终会被解析到  ...params   
    request({
      url: "/home/swiperdata"
    }).then(result => {
      this.setData({
        swiperList: result
      })
    })
    // .than()   如果还需要同层级的请求就继续点下去，不需要再写一个wx.request
  },
  //获取分类导航
  getCateList: function () {
    request({
      url: "/home/catitems"
    }).then(result => {
      this.setData({
        cateList: result
      })
    })
  },
  //获取楼层数据
  getFloorList: function () {
    request({
      url: "/home/floordata"
    }).then(result => {
      this.setData({
        floorList: result
      })
    })
  },


})