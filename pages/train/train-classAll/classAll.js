Page({
  data: {
    tab: 0,
    checked: -1,
    option: -1,
    filterChecked: false,
    display:false,
    classData:[],     
    class: [],     //课程
    classKind:"",
    yoga: {
     kind1:  "哈他瑜伽",
     kind2: "阴瑜伽",
     kind3: "流瑜伽",
     kind4: "阿斯汤加"
    },
    distance:{
      kind1: "3-5公里",
      kind2: "5-8公里",
      kind3: "8公里以上"
    },
    instrument: {
      option1: "无器械",
      option2: "小哑铃",
      option3: "弹力带",
      option4: "跳绳",
      option5: "健身球",
      option6: "弹力绳",
      option7: "泡沫轴",
      option8: "坐姿单车",
      option9: "TRX",
      option10: "壶铃",
    },
    features: {
      option1: "生理期",
      option2: "产后恢复",
      option3: "小型场地",
      option4: "学生专属"
    }
  },
  onLoad: function(){
    var _this = this
    // 分类
    wx.request({   
      url: 'http://test.xsir.chat/course/sort',  
      method:'GET',
      header: {       
        'content-type': 'application/json'  
        },  
      success(res) { 
        console.log("type资源：",res.data.type)
        _this.setData({
          classData: res.data.type
        })
      } ,
      fail:function(res){
        console.log("失败");
      }
    })
    // 课程
    wx.request({
      url: 'http://test.xsir.chat/course/findAll',
      method:'GET',
      success(res){
        console.log("课程资源：",res.data.data)
        _this.setData({
          class: res.data.data
        })
      },
      fail:function(res){
        console.log("失败");
      }
    })
  },
  clickTitle: function(e){
    var index = e.currentTarget.dataset.index
    let display = this.data.display
    this.setData({
      checked: index,
      display: !display,
    })
    if (!display) {
      this.setData({
        classKind:""
      })
    }
  },
  clickOption: function(e){
    var index = e.currentTarget.dataset.index
    var tab = this.data.tab
    var checked = this.data.checked
    var classKind = this.data.classData[tab].children[checked].children[index].name
    this.setData({
      option: index,
      classKind: classKind
    })
  },
  isFilter: function(){
    let filterChecked = this.data.filterChecked
    this.setData({
      filterChecked: !filterChecked
    })
  },
  reset: function(){
    this.setData({
      option: -1,
      classKind:""
    })
  },
  changeTab: function(e){
    var tab = e.target.dataset.index
    this.setData({
      tab: tab,
      option: -1
    })
  },
  //跳转至课程详情页面
  toClassDetails:function(e){
    var index = e.currentTarget.dataset.index
    var id = this.data.class[index].id
    wx.navigateTo({
      url: '../../train/train-classDetails/classDetails?id='+id,
    })
  },
})