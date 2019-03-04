// pages/discovery/discovery.js
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTab: ["推荐", "圆桌", "热门", "收藏"],
    currentNavtab: 0,
    imgUrls: [
      '../../images/24213.jpg',
      '../../images/24280.jpg',
      '../../images/1444983318907-_DSC1826.jpg'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    feed: [],
    feed_length: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    this.refresh();
  },
  /**
   * 选择tab
   */
  switchTab: function(e) {
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  },
  bindItemTap: function() {
    wx.navigateTo({
      url: '../answer/answer',
    })
  },

  bindQueTap: function() {
    wx.navigateTo({
      url: '../question/question'
    })
  },
  upper: function() {
    wx.showNavigationBarLoading()
    this.refresh();
    console.log("upper");
    setTimeout(function() {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    }, 2000);
  },
  lower:function(e){
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(function(){
      wx.hideNavigationBarLoading();
      that.nextLoad();
    },2000);
    console.log("lower")
  },
  /***
   * 网络请求数据 实现刷新
   */
refresh0:function(){
  var index_api='';
  util.getData(index_api)
  .then(function(data){
    console.log(data);
  });
},
/**
 * 使用本地fake 数据实现刷新
 */
refresh:function(){
  var feed = util.getDiscovery();
  console.log("loaddata");
  var feed_data = feed.data;
  this.setData({
    feed:feed.data,
    feed_length:feed_data.length
  });
},
nextLoad:function(){
  var next = util.discoveryNext();
  console.log("continueload");
  var next_data = next.data;
  this.setData({
    feed: this.data.feed.concat(next_data),/***push 遇到数组参数时，把整个数组参数作为一个元素；而 concat 则是拆开数组参数，一个元素一个元素地加进去**/
    feed_length: this.data.feed_length + next_data.length
  });
},


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})