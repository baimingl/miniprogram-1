import { getCategoryList } from '../../../services/good/fetchCategoryList';
Page({
  data: {
    list: [],
    pageLoading:false,
  },
  async init() {
    wx.stopPullDownRefresh();
    this.setData({
      pageLoading: true,
    });
    try {
      const result = await getCategoryList();
      this.setData({
        list: result,
      });
    } catch (error) {
      console.error('err:', error);
    }
  },

  onShow() {
    this.getTabBar().init();
  },
  onChange() {
    wx.navigateTo({
      url: '/pages/goods/list/index',
      // url: `/pages/goods/list/index?groupId=${groupId}`,
    });
  },
  onPullDownRefresh() {
    this.init(true);
  },

  onLoad() {
    this.init(true);
  },
});
