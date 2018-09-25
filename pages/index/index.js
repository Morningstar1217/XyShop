var app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    menu: [
      {
        id: 0,
        name: "全部"
      },
      {
        id: 1,
        name: "女装"
      },
      {
        id: 2,
        name: "男装"
      },
      {
        id: 3,
        name: "美食"
      },
      {
        id: 4,
        name: "居家"
      },
      {
        id: 5,
        name: "美妆"
      },
      {
        id: 7,
        name: "鞋包"
      },
      {
        id: 8,
        name: "女装"
      },
      {
        id: 9,
        name: "男装"
      },
      {
        id: 10,
        name: "美食"
      },
      {
        id: 11,
        name: "居家"
      },
      {
        id: 12,
        name: "美妆"
      },
      {
        id: 13,
        name: "鞋包"
      }
    ],
    count: 0, //选择分类
    host: app.globalData.host, //主网站地址
    getJdList: app.globalData.getJdList, //获取京东外链地址
    getJdCoupon: app.globalData.getJdCoupon, //京东优惠券转链
    menuFlag: true, //是否打开全部分类
    sureBuy: false, //遮罩是否打开
    currentPage: 1, //请求的当前页面页码
    hotSellCom: [], //热销商品
    featuredComList: [], //京东精选
    titleMsg: "", //点击复制优惠券提示文字
    favPage: true //是否是管理收藏页面
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getJdList();
    wx.getStorage({
      key: "favs",
      success: function(res) {
        app.globalData.favs = res.data;
      },
      fail: function() {
        wx.setStorage({
          key: "favs",
          data: app.globalData.favs
        });
      }
    });
    // wx.clearStorage()
  },
  /* 打开搜索页面 */
  toSearch: function() {
    wx.navigateTo({
      url: "/pages/search/search"
    });
  },
  /* 选择分类 */
  changeMenu: function(e) {
    this.setData({
      count: e.target.id
    });
  },
  /* 打开全部分类 */
  openMenu: function() {
    this.setData({
      menuFlag: !this.data.menuFlag
    });
  },
  /* 复制淘口令 */
  goBuy: function(e) {
    const that = this;
    const sku = e.currentTarget.id;
    const couponUrl = e.currentTarget.dataset.url;
    const url = this.data.host + this.data.getJdCoupon;
    wx.request({
      url: url,
      data: {
        sku: sku,
        url: couponUrl
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
  //京东外链抓取
  getJdList: function() {
    const Jdurl = this.data.host + this.data.getJdList;
    const that = this;
    wx.request({
      url: Jdurl,
      data: {
        page: that.data.currentPage
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function(res) {
        const arr1 = that.data.featuredComList;
        const arr2 = res.data.data.list;
        if (that.data.currentPage <= 2) {
          arr1.push.apply(arr1, arr2);
        } else {
          arr1.push(arr2);
          console.log(arr1);
        }
        that.setData({
          featuredComList: arr1,
          currentPage: that.data.currentPage + 1
        });
      }
    });
  },
  //获取更多京东外链
  getMoreJdList: function() {
    this.getJdList();
  },
  //添加/取消收藏
  getCol: function(e) {
    console.log(e);
    const id = e.currentTarget.id;
    const favs = app.globalData.favs;
    if (favs.indexOf(e.currentTarget.id) == -1) {
      favs.push(e.currentTarget.id);
      wx.showToast({
        title: "收藏成功",
        icon: "success"
      });
    } else {
      favs.splice(favs.indexOf(e.currentTarget.id), 1);
      wx.showToast({
        title: "取消成功",
        icon: "success"
      });
    }
    wx.setStorage({
      key: "favs",
      data: favs
    });
  }
});
