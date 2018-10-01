// pages/99sale/index.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    sureBuy: false, //是否打开遮罩
    host: app.globalData.host, //主网站地址
    getRenqiList: app.globalData.getRenqiList, //9.9包邮
    getCouponUrl: app.globalData.getCouponUrl, //淘宝优惠券
    currentPage: 1, //请求的当前页面页码
    featuredComList: [], //精选
    titleMsg: "", //点击复制优惠券提示文字
    favPage: false //是否是管理收藏页面
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: "loading..."
    });
    this.getGoodsList();
  },
  /* 复制淘口令 */
  goBuy: function(e) {
    const that = this;
    const sku = e.currentTarget.id;
    const url = this.data.host + this.data.getCouponUrl;
    wx.request({
      url: url,
      data: {
        sku: sku
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function(res) {
        if (res.data.data) {
          wx.setClipboardData({
            data: res.data.data,
            success: function(res) {
              wx.hideToast();
              that.setData({
                sureBuy: true,
                titleMsg: "已复制淘口令，打开手机淘宝领券下单即可"
              });
            }
          });
        } else {
          that.setData({
            sureBuy: true,
            titleMsg: "该商品优惠券已被抢光~再看看别的商品吧"
          });
        }
      }
    });
  },
  /* 关闭遮罩 */
  closeWrap: function() {
    this.setData({
      sureBuy: false
    });
  },
  //获取商品链接
  getGoodsList: function() {
    const goodsUrl = this.data.host + this.data.getRenqiList;
    const that = this;
    wx.request({
      url: goodsUrl,
      data: {
        page: that.data.currentPage
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function(res) {
        console.log(res.data);
        const arr1 = that.data.featuredComList;
        const arr2 = res.data.data.list;
        arr1.push.apply(arr1, arr2);
        that.setData({
          featuredComList: arr1,
          currentPage: that.data.currentPage + 1
        });
        wx.hideLoading();
      }
    });
  },
  //获取更多
  getMoreGoodsList: function() {
    this.getGoodsList();
  },
  //添加/取消收藏
  getCol: function(e) {
    var favs = wx.getStorageSync("favs");
    if (!favs) {
      favs = [];
    }
    const data = e.currentTarget;
    const sku = data.id;
    const arr2 = [];
    const col = {
      sku: sku,
      pic: data.dataset.pic,
      title: data.dataset.title,
      price: data.dataset.price,
      market_price: data.dataset.marketprice
    };
    favs.forEach(ele => {
      if (sku != ele.sku) {
        arr2.unshift(ele);
      }
    });
    arr2.unshift(col);
    wx.setStorage({
      key: "favs",
      data: arr2
    });
    wx.showToast({
      title: "收藏成功",
      icon: "success"
    });
  },
  //是否显示返回顶部
  onPageScroll: function(e) {
    if (e.scrollTop >= 500) {
      this.setData({
        showTop: true
      });
    } else {
      this.setData({
        showTop: false
      });
    }
  },
  //返回顶部
  toTop: function() {
    wx.pageScrollTo({
      scrollTop: 0
    });
    this.setData({
      showTop: false
    });
  }
});
