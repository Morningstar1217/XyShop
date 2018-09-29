// pages/fav/fav.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hadSure: 0,
    statusCount: 0,
    sureBuy: false,
    delFlag: false,
    consolePlat: false,
    selectAllStatus: false,
    favs: [],
    favPage: true,
    titleMsg: "", //点击复制优惠券提示文字
    host: app.globalData.host, //主网站地址
    getCouponUrl: app.globalData.getCouponUrl //淘宝优惠券
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getFavs();
  },

  //获取收藏
  getFavs: function() {
    var favs = wx.getStorageSync("favs");
    this.setData({
      favs: favs
    });
  },

  /* 管理收藏商品 */
  filterManager: function(e) {
    this.setData({
      consolePlat: !this.data.consolePlat
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
  /* 是否选定商品 */
  change: function(e) {
    console.log(e);
    const index = e.currentTarget.dataset.index;
    let favs = this.data.favs; // 获取购物车列表
    const selected = favs[index].selected; // 获取当前商品的选中状态
    favs[index].selected = !selected; // 改变状态
    this.setData({
      favs: favs
    });
  },
  /* 选择全部商品 */
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus; // 是否全选状态
    selectAllStatus = !selectAllStatus;
    let favs = this.data.favs;

    for (let i = 0; i < favs.length; i++) {
      favs[i].selected = selectAllStatus; // 改变所有商品状态
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      favs: favs
    });
  },
  /* 删除商品 */
  deleteList(e) {
    let favs = this.data.favs;
    let arr2 = [];
    for (let i = 0; i < favs.length; i++) {
      if (!favs[i].selected) {
        arr2.push(favs[i]);
      }
      this.setData({
        favs: arr2
      });
    }
    wx.setStorage({
      key: "favs",
      data: arr2
    });
  }
});
