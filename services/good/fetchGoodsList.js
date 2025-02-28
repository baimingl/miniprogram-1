/* eslint-disable no-param-reassign */
import { config } from '../../config/index';
const api = require('../../config/api.js');
const util = require('../../utils/util.js');
/** 获取商品列表 */
function mockFetchGoodsList(params) {
  const { delay } = require('../_utils/delay');
  const { getSearchResult } = require('../../model/search');


  const data = getSearchResult(params);

  if (data.spuList.length) {
    data.spuList.forEach((item) => {
      item.spuId = item.spuId;
      item.thumb = item.primaryImage;
      item.title = item.title;
      item.price = item.minSalePrice;
      item.originPrice = item.maxLinePrice;
      item.desc = '';
      if (item.spuTagList) {
        item.tags = item.spuTagList.map((tag) => tag.title);
      } else {
        item.tags = [];
      }
    });
  }
  return delay().then(() => {
    return data;
  });
}

/** 获取商品列表 */
export function fetchGoodsList(params) {
  // if (config.useMock) {
  //   return mockFetchGoodsList(params);
  // }
  return new Promise((resolve) => {
    util.request(api.GoodsListUrl,{
      page:params.pageNum,
      page_count:params.pageSize,
      category_id:params.groupId,
    },'POST').then(function (res) {
      resolve(res.data);
    });
  });
}
