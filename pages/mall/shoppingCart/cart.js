import {
  getSetting,
  chooseAddress,
  openSetting,
  showModal,
  showToast
} from "../../../utils/asyncWx.js";
import regeneratorRuntime from '../../../lib/runtime/runtime';
//1.调用小程序API 获取用户收获地址 wx.chooseAddress
/** 
 *2.获取用户对小程序所授予获取地址的 权限状态 scope
    1.假设用户点击获取收货地址的提示框确定authSetting scope.address
     scope 值为 true 可以直接调用获取收货地址
    2.假设用户从来没有调用过获取地址Api 
     scope 值为 undefined 可以直接调用获取收货地址
    3.假设用户点击获取收货地址的提示框取消  
       scope 值为 false
       1诱导用户自己打开授权(wx.openSetting())设置页面当用户重新给与获取地址权限的时候
       2获取收货地址
    4.把获取到的收获地址存入到本地存储中
  3.页面加载完毕
    0 onLoad onShow
    1 获取本地存储的地址数据
    2 把数据 设置给data中的变量  
  4.onShow
    0 回到商品详情页面第一次添加商品的时候 手动添加了属性
      1 num=1；
      2 checked=true；
    1 获取缓存中的购物车数组  
    2 把购物车数据 填充到data中
  5 全选的实现 数据的展示
    1 onShow 获取缓存中的购物车数组
    2 根据购物车中的商品数据
  6.总价格和总数量
    1.都需要商品被选中 我们才拿它来计算
    2.获取购物车数组
    3.遍历
    4.判断商品是否被选中
    5.总价格+=商品的单价*商品数量
    6.总数量+=商品的数量
  7.商品的选中
    1.绑定事件，获取到被修改的商品对象
    2.商品对象的选中状态 反选
    3.重新填充回data中 和 缓存中
    4.重新计算总价钱，总数量
  8.全选反选功能
    1.绑定事件
    2.获取data 中的全选变量 allChecked
    3.直接取反，
    4.遍历购物车数组 让里面 商品 选中状态跟随 allChecked 改变而改变
    5.把购物车数组和allChecked 重新设置回data和缓存中
  9.商品数量的编辑
    1 "+" "-"按钮绑定同一个点击事件 区分的关键 自定义属性
      1 "+" "+1"
      2 "-" "-1"
    2 传递被点击的商品的goods_id
    3 获取data中的购物车数组 来获取需要被修改的商品对象
    4 当 购物车中商品的数量 =1 同时用户点击 - 
      弹窗提示（showModal） 询问用户 是否要删除
      1 确定 直接执行删除
      2 取消 什么都不做
    5 把cart数组 重新设置回缓存中和data 中 this.setCart()
  10 点击结算
    1 判断有没有收货地址
    2 判断用户有没有选购商品
    3 经过以上的验证 跳转到 支付页面
  11 管理商品
    0 在点击添加商品到购物车 设置mgChecked=false
    1 在data中设置管理状态 manage, 管理全选 mgAllChecked=false
    2 点击manage="管理" 变成 manage="完成" 
    3 选中商品 ：反选值,并判断是否全选
    4 全选：反选值,商品选中状态=mgAllChecked
    5 绑定事件 每次进出管理商品 的 时候 把 cart中所有商品的 mgChecked=false ,data中 mgAllChecked=false
    6 删除商品
      1 绑定事件
      2 判断是否有选中的商品 如果没有就不调用函数 用activeDelDel 判断
      3 获取cart
      4 调用 showModal Api 提示用户是否删除
      5 用户点击确认 执行 删除操作 并调用 setCart 重新赋值 
 */
