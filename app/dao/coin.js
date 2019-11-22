'use strict';

const { NotFound, Forbidden } = require('lin-mizar');
const { Coin } = require('../models/coin');
const Sequelize = require('sequelize');

class CoinDao {
  async getCoin(id) {
    const coin = await Coin.findOne({
      where: {
        id,
        delete_time: null
      }
    });
    return coin;
  }

  async getCoinBySymbol(q) {
    const coin = await Coin.findOne({
      where: {
        title: {
          [Sequelize.Op.like]: `%${q}%`
        },
        delete_time: null
      }
    });
    return coin;
  }

  async getCoins() {
    const coins = await Coin.findAll({
      where: {
        delete_time: null
      }
    });
    return coins;
  }
  async createCoin(v) {
    const coin = await Coin.findOne({
      where: {
        name: v.get('body.name'),
        delete_time: null
      }
    });
    if (coin) {
      throw new Forbidden({
        msg: '币种已存在'
      });
    }
    const cn = new Coin();
    cn.name = v.get('body.name');
    cn.icon = v.get('body.icon');
    cn.show_in_balance_at = v.get('body.show_in_balance_at');
    cn.recharge_at = v.get('body.recharge_at');
    cn.withdraw_at = v.get('body.withdraw_at');
    cn.min_recharge = v.get('body.min_recharge');
    cn.times_min = v.get('body.times_min');
    cn.recharge_mark = v.get('body.recharge_mark');
    cn.recharge_mark_en = v.get('body.recharge_mark_en');
    cn.withdraw_min = v.get('body.withdraw_min');
    cn.withdraw_max = v.get('body.withdraw_max');
    cn.withdraw_max_day = v.get('body.withdraw_max_day');
    cn.withdraw_max_day_no_auth = v.get('body.withdraw_max_day_no_auth');
    cn.require_mark = v.get('body.require_mark');
    cn.save();
  }

  async updateCoin(v, id) {
    const coin = await Coin.findByPk(id);
    if (!coin) {
      throw new NotFound({
        msg: '没有找到相关币种'
      });
    }
    coin.name = v.get('body.name');
    coin.icon = v.get('body.icon');
    coin.show_in_balance_at = v.get('body.show_in_balance_at');
    coin.recharge_at = v.get('body.recharge_at');
    coin.withdraw_at = v.get('body.withdraw_at');
    coin.min_recharge = v.get('body.min_recharge');
    coin.times_min = v.get('body.times_min');
    coin.recharge_mark = v.get('body.recharge_mark');
    coin.recharge_mark_en = v.get('body.recharge_mark_en');
    coin.withdraw_min = v.get('body.withdraw_min');
    coin.withdraw_max = v.get('body.withdraw_max');
    coin.withdraw_max_day = v.get('body.withdraw_max_day');
    coin.withdraw_max_day_no_auth = v.get('body.withdraw_max_day_no_auth');
    coin.require_mark = v.get('body.require_mark');
    coin.save();
  }

  async deleteCoin(id) {
    const coin = await Coin.findOne({
      where: {
        id,
        delete_time: null
      }
    });
    if (!coin) {
      throw new NotFound({
        msg: '没有找到相关币种'
      });
    }
    coin.destroy();
  }
}

module.exports = { CoinDao };
