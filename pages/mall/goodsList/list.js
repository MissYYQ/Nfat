
import {
  request
} from "../../../request/index.js";

import regeneratorRuntime from '../../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //导航标签
    tabs: [{
      id: 0,
      value: "综合",
      isActive: true
    },
    {
      id: 1,
      value: "销量",
      isActive: false
    },
    {
      id: 2,
      value: "价格",
      isActive: false
    },
    ],
    goodsList: [],     //接受商品数据 

    flag:0      //  提示信息标识 0-加载···  1-没有更多商品了
  },

  //接口要的参数
  QueryParams: {
    query: "",     //关键字
    cid: "",       //类型id
    pagenum: 1,    //页码
    pagesize: 10   //  页容量
  },
  //总页数
  totalPages: 0,


  onLoad: function (options) {
    this.QueryParams.cid = options.cid;

    

    this.getGoodsList();
  },

  //获取商品列表数据
  async getGoodsList() {
    const res = await request({ url: "/goods/search", data: this.QueryParams });
    //获取总条数
    const total = res.total;
    //计算总页数
    this.totalPages = Math.ceil(total / this.QueryParams.pagesize);
    this.setData({
      //拼接的数组
      goodsList:this.data.goodsList.concat(res.goods)
    })

    //关闭下拉刷新窗口  如果没有下拉刷新窗口 直接关闭也没有影响
    wx.stopPullDownRefresh()

  },

  //自定义事件 用来接收子组件传递数的数据的 
  handleItemChange(e) {
    const { index } = e.detail;
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    })
  },


  /**
   1. 用户上滑页面滚动条触底  开始加载下一页数据
    1. 找到滚动触底的条件  微信小程序官方开发文档寻找 onReachBottom()
    2.判断还有没有下一页数据 
      1.总页数 = Math().ceil(总条数total/页容量 pagesize)；
      2.获取当前的页码 pagenum
      3.判断一下 当前的页码是否大于总页数
    3.如果没有下一页数据 则弹出提示
    4.如果还有下一页数据 加载下一页数据
      1.当前页码++
      2.重新发送请求，给当前的商品数组进行拼接，而不是全部替换
  */
  onReachBottom() {
    // 判断有没有下一页数据
    if(this.QueryParams.pagenum>=this.totalPages){
      //没有下一页数据
      this.setData({
        flag:1
      })
    }else{
      //还有下一页数据
      this.setData({
        flag:0
      })
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },

  /**
   * 下拉刷新页面
   *  1.触发下拉刷新事件  需要在页面的json文件中开启一个配置项
   *  2.重置 数据 数组
   *  3.重置页码 设置为1
   *  4.重新发送请求
   *  5.数据请求回来 需要手动关闭 等待效果
   */
  onPullDownRefresh(){
    //重置数组
    this.setData({
      goodsList:[]
    })
    this.QueryParams.pagenum=1;
    this.getGoodsList();
  }
})