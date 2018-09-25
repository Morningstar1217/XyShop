// pages/fav/fav.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeOpenFlag: false,
    statusOpenFlag: false,
    menu: [{
        id: 0,
        name: '全部类目'
      },
      {
        id: 1,
        name: '女装'
      },
      {
        id: 2,
        name: '男装'
      },
      {
        id: 3,
        name: '美食'
      },
      {
        id: 4,
        name: '居家'
      },
      {
        id: 5,
        name: '美妆'
      },
      {
        id: 7,
        name: '鞋包'
      },
      {
        id: 8,
        name: '女装'
      },
      {
        id: 9,
        name: '男装'
      },
      {
        id: 10,
        name: '美食'
      },
      {
        id: 11,
        name: '居家'
      },
      {
        id: 12,
        name: '美妆'
      },
      {
        id: 13,
        name: '鞋包'
      },
    ],
    hadSure: 0,
    status: [{
        id: 0,
        name: '全部类目'
      },
      {
        id: 1,
        name: '未失效'
      },
      {
        id: 2,
        name: '失效'
      },
    ],
    statusCount: 0,
    featuredComList: [{
        id: 0,
        imgUrl: '/images/com-1.png',
        name: '炒锅',
        hadBuy: 27382,
        priceNow: 99.90,
        priceAgo: 199.90,
        selected: false
      },
      {
        id: 1,
        imgUrl: '/images/com-2.png',
        name: '纸巾',
        hadBuy: 27382,
        priceNow: 99.90,
        priceAgo: 199.90,
        selected: false
      },
      {
        id: 2,
        imgUrl: '/images/com-3.png',
        name: '衣服',
        hadBuy: 27382,
        priceNow: 99.90,
        priceAgo: 199.90,
        selected: false
      },
      {
        id: 3,
        imgUrl: '/images/com-1.png',
        name: '炒锅',
        hadBuy: 27382,
        priceNow: 99.90,
        priceAgo: 199.90,
        selected: false
      },
      {
        id: 4,
        imgUrl: '/images/com-2.png',
        name: '纸巾',
        hadBuy: 27382,
        priceNow: 99.90,
        priceAgo: 199.90,
        selected: false
      },
      {
        id: 5,
        imgUrl: '/images/com-3.png',
        name: '衣服',
        hadBuy: 27382,
        priceNow: 99.90,
        priceAgo: 199.90,
        selected: false
      },
      {
        id: 6,
        imgUrl: '/images/com-1.png',
        name: '炒锅',
        hadBuy: 27382,
        priceNow: 99.90,
        priceAgo: 199.90,
        selected: false
      },
      {
        id: 7,
        imgUrl: '/images/com-2.png',
        name: '纸巾',
        hadBuy: 27382,
        priceNow: 99.90,
        priceAgo: 199.90,
        selected: false
      },
      {
        id: 8,
        imgUrl: '/images/com-3.png',
        name: '衣服',
        hadBuy: 27382,
        priceNow: 99.90,
        priceAgo: 199.90,
        selected: false
      },
    ],
    sureBuy: false,
    typeTitle: '全部类目',
    statusTitle: '商品状态',
    delFlag: false,
    consolePlat: false,
    selectAllStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /* 点击打开全部类目 */
  typeOpen: function () {
    this.setData({
      typeOpenFlag: !this.data.typeOpenFlag,
      statusOpenFlag: false
    })
  },
  /* 点击打开商品状态 */
  statusOpen: function () {
    this.setData({
      statusOpenFlag: !this.data.statusOpenFlag,
      typeOpenFlag: false
    })
  },
  /* 改变分类 */
  changeMenu: function (e) {
    this.setData({
      hadSure: e.target.id,
      typeOpenFlag: false,
      typeTitle: this.data.menu[e.target.id].name
    })
  },
  /* 改变状态 */
  changeStatus: function (e) {
    this.setData({
      statusCount: e.target.id,
      statusOpenFlag: false,
      statusTitle: this.data.status[e.target.id].name
    })
  },
  /* 管理收藏商品 */
  filterManager: function (e) {
    this.setData({
      consolePlat: !this.data.consolePlat
    })
  },
  /* 复制淘口令 */
  goBuy: function (e) {
    this.setData({
      sureBuy: true
    })
  },
  /* 关闭遮罩 */
  closeWrap: function () {
    this.setData({
      sureBuy: false
    })
  },
  /* 是否选定商品 */
  change: function (e) {
    console.log(e)
    const index = e.currentTarget.dataset.index;
    let featuredComList = this.data.featuredComList; // 获取购物车列表
    const selected = featuredComList[index].selected; // 获取当前商品的选中状态
    featuredComList[index].selected = !selected; // 改变状态
    this.setData({
      featuredComList: featuredComList
    });
  },
  /* 选择全部商品 */
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus; // 是否全选状态
    selectAllStatus = !selectAllStatus;
    let featuredComList = this.data.featuredComList;

    for (let i = 0; i < featuredComList.length; i++) {
      featuredComList[i].selected = selectAllStatus; // 改变所有商品状态
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      featuredComList: featuredComList
    });
  },
  /* 删除商品 */
  deleteList(e) {
    let featuredComList = this.data.featuredComList
    let arr2 = []
    for (let i = 0; i < featuredComList.length; i++) {
      if (!featuredComList[i].selected) {
        arr2.push(featuredComList[i])
      }
      this.setData({
        featuredComList: arr2
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})