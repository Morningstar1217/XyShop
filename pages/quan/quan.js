// pages/quan/quan.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    stepImgs: [
      "/images/step1.png",
      "/images/step2.png",
      "/images/step3.png",
      "/images/step4.png"
    ],
    current: 0, //轮播图指示点
    tutorialFlag: false, //是否显示教程
    sureBuy: false //遮罩是否显示
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},
  /* 左切换教程 */
  toLeft: function() {
    if (this.data.current == 0) {
      this.setData({
        current: 0
      });
    } else {
      this.setData({
        current: this.data.current - 1
      });
    }
  },
  /* 右切换教程 */
  toRight: function() {
    if (this.data.current == 3) {
      this.setData({
        current: 3
      });
    } else {
      this.setData({
        current: this.data.current + 1
      });
    }
  },
  // 滑动切换
  touchChange: function(e) {
    this.setData({
      current: e.detail.current
    });
  },
  //显示隐藏教程
  toggle: function() {
    this.setData({
      tutorialFlag: !this.data.tutorialFlag
    });
  },
  /* 复制淘口令 */
  goBuy: function(e) {
    this.setData({
      sureBuy: true
    });
  },
  /* 关闭遮罩 */
  closeWrap: function() {
    this.setData({
      sureBuy: false
    });
  }
});
