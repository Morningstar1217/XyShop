App({
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function() {},

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function(options) {},

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function() {},

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function(msg) {},
  /* 都使用GET方式 */
  globalData: {
    host: "https://www.97youmeitao.com/", //主域名
    getJdList: "api.php/quan.jd/getJdList", //京东外链默认抓取商品列表
    searchJdGood: "api.php/quan.jd/searchJdGood", //京东外链搜索商品
    getJdCoupon: "api.php/quan.jd/getJdCoupon", //生成京东联盟优惠券地址
    getGoodsList: "api.php/quan.pddapi/getGoodsList", //拼多多默认商品列表
    searchGoods: "api.php/quan.pddapi/searchGoods", //拼多多搜索商品
    goodsPromotionUrl: "api.php/quan.pddapi/goodsPromotionUrl", //拼多多转链
    inviteUrl: "api.php/rank.rank/getShareList", //邀请排行榜获取
    proxyUrl: "api.php/rank.rank/getAgentList", //代理排行榜获取
    favs: [],//添加收藏列表 
  }
});
