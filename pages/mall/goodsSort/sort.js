import {
  request
} from "../../../request/index.js";

import regeneratorRuntime from '../../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据 
   */
  data: {
    leftContent: [], //左边大菜单

    rightContent: [], //右边分类菜单

    goodsType_id: 0, //选中左菜单标记

    top: null, //改变左边菜单标签,右侧内容置顶

    menu:[
      "智能硬件",
      "轻食代餐",
      "男子服饰",
      "女子服饰",
      "运动户外",
    ]
  },

  Cates: [], //接收接口数据

  onLoad: function (options) {
    //获取上个页面的商品类型id,但是传过来的类型是string，需要改变
    if (options.id != null) {
      var type_id = parseInt(options.id);
      this.setData({
        goodsType_id: type_id
      });
    }


    /**0 web中的本地存储和小程序中的本地存储区别
     *    1 写代码的方式不一样了
     *      web:localStorage.setItem("key","value") localStorage.getItem("key")
     *      小程序：wx.setStorageSync('key', "value");   wx.getStorageSync('key');
     *    2 存的时候 有没有做类型转换
     *      web：不管存入的是什么类型的数据  最终都会先调用一下 toString()，把数据变成了字符串 再存入进去
     *     小程序：不存在类型转换的这个操作  存什么类型的数据进去 ，获取的时候就是什么类型
     * 1.先判断一下本地存储中有没有旧数据
     * {time:Date.now(),data[...]}
     * 2.没有旧数据 直接发送新请求
     * 3.有旧数据 同时旧数据没有过期 就使用 本地存储中的旧数据即可
     */

    //1 获取本地存储中的数据  小程序中也是存在本地存储技术
    const Cates = wx.getStorageSync('cates');
    //2 判断
    if (!Cates) {
      //不存在 发送请求获取数据
      this.getCates();
    } else {
      //有旧数据 定义过期时间  10min
      if (Date.now() - Cates.time > 1000 * 10 * 60) {
        //重新发送请求
        this.getCates();
      } else {
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(v => v.cat_name);
        let rightContent = this.Cates[11].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }



  },


  //获取分类数据
  async getCates(){
/*     request({
      url: "/categories"
    }).then(res => {
      this.Cates = res;

      //  把接口的数据存入到本地存储中
      wx.setStorageSync('cates', {
        time: Date.now(),
        data: this.Cates
      })

      //构造左侧的大菜单数据
      let leftMenuList = this.Cates.map(v => v.cat_name);
      //构造右侧的商品数据
      let rightContent = this.Cates[0].children;
      this.setData({
        leftMenuList,
        rightContent,
      })
    }) */

    //使用es7的async await来发送请求
    const res = await request({
      url: "/categories"
    });
    this.Cates = res;
    //  把接口的数据存入到本地存储中
    wx.setStorageSync('cates', {
      time: Date.now(),
      data: this.Cates
    });

    //构造左侧的大菜单数据
    let leftMenuList = this.Cates.map(v => v.cat_name);
    //构造右侧的商品数据
    let rightContent = this.Cates[25].children;
    this.setData({
      leftMenuList,
      rightContent
    })
  },

  //点击选中标签
  onClickCates(e){
    let i=e.currentTarget.dataset.index;
    let goodsType_id=0;
    if(i==0){
      goodsType_id=25;
    }else if(i==1){
      goodsType_id=7;
    }else if(i==2){
      goodsType_id=15;
    }else if(i==3){
      goodsType_id=17;
    }else{
      goodsType_id=20;
    }
    //根据不同索引渲染商品类型内容
    // let rightContent = this.Cates[e.currentTarget.dataset.index].children;
    let rightContent = this.Cates[goodsType_id].children;
    this.setData({
      // goodsType_id: e.currentTarget.dataset.index,
      goodsType_id:i,
      rightContent,
      top: 0
    })
  }
})