//index.js
//获取全局应用实例
const app = getApp()
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:{
      feed:[],
      feed_length:0
    },
    bindItemTap:function(){
      wx.navigateTo({
        url: '../answer/answer',
      })
    },
    bindQueTap:function(){
      wx.navigateTo({//跳转
        url: '../question/question',
      })
    },

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad')
    var that = this
    this.getData();
  },
  /****滚动到顶部/左边，会触发 scrolltoupper 事件 */
  upper:function(){
    wx.showNavigationBarLoading()
    this.refresh();
    console.log("upper");
    setTimeout(function(){
      /***导航栏的加载* */
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    },2000)
  },
  /****滚动到底部/右边，会触发 scrolltolower 事件 */
  lower:function(e){
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(function(){wx.hideNavigationBarLoading();that.nextLoad();},2000);
    console.log("lower")
  },
  //网络请求数据, 实现首页刷新
  refresh0:function(){
    var index_api = '';
    util.getData(index_api)
      .then(function (data) {
        console.log(data);
      });
  },
  //使用本地 fake 数据实现刷新效果
  getData:function(){
    var feed = util.getData2();
    console.log("loaddata");
    var feed_data = feed.data;
    this.setData({
      feed:feed.data,
      feed_length: feed_data.length
    });
  },
  refresh:function(){
    wx.showToast({
      title: '刷新中',
      icon:'loading',
      duration:3000
    });
    var feed = util.getData2();//引入外部数据
    console.log("loaddata");
    var feed_data=feed.data;
    this.setData({
      feed:feed_data,
      feed_length:feed_data.length
    });
    setTimeout(function(){
      wx.showToast({
        title: '刷新成功',
        icon:'success',
        duration:'3000'
      })
    },3000);
  },
  //使用本地 fake 数据实现继续加载效果
  nextLoad:function(){
    wx.showToast({
      title: '加载中',
      icon:'loading',
      duration:4000
    })
    var next = util.next();
    console.log("nextLoad");
    var next_data = next.data;
    this.setData({
      feed: this.data.feed.concat(next_data),/***push 遇到数组参数时，把整个数组参数作为一个元素；而 concat 则是拆开数组参数，一个元素一个元素地加进去。  
push 直接改变当前数组；concat 不改变当前数组。** */
      feed_length: this.data.feed_length + next_data.length
    });

    setTimeout(function(){
      wx.showToast({
        title: '加载成功',
        icon:'success',
        duration:2000
      })
    },3000)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})