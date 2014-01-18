---
layout: post
title:  "Sequelize使用 include 遇到的问题"
date:   2014-01-18
tags: javascript nodejs
--- 

使用[Sequelize](https://github.com/sequelize/sequelize)库进行mysql操作，然后需要关联查询，看了一下[文档](http://sequelizejs.com/docs/)，有include方法，直接用，一切正常，心里把作者膜拜了一遍…

看着终端的log，觉得不需要每次都把关联表的全部字段都查出来，接着翻文档，这回没找到相关信息！！！

嗯，有万能的Google… 这么严肃的问题，百度，呵呵…

![搜索截图](https://raw.github.com/huaxinjiayou/blog/gh-pages/image/sequelize-search.png)

第一个刚好就是这个项目的一个issue，进入看看…

![issue542截图](https://raw.github.com/huaxinjiayou/blog/gh-pages/image/sequelize-issues-542.png)

看到楼主的问题，再看到最后一个回复，大喜，以为这样就妥妥的… 随便看了一下他的issue，讨论要不要默认查询primary keys… 表示不关心…

需求解决了，妥妥的… 测试一下…

![error1截图](https://raw.github.com/huaxinjiayou/blog/gh-pages/image/sequelize-error-1.png)

坑爹呢这是…

反复看了一下自己的代码，没发现问题，看来得自己动手帮忙找下问题所在…

N分钟后…

![error1截图](https://raw.github.com/huaxinjiayou/blog/gh-pages/image/sequelize-error-2.png)

坑爹呢这是… 这么明显的bug…

按照上图的改好之后，一切终于正常了…

嘿嘿，pull request一下，想想还有点小激动…

翻看github上的源代码… 发现这个bug已经给修复了，被抢先了… ಥ_ಥ …

![fix截图](https://raw.github.com/huaxinjiayou/blog/gh-pages/image/sequelize-bug-fix.png)

翻回去看了，果然，实现 查询关联表指定字段 这个功能的[issue](https://github.com/sequelize/sequelize/pull/840)下面有关于这个bug的讨论…

![fix1截图](https://raw.github.com/huaxinjiayou/blog/gh-pages/image/sequelize-bug-fix-1.png)

2个月前已经提交了修改… 回忆了一下，自己好像是3、4个月前装的… 呵呵…

结论就是，看issue要耐心… 常更新…