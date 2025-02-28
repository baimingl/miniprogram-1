import { fetchHome } from '../../services/home/home';
import { fetchGoodsList } from '../../services/good/fetchGoods';
import Toast from 'tdesign-miniprogram/toast/index';
const api = require('../../config/api.js');
const util = require('../../utils/util.js');
import { cdnBase } from '../../config/index';
Page({
  data: {
    imgSrcs: [],
    tabList: [],
    goodsList: [],
    goodsListLoadStatus: 0,
    pageLoading: false,
    current: 1,
    autoplay: true,
    duration: '500',
    interval: 5000,
    navigation: { type: 'dots' },
    swiperImageProps: { mode: 'scaleToFill' },
  },

  goodListPagination: {
    index: 0,
    num: 4,
    total_page:1
  },

  privateData: {
    tabIndex: 0,
  },

  onShow() {
    this.getTabBar().init();
  },

  onLoad() {
    this.init();
  },

  onReachBottom() {
    if (this.data.goodsListLoadStatus === 0) {
      if(this.goodListPagination.index >= this.goodListPagination.total_page){
        this.setData({ goodsListLoadStatus: 2 });
      }else{
        this.loadGoodsList();
      }
    }
  },

  onPullDownRefresh() {
    this.goodListPagination.index = 0
    this.init();
  },

  init() {
    this.loadHomePage();
  },
  getBanner(){
    let that = this;
    util.request(api.IndexUrl,{},'POST').then(function (res) {
      var imgs_list = []
      for (var x in res.data){
        imgs_list.push(api.GoodsUrlImg+res.data[x]["imgs"])
      }
      that.setData({
        imgSrcs: imgs_list,
      });
    });
  },
  getCategory(){
    let that = this;
    util.request(api.GoodsCategoryUrl,{},'POST').then(function (res) {
      // console.log(res.data)
      that.setData({
        tabList:res.data,
        pageLoading: false,
        activityImg: `${cdnBase}/activity/banner.png`,
      });
    });
  },
  loadHomePage() {
    wx.stopPullDownRefresh();

    this.setData({
      pageLoading: true,
    });
    this.getBanner();
    this.getCategory();
    this.loadGoodsList(true);
    

    // fetchHome().then(({ swiper, tabList }) => {
    //   this.setData({
    //     tabList,
    //     imgSrcs: swiper,
    //     pageLoading: false,
    //   });
    //   this.loadGoodsList(true);
    // });
  },

  tabChangeHandle(e) {
    this.privateData.tabIndex = e.detail.value;
    this.goodListPagination.index = 0;
    // console.log(e.detail.value)
    // console.log(this.privateData)
    this.loadGoodsList(true);
  },

  onReTry() {
    this.loadGoodsList();
  },

  async loadGoodsList(fresh = false) {
    if (fresh) {
      wx.pageScrollTo({
        scrollTop: 0,
      });
    }

    this.setData({ goodsListLoadStatus: 1 });

    const pageSize = this.goodListPagination.num
    let pageIndex = this.goodListPagination.index 
    const tabIndex = this.privateData.tabIndex

    // if (fresh) {
    //   pageIndex = 0;
    // }
    try {
      const nextList = await fetchGoodsList(pageIndex+1, pageSize,tabIndex);
      console.log(nextList)
      // console.log(111)

      var list_ = []
      nextList.data.forEach(function(item){
        list_.push({
          spuId: item.id,
          thumb: item.logo,
          title: item.title,
          price: item.market_price*100,
        });
      });

      this.setData({
        // goodsList: fresh ? nextList : this.data.goodsList.concat(nextList),
        goodsList: fresh ? list_ : this.data.goodsList.concat(list_),
        goodsListLoadStatus: 0,
      });

      this.goodListPagination.index = nextList.current_page;
      this.goodListPagination.num = pageSize;
      this.goodListPagination.total_page = nextList.last_page;
    } catch (err) {
      this.setData({ goodsListLoadStatus: 3 });
    }
  },

  goodListClickHandle(e) {
    const { index } = e.detail;
    const { spuId } = this.data.goodsList[index];
    wx.navigateTo({
      url: `/pages/goods/details/index?spuId=${spuId}`,
    });
  },

  // goodListAddCartHandle() {
  //   Toast({
  //     context: this,
  //     selector: '#t-toast',
  //     message: '点击加入购物车',
  //   });
  // },

  navToSearchPage() {
    wx.navigateTo({ url: '/pages/goods/search/index' });
  },

  navToActivityDetail({ detail }) {
    const { index: promotionID = 0 } = detail || {};
    wx.navigateTo({
      url: `/pages/promotion-detail/index?promotion_id=${promotionID}`,
    });
  },
});
