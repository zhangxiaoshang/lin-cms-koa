'use strict';

const { InfoCrudMixin } = require('lin-mizar/lin/interface');
const { merge } = require('lodash');
const { Sequelize, Model } = require('sequelize');
const { db } = require('lin-mizar/lin/db');

class Coin extends Model {
  toJSON() {
    let origin = {
      id: this.id,
      name: this.name,
      icon: this.icon,
      show_in_balance_at: this.show_in_balance_at,
      recharge_at: this.recharge_at,
      withdraw_at: this.withdraw_at,
      min_recharge: this.min_recharge,
      times_min: this.times_min,
      recharge_mark: this.recharge_mark,
      recharge_mark_en: this.recharge_mark_en,
      withdraw_min: this.withdraw_min,
      withdraw_max: this.withdraw_max,
      withdraw_max_day: this.withdraw_max_day,
      withdraw_max_day_no_auth: this.withdraw_max_day_no_auth,
      require_mark: this.require_mark
    };
    return origin;
  }
}

Coin.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING(8),
      allowNull: false
    },
    icon: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    show_in_balance_at: {
      type: Sequelize.DATE,
      allowNull: false
    },
    recharge_at: {
      type: Sequelize.DATE,
      allowNull: false
    },
    withdraw_at: {
      type: Sequelize.DATE,
      allowNull: false
    },
    min_recharge: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    times_min: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    recharge_mark: {
      type: Sequelize.STRING(50),
      allowNull: true,
      defaultValue: ''
    },
    recharge_mark_en: {
      type: Sequelize.STRING(50),
      allowNull: true,
      defaultValue: ''
    },
    withdraw_min: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    withdraw_max: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    withdraw_max_day: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    withdraw_max_day_no_auth: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    require_mark: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    }
  },
  merge(
    {
      tableName: 'coin',
      modelName: 'coin',
      sequelize: db
    },
    InfoCrudMixin.options
  )
);

module.exports = { Coin };
