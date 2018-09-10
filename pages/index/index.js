//index.js
//获取应用实例
var app = getApp();
Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    loadingHidden: false, // loading
    userInfo: {},
    swiperCurrent: 0,
    selectCurrent: 0,
    categories: [],
    activeCategoryId: 0,
    goods: [],
    recommendStatusGoods: [],
    scrollTop: "0",
    loadingMoreHidden: true,
    hasNoCoupons: true,
    coupons: [],
    searchInput: ""
  },

  tabClick: function (e) {
    this.setData({
      activeCategoryId: e.currentTarget.id
    });
    this.getGoodsList(this.data.activeCategoryId);
  },
  //事件处理函数
  swiperchange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    });
  },
  tapBanner: function (e) {
    if (e.currentTarget.dataset.id != 0) {
      wx.navigateTo({
        url: "/pages/goods-details/index?id=" + e.currentTarget.dataset.id
      });
    }
  },
  bindTypeTap: function (e) {
    this.setData({
      selectCurrent: e.index
    });
  },
  scroll: function (e) {
    var that = this,
      scrollTop = that.data.scrollTop;
    that.setData({
      scrollTop: e.detail.scrollTop
    });
  },
  onLoad: function () {
    var that = this;
    wx.setNavigationBarTitle({
      title: wx.getStorageSync("mallName")
    });
    //获取banner图片
    wx.request({
      url: "https://api.it120.cc/" + app.globalData.subDomain + "/banner/list",
      data: {
        key: "mallName"
      },
      success: function (res) {
        if (res.data.code == 404) {
          wx.showModal({
            title: "提示",
            content: "请在后台添加 banner 轮播图片",
            showCancel: false
          });
        } else {
          that.setData({
            banners: res.data.data
          });
        }
      }
    });
    //获取商品分类
    /* wx.request({
      url: "https://api.it120.cc/" +
        app.globalData.subDomain +
        "/shop/goods/category/all",
      success: function (res) {
        var categories = [{
          id: 0,
          name: "全部"
        }];
        if (res.data.code == 0) {
          for (var i = 0; i < res.data.data.length; i++) {
            categories.push(res.data.data[i]);
          }
        }
        that.setData({
          categories: categories,
          activeCategoryId: 0
        });
        that.getGoodsList(0);
      }
    }); */
    //获取推荐商品
    wx.request({
      url: "https://api.it120.cc/" +
        app.globalData.subDomain +
        "/shop/goods/list",
      header: {
        "Content-Type": "application/json"
      },
      data: {
        recommendStatus: 1
      },
      success: function (res) {
        that.setData({
          recommendStatusGoods: res.data.data
        });
      }
    });
    that.getNotice();
  },
  getNotice: function () {
    var that = this;
    wx.request({
      url: 'https://api.it120.cc/' + app.globalData.subDomain + '/notice/list',
      data: {
        pageSize: 5
      },
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            noticeList: res.data.data
          });
        }
      }
    })
  },
  getGoodsList: function (categoryId) {
    if (categoryId == 0) {
      categoryId = "";
    }
    var that = this;
    wx.request({
      url: "https://api.it120.cc/" + app.globalData.subDomain + "/shop/goods/list",
      data: {
        categoryId: categoryId,
        nameLike: that.data.searchInput
      },
      success: function (res) {
        that.setData({
          goods: [],
          loadingMoreHidden: true
        });
        var goods = [];
        if (res.data.code != 0 || res.data.data.length == 0) {
          that.setData({
            loadingMoreHidden: false
          });
          return;
        }
        for (var i = 0; i < res.data.data.length; i++) {
          goods.push(res.data.data[i]);
        }
        that.setData({
          goods: goods
        });
      }
    });
  },
  onShareAppMessage: function () {
    return {
      title: wx.getStorageSync('mallName') + ' - ' + app.globalData.shareProfile,
      path: "/pages/index/index",
      imageUrl: '',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    };
  },
  tobuy: function (e) {
    const code = e.currentTarget.dataset.characteristic
    const that = this;
    wx.setClipboardData({
      data: code,
      success: function (res) {
        wx.hideToast();
        wx.showModal({
          title: "大白提示",
          content: '淘口令复制成功,请打开淘宝购买\r\n 购买后记得到大白之家登记哦~',
          showCancel: false
        });
      }
    });
  },
});