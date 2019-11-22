'use strict';

const {
  LinRouter,
  NotFound,
  groupRequired,
  disableLoading
} = require('lin-mizar');
const { getSafeParamId } = require('../../libs/util');
const {
  CoinSearchValidator,
  CreateOrUpdateCoinValidator
} = require('../../validators/coin');

const { PositiveIdValidator } = require('../../validators/common');

const { CoinNotFound } = require('../../libs/err-code');
const { CoinDao } = require('../../dao/coin');

// coin 的红图实例
const coinApi = new LinRouter({
  prefix: '/v1/coin'
});

// book 的dao 数据库访问层实例
const coinDto = new CoinDao();
console.log('coinDto', coinDto);

coinApi.get('/:id', async ctx => {
  const v = await new PositiveIdValidator().validate(ctx);
  const id = v.get('path.id');
  const coin = await coinDto.getCoin(id);
  if (!coin) {
    throw new NotFound({
      msg: '没有找到相关币种'
    });
  }
  ctx.json(coin);
});

coinApi.get('/', async ctx => {
  console.log('get coins');
  const coins = await coinDto.getCoins();
  // if (!books || books.length < 1) {
  //   throw new NotFound({
  //     msg: '没有找到相关书籍'
  //   });
  // }
  ctx.json(coins);
});

coinApi.get('/search/one', async ctx => {
  const v = await new CoinSearchValidator().validate(ctx);
  const coin = await coinDto.getCoinBySymbol(v.get('query.q'));
  if (!coin) {
    throw new CoinNotFound();
  }
  ctx.json(book);
});

coinApi.post('/', async ctx => {
  const v = await new CreateOrUpdateCoinValidator().validate(ctx);
  await coinDto.createCoin(v);
  ctx.success({
    msg: '新建币种成功'
  });
});

coinApi.put('/:id', async ctx => {
  const v = await new CreateOrUpdateCoinValidator().validate(ctx);
  const id = getSafeParamId(ctx);
  await coinDto.updateCoin(v, id);
  ctx.success({
    msg: '更新币种成功'
  });
});

coinApi.linDelete(
  'deleteCoin',
  '/:id',
  {
    auth: '删除币种',
    module: '币种',
    mount: true
  },
  groupRequired,
  async ctx => {
    const v = await new PositiveIdValidator().validate(ctx);
    const id = v.get('path.id');
    await coinDto.deleteCoin(id);
    ctx.success({
      msg: '删除币种成功'
    });
  }
);

module.exports = { coinApi, [disableLoading]: false };
