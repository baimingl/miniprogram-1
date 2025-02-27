const GoodsUrl = 'http://goods.web.com';
const ApiRootUrl = GoodsUrl+'/api/';

module.exports = {
  IndexUrl: ApiRootUrl + 'goods/Index',
  GoodsCategoryUrl: ApiRootUrl + 'goods/GoodsCategory', 
  GoodsListUrl: ApiRootUrl + 'goods/GoodsList', 
  GoodsDetailUrl: ApiRootUrl + 'goods/GoodsDetail',
  GoodsUrlImg:GoodsUrl,
};