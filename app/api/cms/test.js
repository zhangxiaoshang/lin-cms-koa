"use strict";

const { loginRequired, Redprint, logger, groupRequired } = require("lin-cms");

const test = new Redprint({
  prefix: "/cms/test"
});

exports.test = test;

test.get("/", async ctx => {
  ctx.type = "html";
  ctx.body = `<style type="text/css">*{ padding: 0; margin: 0; } div{ padding: 4px 48px;} a{color:#2E5CD5;cursor:
    pointer;text-decoration: none} a:hover{text-decoration:underline; } body{ background: #fff; font-family:
    "Century Gothic","Microsoft yahei"; color: #333;font-size:18px;} h1{ font-size: 100px; font-weight: normal;
    margin-bottom: 12px; } p{ line-height: 1.6em; font-size: 42px }</style><div style="padding: 24px 48px;"><p>
    Lin <br/><span style="font-size:30px">心上无垢，林间有风。</span></p></div> `;
});

test.redGet(
  "getTestMsg",
  "/json",
  {
    auth: "hello",
    module: "world",
    mount: true
  },
  loginRequired,
  logger("{user.nickname}就是皮了一波"),
  async ctx => {
    ctx.json({
      msg: "物质决定意识，经济基础决定上层建筑"
    });
  }
);

test.redGet(
  "getTestInfo",
  "/info",
  {
    auth: "查看lin的信息",
    module: "信息",
    mount: true
  },
  groupRequired,
  async ctx => {
    ctx.json({
      msg:
        "Lin 是一套基于 Python-Flask 的一整套开箱即用的后台管理系统（CMS）。Lin 遵循简洁、高效的原则，通过核心库加插件的方式来驱动整个系统高效的运行"
    });
  }
);
