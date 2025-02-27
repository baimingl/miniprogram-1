import { config } from '../../config/index';
const api = require('../../config/api.js');
const util = require('../../utils/util.js');


/** 获取商品列表 */
function mockFetchGood(ID = 0) {
  const { delay } = require('../_utils/delay');
  const { genGood } = require('../../model/good');
  return delay().then(() => genGood(ID));
}

/** 获取商品列表 */
export function fetchGood(ID = 0) {
  // if (config.useMock) {
  //   return mockFetchGood(ID);
  // }
  return new Promise((resolve) => {
    util.request(api.GoodsDetailUrl,{
      goods_id:ID,
    },'POST').then(function (res) {
      console.log(res.data)
      resolve(res.data);
    });
  });
}
