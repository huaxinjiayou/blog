---
layout: post
title:  "百度搜索“变形金刚4”的彩蛋实现"
date:   2014-07-07
tags: javascript
--- 

下午在微博上看到别人转的一条微博，说是在百度搜索“变形金刚4”会有彩蛋，如下：

![百度变形金刚4](http://ww2.sinaimg.cn/large/66a4866egw1ei3yk833ffg208c04q1j3.gif)

大概看了一下，其实就是一个定时动画，实现基本没有什么技术难度，真么长的效果，真是辛苦切图大哥了…

之前谷歌也用相同原理实现一个logo效果，当时仿写了一个，如下：

[点击查看](https://raw.github.com/huaxinjiayou/blog/gh-pages/demo/horse/index.html)

百度的这个素材这么丰富，我当然也要仿写一个保留着哈：

[点击查看](https://raw.github.com/huaxinjiayou/blog/gh-pages/demo/horse/index.html)

不过看了百度的实现源代码，还是有槽点：

* 既然用了jQuery，代码中还到处夹杂着 appendChild/getElementById/createElement 这种原生的接口

* 游击战式的代码结构（跟压缩无关）

* image.onload 写在了 image.src 之后

不过只要代码运行正常不报错，除了写代码的谁在意这些细节呢。况且这只是百度每天千万搜索关键词中的一个，这个彩蛋上线几天说不定也就下线了。