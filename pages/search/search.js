// pages/search/search.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    history: ["曼秀雷敦", "鸿星尔克", "MacBook", "iPhoneX"],
    hotSearch: ["曼秀雷敦", "鸿星尔克", "MacBook", "iPhoneX"],
    inputVlue: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /* 返回到首页 */
  returnIndex: function() {
    wx.redirectTo({
      url: "../index/index"
    });
  },

  /* 删除当前历史记录 */
  delete: function(e) {
    let index = e.target.dataset.index;
    this.data.history.splice(index, 1);
    this.setData({
      history: this.data.history
    });
  },

  /* 记录搜索框内容*/
  remSearch: function(e) {
    this.setData({
      inputVlue: e.detail.value
    });
  },
  /* 搜索 */
  search: function() {
    wx.redirectTo({
      url: "../searchResult/searchResult?search=" + this.data.inputVlue
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});
