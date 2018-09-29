var app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    menu: [],
    count: 0, //选择分类
    host: app.globalData.host, //主网站地址
    getcatelist: app.globalData.getcatelist, //淘宝分类
    getGoodsList: app.globalData.getGoodsList, //淘宝列表
    getCouponUrl: app.globalData.getCouponUrl, //淘宝优惠券
    menuFlag: true, //是否打开全部分类
    sureBuy: false, //遮罩是否打开
    currentPage: 1, //请求的当前页面页码
    hotSellCom: [], //热销商品
    featuredComList: [], //精选商品
    titleMsg: "", //点击复制优惠券提示文字
    favPage: false, //是否是管理收藏页面
    showTop: false //返回顶部按钮显示隐藏
  },
  onLoad: function(options) {
    this.getGoodsList();
    this.getMenu();
  },
  /* 打开搜索页面 */
  toSearch: function() {
    wx.navigateTo({
      url: "/pages/search/search"
    });
  },
  //获取分类
  getMenu: function() {
    const that = this;
    wx.request({
      url: that.data.host + that.data.getcatelist,
      header: {
        "Content-Type": "application/json"
      },
      success: function(res) {
        that.setData({
          menu: res.data.data
        });
      }
    });
  },
  /* 选择分类 */
  changeMenu: function(e) {
    wx.showLoading();
    this.setData({
      count: e.target.id,
      featuredComList: [],
      currentPage: 1
    });
    this.getGoodsList();
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
  //商品抓取
  getGoodsList: function() {
    const url = this.data.host + this.data.getGoodsList;
    const that = this;
    wx.request({
      url: url,
      data: {
        page: that.data.currentPage,
        cid: that.data.count
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function(res) {
        console.log(res);
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
  //获取更多商品
  onReachBottom: function() {
    this.getGoodsList();
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
