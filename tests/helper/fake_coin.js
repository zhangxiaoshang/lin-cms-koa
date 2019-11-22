require('./initial');
const { db } = require('lin-mizar/lin/db');
const { Coin } = require('../../app/models/coin');

const run = async () => {
  await Coin.bulkCreate([
    {
      name: 'BTC',
      icon:
        'https://up.gj.com/images/1893/0384/4886/ff4e9cac40a2d5e8e4538e36df2b5b35_0_0.png',
      show_in_balance_at: new Date(),
      recharge_at: new Date(),
      withdraw_at: new Date(),
      min_recharge: 0.001,
      times_min: 1,
      recharge_mark: '',
      recharge_mark_en: '',
      withdraw_min: 0.015,
      withdraw_max: 20,
      withdraw_max_day: 100,
      withdraw_max_day_no_auth: 1,
      require_mark: false
    }
  ]);
  db.close();
};

run();
