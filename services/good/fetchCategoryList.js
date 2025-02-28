import { config } from '../../config/index';
const api = require('../../config/api.js');
const util = require('../../utils/util.js');
/** 获取商品列表 */
function mockFetchGoodCategory() {
  const { delay } = require('../_utils/delay');
  const { getCategoryList } = require('../../model/category');
  return delay().then(() => getCategoryList());
}

/** 获取商品列表 */
export function getCategoryList() {
  // if (config.useMock) {
  //   console.log(mockFetchGoodCategory())
  //   return mockFetchGoodCategory();
  // }
  
  return new Promise((resolve) => {
    util.request(api.GoodsCategoryListUrl,{},'POST').then(function (res) {
      console.log(res.data)
      resolve(res.data);
    });
    // resolve('real api');
  });
}
