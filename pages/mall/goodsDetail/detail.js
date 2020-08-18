
import {
  request
} from "../../../request/index.js";

import regeneratorRuntime from '../../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{},   //商品对象

  },

  //商品对象
  GoodsInfo:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id}=options;
    this.getGoodsDetail(goods_id);
  },

  async getGoodsDetail(goods_id){
    const goodsObj=await request({url:"/goods/detail",data:{goods_id}});
    this.GoodsInfo=goodsObj;
    this.setData({
      goodsObj:{
        goods_name:goodsObj.goods_name,
        goods_price:goodsObj.goods_price,
        goods_introduce:goodsObj.goods_introduce,
        pics:goodsObj.pics
      }
    })
  },

  //调用小程序预览图片 PreviewImg  放大图片
  handlePreviewImg(e){
    const urls=this.GoodsInfo.pics.map(v=>v.pics_mid);
    wx.previewImage({
      current:e.currentTarget.dataset.url,
      urls:urls,
    })
  },
  //点击加入购物车
    /**
     * 1.绑定点击事件
     * 2.获取缓存中的购物车数据 数组格式
     * 3.先判断 当前的商品是否已经存在于 购物车
     * 4.已经存在 修改商品数据 执行购物车数量++  重新把购物车数组 填充回缓存中
     * 5.不存在于购物车数组中 直接给购物车数组添加一个新元素 带上购买数量属性num 重新把购物车数组 填充回缓存中
     * 6.弹出提示
     */
    hanleCartAdd(){
      //获取缓存中的购物车数组
      let _this=this;
      let cart=wx.getStorageSync("cart")||[];
      //判断 商品对象是否存在于购物车数组中
      let index = cart.findIndex(v=>v.goods_id===_this.GoodsInfo.goods_id);
      if(index===-1){
        //不存在此商品
        this.GoodsInfo.num=1; //商品默认数量
        this.GoodsInfo.checked=true;  // 商品购物车状态
        this.GoodsInfo.mgChecked=false;  //商品管理状态
        cart.push(this.GoodsInfo);
      }else{
        cart[index].num++;
      }
      wx.setStorageSync("cart",cart);
      wx.showToast({
        title: '加入成功!',
        icon:'success',
        //防止用户手抖
        mask:true,
      })
    }
})