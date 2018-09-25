// pages/99sale/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    sureBuy: false,
    featuredComList: [
      {
        id: 0,
        imgUrl: "/images/com-1.png",
        name: "炒锅",
        hadBuy: 27382,
        priceNow: 99.9,
        priceAgo: 199.9
      },
      {
        id: 1,
        imgUrl: "/images/com-2.png",
        name: "纸巾",
        hadBuy: 27382,
        priceNow: 99.9,
        priceAgo: 199.9
      },
      {
        id: 2,
        imgUrl: "/images/com-3.png",
        name: "衣服",
        hadBuy: 27382,
        priceNow: 99.9,
        priceAgo: 199.9
      },
      {
        id: 3,
        imgUrl: "/images/com-1.png",
        name: "炒锅",
        hadBuy: 27382,
        priceNow: 99.9,
        priceAgo: 199.9
      },
      {
        id: 4,
        imgUrl: "/images/com-2.png",
        name: "纸巾",
        hadBuy: 27382,
        priceNow: 99.9,
        priceAgo: 199.9
      },
      {
        id: 5,
        imgUrl: "/images/com-3.png",
        name: "衣服",
        hadBuy: 27382,
        priceNow: 99.9,
        priceAgo: 199.9
      },
      {
        id: 6,
        imgUrl: "/images/com-1.png",
        name: "炒锅",
        hadBuy: 27382,
        priceNow: 99.9,
        priceAgo: 199.9
      },
      {
        id: 7,
        imgUrl: "/images/com-2.png",
        name: "纸巾",
        hadBuy: 27382,
        priceNow: 99.9,
        priceAgo: 199.9
      },
      {
        id: 8,
        imgUrl: "/images/com-3.png",
        name: "衣服",
        hadBuy: 27382,
        priceNow: 99.9,
        priceAgo: 199.9
      }
    ],
    hotSellCom: [
      {
        id: 0,
        imgUrl: "/images/com-1.png",
        name: "炒锅",
        hadBuy: 27382,
        priceNow: 99.9,
        priceAgo: 199.9
      },
      {
        id: 1,
        imgUrl: "/images/com-2.png",
        name: "纸巾",
        hadBuy: 27382,
        priceNow: 99.9,
        priceAgo: 199.9
      },
      {
        id: 2,
        imgUrl: "/images/com-3.png",
        name: "衣服",
        hadBuy: 27382,
        priceNow: 99.9,
        priceAgo: 199.9
      },
      {
        id: 3,
        imgUrl: "/images/com-1.png",
        name: "炒锅",
        hadBuy: 27382,
        priceNow: 99.9,
        priceAgo: 199.9
      },
      {
        id: 4,
        imgUrl: "/images/com-2.png",
        name: "纸巾",
        hadBuy: 27382,
        priceNow: 99.9,
        priceAgo: 199.9
      },
      {
        id: 5,
        imgUrl: "/images/com-3.png",
        name: "衣服",
        hadBuy: 27382,
        priceNow: 99.9,
        priceAgo: 199.9
      },
      {
        id: 6,
        imgUrl: "/images/com-1.png",
        name: "炒锅",
        hadBuy: 27382,
        priceNow: 99.9,
        priceAgo: 199.9
      },
      {
        id: 7,
        imgUrl: "/images/com-2.png",
        name: "纸巾",
        hadBuy: 27382,
        priceNow: 99.9,
        priceAgo: 199.9
      },
      {
        id: 8,
        imgUrl: "/images/com-3.png",
        name: "衣服",
        hadBuy: 27382,
        priceNow: 99.9,
        priceAgo: 199.9
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},
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
