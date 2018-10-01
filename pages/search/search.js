// pages/search/search.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    historys: [],
    hotSearch: ["女装", "男装", "MacBook", "iPhoneX"],
    inputVlue: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /* 返回到首页 */
  returnIndex: function() {
    wx.navigateBack();
  },

  //获取收藏
  getFavs: function(param) {
    var historys = wx.getStorageSync("historys");
    if (historys.length == 0) {
      historys = [];
    }
    this.setData({
      historys: historys
    });
  },

  /* 删除当前历史记录 */
  delete: function(e) {
    let index = e.target.dataset.index;
    var historys = this.data.historys;
    historys.splice(index, 1);
    this.setData({
      historys: historys
    });
    wx.setStorage({
      key: "historys",
      data: historys
    });
  },

  /* 记录搜索框内容*/
  remSearch: function(e) {
    this.setData({
      inputVlue: e.detail.value
    });
  },
  //点击历史记录搜索
  tosearch: function(e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      inputVlue: this.data.historys[index]
    });
    this.search();
  },
  //点击热搜搜索
  tohsearch: function(e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      inputVlue: this.data.hotSearch[index]
    });
    this.search();
  },
  /* 搜索 */
  search: function() {
    if (!this.data.inputVlue) {
      this.setData({
        inputVlue: "女装"
      });
    }
    wx.navigateTo({
      url: "../searchResult/searchResult?search=" + this.data.inputVlue
    });
  },
  //渲染历史记录
  onShow: function() {
    this.getFavs();
  }
});
