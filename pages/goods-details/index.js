//index.js
//获取应用实例
var app = getApp();
var WxParse = require("../../wxParse/wxParse.js");

Page({
  data: {
    autoplay: true,
    interval: 3000,
    duration: 1000,
    goodsDetail: {},
    swiperCurrent: 0,
    hasMoreSelect: false,
    selectSize: "选择：",
    selectSizePrice: 0,
    totalScoreToPay: 0,
    shopNum: 0,
    hideShopPopup: true,
    buyNumber: 0,
    buyNumMin: 1,
    buyNumMax: 0,
    propertyChildIds: "",
    propertyChildNames: "",
    canSubmit: false, //  选中规格尺寸时候是否允许加入购物车
    shopCarInfo: {},
    shopType: "addShopCar", //购物类型，加入购物车或立即购买，默认为加入购物车
    favFlag: false, //是否收藏
    favImg: "/images/fav.png", //收藏图片
    id: 0,
    code: "",
    originalPrice:''
  },

  //事件处理函数
  swiperchange: function(e) {
    //console.log(e.detail.current)
    this.setData({
      swiperCurrent: e.detail.current
    });
  },
  onLoad: function(e) {
    if (e.inviter_id) {
      wx.setStorage({
        key: "inviter_id_" + e.id,
        data: e.inviter_id
      });
    }
    var that = this;
    that.data.kjId = e.kjId;

    wx.request({
      url:
        "https://api.it120.cc/" +
        app.globalData.subDomain +
        "/shop/goods/detail",
      data: {
        id: e.id
      },
      success: function(res) {
        that.setData({
          code: res.data.data.basicInfo.characteristic,
          originalPrice: res.data.data.basicInfo.originalPrice
        });
        
        var selectSizeTemp = "";
        if (res.data.data.properties) {
          for (var i = 0; i < res.data.data.properties.length; i++) {
            selectSizeTemp =
              selectSizeTemp + " " + res.data.data.properties[i].name;
          }
          that.setData({
            hasMoreSelect: true,
            selectSize: that.data.selectSize + selectSizeTemp,
            selectSizePrice: res.data.data.basicInfo.minPrice,
            totalScoreToPay: res.data.data.basicInfo.minScore
          });
        }
        that.data.goodsDetail = res.data.data;
        if (res.data.data.basicInfo.videoId) {
          that.getVideoSrc(res.data.data.basicInfo.videoId);
        }
        that.setData({
          goodsDetail: res.data.data,
          selectSizePrice: res.data.data.basicInfo.minPrice,
          totalScoreToPay: res.data.data.basicInfo.minScore,
          buyNumMax: res.data.data.basicInfo.stores,
          buyNumber: res.data.data.basicInfo.stores > 0 ? 1 : 0
        });
        WxParse.wxParse("article", "html", res.data.data.content, that, 5);
      }
    });
    that.setData({
      id: e.id
    });
    //获取收藏列表
    wx.request({
      url:
        "https://api.it120.cc/" +
        app.globalData.subDomain +
        "/shop/goods/fav/list",
      data: {
        token: wx.getStorageSync("token")
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function(res) {
        const arr = res.data.data;
        for (var i in arr) {
          if (e.id === arr[i].goodsId.toString()) {
            that.setData({
              favFlag: true,
              favImg: "/images/fav1.png"
            });
            return;
          } else {
            that.setData({
              favFlag: false,
              favImg: "/images/fav.png"
            });
          }
        }
      }
    });
  },
  //获取口令前去购买
  tobuy: function() {
    const that = this;

    if (!this.data.code) {
      wx.showModal({
        title: "大白提示",
        content: "暂时没有优惠券哦～",
        showCancel: false
      });
    } else {
      wx.setClipboardData({
        data: this.data.code,
        success: function(res) {
          wx.hideToast();
          wx.showModal({
            title: "大白提示",
            content: '淘口令复制成功,请打开淘宝购买\r\n购买后记得到大白之家登记哦~',
            showCancel: false
          });
          // console.log(that.data.code);
        }
      });
    }
  },
  /**
   * 加入收藏
   */
  onColletionTap: function(e) {
    const that = this;
    const favFlag = that.data.favFlag;
    const id = that.data.id;
    if (!favFlag) {
      //收藏成功
      wx.request({
        url:
          "https://api.it120.cc/" +
          app.globalData.subDomain +
          "/shop/goods/fav/add",
        data: {
          token: wx.getStorageSync("token"),
          goodsId: id
        },
        header: {
          "Content-Type": "application/json"
        },
        success: function(res) {
          wx.showToast({
            title: "收藏成功",
            icon: "success"
          });
        }
      });
      that.setData({
        favFlag: !favFlag,
        favImg: "/images/fav1.png"
      });
      //取消收藏
    } else {
      wx.request({
        url:
          "https://api.it120.cc/" +
          app.globalData.subDomain +
          "/shop/goods/fav/delete",
        data: {
          token: wx.getStorageSync("token"),
          goodsId: id
        },
        header: {
          "Content-Type": "application/json"
        },
        success: function(res) {
          wx.showToast({
            title: "取消成功",
            icon: "success"
          });
        }
      });
      that.setData({
        favFlag: !favFlag,
        favImg: "/images/fav.png"
      });
    }
  },
  onShareAppMessage: function() {
    return {
      title: this.data.goodsDetail.basicInfo.name,
      path:
        "/pages/goods-details/index?id=" +
        this.data.goodsDetail.basicInfo.id +
        "&inviter_id=" +
        wx.getStorageSync("uid"),
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    };
  },

  getVideoSrc: function(videoId) {
    var that = this;
    wx.request({
      url:
        "https://api.it120.cc/" +
        app.globalData.subDomain +
        "/media/video/detail",
      data: {
        videoId: videoId
      },
      success: function(res) {
        if (res.data.code == 0) {
          that.setData({
            videoMp4Src: res.data.data.fdMp4
          });
        }
      }
    });
  },
  return: function() {
    wx.navigateBack();
  }
});