Page({
  data: {
    address: {},    //用户地址存储对象

    cart: [],     //购物车信息存储对象

    allChecked: false,//商品全选判定

    sumPrice: 0,     //总价格
    sumNum: 0,     //总数量

    manage:'管理', //管理 or 完成
    mgAllChecked:false, //商品管理全选
    activeDelDel:false,     //激活
  },

  //每一次打开购物车页面 重新获取数据
  onShow() {
    const address = wx.getStorageSync('address');
    const cart = wx.getStorageSync('cart') || [];
    //计算全选 
    //every 数组方法会遍历 会接收一个回调函数 那么 每一个回调函数都返回true 那么 every方法的返回值为true
    // 只要有一个回调函数返回了false 那么不再循环执行，直接返回false
    //空数组 调用every，返回值就是true
    // const allChecked = cart.length>0?cart.every(v=>v.checked):false;
    this.setCart(cart);
    this.setData({ address: address })
  },

  handleHomAddress() {
    /*     wx.getSetting({
          success: (result) => {
            //2.凡是遇见属性名怪异的 都要加[""]括起来获取属性值
            const scopeAddress=result.authSetting["scope.address"];
            if(scopeAddress===true||scopeAddress===undefined){
              wx.chooseAddress({
                success: (result1) => {
                  console.log(result1);
                },
              })
            }else{
              //3.用户拒绝过授予权限 诱导用户打开权限
              wx.openSetting({
                success: (result2) => {
                  console.log(result2)
                  wx.chooseAddress({
                    success: (result3) => {
                      console.log(result3)
                    },
                  })
                },
              })
            }
          },
        })
        */
  },

  //优化后的请求
  async handleHomeAddress() {
    try {
      //1获取权限
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"];
      //2判断状态
      if (scopeAddress === false) {
        await openSetting();
      }
      //3调用获取地址api
      const address = await chooseAddress();
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
      //4存入缓存
      wx.setStorageSync('address', address)
    } catch (error) {
      console.log(error);
    }
  },

  //商品选中事件
  handleItemChange(e) {
    const goods_id = e.currentTarget.dataset.id;
    let { cart } = this.data;
    //找到被修改的商品对象
    let index = cart.findIndex(v => v.goods_id === goods_id);
    if(this.data.manage==='管理'){
      cart[index].checked = !cart[index].checked;
      //把购物车数据重新设置回data中和缓存中 并且 重新计算全选 总价 总数量
      this.setCart(cart);
    }else{
      // 管理商品
      let mgAllChecked=true;
      let {activeDel}=this.data;
      activeDel=false;
      cart[index].mgChecked=!cart[index].mgChecked;
      // 判断是否全选
      cart.forEach(item => {
        if (!item.mgChecked) {
          mgAllChecked = false;
        }else activeDel=true;
      });
      //mgChecked 这里不存入缓存,因为每次获取数据都从缓存中拿，而缓存中mgChecked=false,当每次打开完成页面时任然是false
      this.setData({cart,mgAllChecked,activeDel});
    }

  },

  //设置购物车状态同时(封装) 重新计算底部工具栏 全选 总价格 总数量
  setCart(cart) {
    let allChecked = true;
    let sumPrice = 0;//总价钱
    let sumNum = 0;   //总数量
    cart.forEach(item => {
      if (item.checked) {
        sumPrice += item.goods_price * item.num;
        sumNum+=item.num;
      } else {
        allChecked = false;
      }
    });
    if (cart.length == 0) allChecked = false;
    this.setData({
      cart,
      sumNum,
      sumPrice,
      allChecked,
    });
    wx.setStorageSync("cart", cart);
  },

  // 商品全选功能
  hanleItemAllCheck() {
    // 获取data中的数据
    let { cart, allChecked,mgAllChecked,activeDel } = this.data;
    // 修改值
    allChecked = !allChecked;
    mgAllChecked=!mgAllChecked;
    // 区分是管理页面还是完成页面
    if(this.data.manage==="管理"){
      // 循环修改cart数组 中的商品选中状态
      cart.forEach(item => item.checked = allChecked);
      // 把修改后的值 填充回data或者缓存中
      this.setCart(cart);
    }else{
      activeDel=mgAllChecked;
      cart.forEach(item => item.mgChecked = mgAllChecked);
      this.setData({cart,mgAllChecked,activeDel});
      //mgChecked 这里不存入缓存,因为每次获取数据都从缓存中拿，而缓存中mgChecked=false,当每次打开完成页面时任然是false
    }

  },
  // 商品数量的编辑功能
  async handleItemNumEdit(e) {
    const { operation, id } = e.currentTarget.dataset;
    let { cart } = this.data;
    const index = cart.findIndex(v => v.goods_id === id);
    // 判断是否减少至一件商品
    if (cart[index].num === 1 && operation === -1) {
      // 弹窗提示
      await showToast({ title: "最少购买一件哦~" });
      return;
      // if (res.confirm) {
      //   cart.splice(index, 1);
      //   this.setCart(cart);
      // }
    } else {
      // 进行数量修改
      cart[index].num += operation;
      // 修改缓存中和data中的cart数组
      this.setCart(cart);
    }
  },
  // 结算
  async handlePay(){
    const {address,sumNum}=this.data;
    if(!address.userName){
      await showToast({title:'您还没有添加地址'});
      return;
    }
    // 判断用户有没有选购商品
    if(sumNum===0){
      await showToast({title:'您还没有选购商品'});
      return;
    }

    wx.navigateTo({
      url: '/pages/mall/pay/pay',
    })
  },
  // 管理商品
  handlemanage(){
    let {manage,cart}=this.data;
    cart.forEach(v=>v.mgChecked=false);
    manage=manage==='管理'?'完成':'管理';
    this.setData({
      manage,
      cart,
      mgAllChecked:false,
      activeDel:false
    })
  },
  // 删除商品
  async handleGoodsDel(){
    console.log("进入");
    let {cart}=this.data;
    const res=await showModal({content:"确定要删除所选商品？"});
    if(res.confirm){
      for(let i=0;i<cart.length;i++){
        if(cart[i].mgChecked===true){
          cart.splice(i,1);
          i--;  //下标前移
        }
      }
      this.setCart(cart);
    }

  }

})