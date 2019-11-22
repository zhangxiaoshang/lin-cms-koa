'use strict';

const { LinValidator, Rule } = require('lin-mizar');

class CoinSearchValidator extends LinValidator {
  constructor() {
    super();
    this.q = new Rule('isNotEmpty', '必须传入货币名称');
  }
}

class CreateOrUpdateCoinValidator extends LinValidator {
  constructor() {
    super();
    this.icon = new Rule('isLength', 'icon url长度必须在0~100之间', {
      min: 0,
      max: 100
    });
  }
}

module.exports = {
  CreateOrUpdateCoinValidator,
  CoinSearchValidator
};
