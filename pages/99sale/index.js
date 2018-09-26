// pages/99sale/index.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    sureBuy: false, //是否打开遮罩
    host: app.globalData.host, //主网站地址
    getGoodsList: app.globalData.getGoodsList, //获取拼多多外链地址
    goodsPromotionUrl: app.globalData.goodsPromotionUrl, //拼多多优惠券转链
    currentPage: 1, //请求的当前页面页码
    hotSellCom: [], //热销商品
    featuredComList: [], //拼多多精选
    titleMsg: "", //点击复制优惠券提示文字
    favPage: true //是否是管理收藏页面
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getGoodsList();
  },
  /* 复制淘口令 */
  goBuy: function(e) {
    const that = this;
    const sku = e.currentTarget.id;
    const url = this.data.host + this.data.goodsPromotionUrl;
    wx.request({
      url: url,
      data: {
        sku: sku
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function(res) {
        if (res.data.data.url) {
          wx.setClipboardData({
            data: res.data.data.url,
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
  //获取拼多多商品链接
  getGoodsList: function() {
    const goodsUrl = this.data.host + this.data.getGoodsList;
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
        const arr1 = that.data.featuredComList;
        const arr2 = res.data.data.list;
        arr1.push.apply(arr1, arr2);
        that.setData({
          featuredComList: arr1,
          currentPage: that.data.currentPage + 1
        });
      }
    });
  },
  //获取更多
  getMoreGoodsList: function() {
    this.getGoodsList();
  }
});
