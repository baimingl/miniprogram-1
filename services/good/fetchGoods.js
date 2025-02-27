import { config } from '../../config/index';
const api = require('../../config/api.js');
const util = require('../../utils/util.js');

/** 获取商品列表 */
function mockFetchGoodsList(pageIndex = 1, pageSize = 20) {
  const { delay } = require('../_utils/delay');
  const { getGoodsList } = require('../../model/goods');
  return delay().then(() =>
    getGoodsList(pageIndex, pageSize).map((item) => {
      return {
        spuId: item.spuId,
        thumb: item.primaryImage,
        title: item.title,
        price: item.minSalePrice,
        // originPrice: item.maxLinePrice,
        // tags: item.spuTagList.map((tag) => tag.title),
      };
    }),
  );
}

/** 获取商品列表 */
export function fetchGoodsList(pageIndex = 1, pageSize = 20,tabIndex=0,search_title='') {
  console.log(pageIndex,pageSize,tabIndex)
  // if (config.useMock) {
  //   return mockFetchGoodsList(pageIndex, pageSize);
  // }
  return new Promise((resolve) => {
    util.request(api.GoodsListUrl,{
      page:pageIndex,
      page_count:pageSize,
      category_id:tabIndex,
      search_title:search_title
    },'POST').then(function (res) {
      // console.log(res.data)
      // var list_ = []
      // res.data.data.forEach(function(item){
      //   list_.push({
      //     spuId: item.id,
      //     thumb: api.GoodsUrlImg+item.logo,
      //     title: item.title,
      //     price: item.market_price,
      //   });
      // });
      resolve(res.data);
      // console.log(list_)
    });
    // resolve('real api');
  });
}
