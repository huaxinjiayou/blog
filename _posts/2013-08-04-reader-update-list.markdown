---
layout: post
title:  "开发进度日志"
date:   2013-08-31
tags: 学习
---

有个东西一直想做出来，但是因为各种原因，一直在拖拖拖，自己也很讨厌自己的这种状态，这篇博客记录一下开发进度，看能不能推动自己…

### 2013-08-31
* 把Column模块的的列表、增加和修改前端部分基本搞定，用假数据能跑通… 明天把引进rails的数据接口试试…

* 图片一张:

![Column列表页截图](https://raw.github.com/huaxinjiayou/blog/gh-pages/image/column.png)

### 2013-08-29
* 终于把前端的架构搞定了…

虽然backbone本身是一个框架，但是并没有解决全部问题… 而且本身也有局限性… 比如model之间的管理和联系… 比如模板的管理… 总不能都用全局吧…

现在觉得，做一个比较系统的东西和单独实现一个功能（比如写个js插件）难度完全不是一个等级… 好的框架，开发的时候不会模凌两可，优化的时候不会不知所措，多人开发时不会经常冲突…

等这个项目自己开发到一定程度后，再写篇Backbone的使用感受和个人解决方案总结一下…

### 2013-08-08
* 给博客添加多说评论框

### 2013-08-04
* 构建前端开发环境，初步考虑用各种开源库，减少开发量
  * [jquery](https://github.com/jquery/jquery)
  * [underscore](https://github.com/jashkenas/underscore)
  * [Backbone](https://github.com/jashkenas/backbone)
  * [artTemplate](https://github.com/aui/artTemplate)
  * [Bootstrap](https://github.com/twbs/bootstrap)
* 通过Column类的前端开发熟悉Backbone的设计思想以及接口，进度30%

### 2014-01-08
* 表示又推掉全部代码重新写了一遍，这次换成nodejs…
  * 不清楚是不是真的是处女座的通病，反正我是… 感觉代码不是很简洁，自己不满意，就算写好了大部分，还是忍不住重新写过一遍
  * 有时候工作中也有这种想法，但是会告诉自己不到不能忍受还是别动，毕竟真的只是自己觉得好而已…
  * 感觉在寻找一种自己的风格，呵呵…
* 用express把之前的后端代码都重新写好了(其实已经改过很多次了，一直在需求一种书写看起来优雅的js的异步处理方式…)
* 完成30%左右的后台前端代码

