---
layout: post
title:  "最近遇到的一些js异步管理工具"
date:   2014-01-08
tags: javascript
--- 

使用express写一个小网站，然后不可避免遇到了异步的问题，严格的说是异步的书写问题…

先是直接使用回调，虽然自己做了分层（比如把两三个回调包装在一个function，形成一个新的回调，尽量减少可见的回调层级），代码那个长就不说了，而且很冗余…

然后就开始寻求库的帮助…

* [eventproxy.js](https://github.com/JacksonTian/eventproxy)

开始接触nodejs，直接clone了[cnode社区的代码](https://github.com/cnodejs/nodeclub)，里面用的就是这个，然后就试着用了…

挺不错的，但是不喜欢它的接口结构，比如，摘抄一段[代码](https://github.com/cnodejs/nodeclub/blob/master/proxy/topic.js)…

{% highlight javascript %}
var proxy = new EventProxy();
var events = ['topic', 'tags', 'author', 'last_reply'];
proxy.assign(events, function (topic, tags, author, last_reply) {
  // …
});

proxy.emit('topic', …);
proxy.emit('tags', …);
…
{% endhighlight %}

* [when.js](https://github.com/cujojs/when)

波波推荐的，在async.js和when.js中2选一，然后google一下，when最符合Promises/A+规范，估计是好东西，就直接用了…

在使用过程中也开始了解Promises/A+规范讲的是啥…

就按照规范使用的话，确实是个好帮手，但是放在express中，发现自己还得写挺多一些额外的辅助代码… 比如异步的错误处理机制…

没错，是错误处理机制！！！

大多数时候，我需要在第一次出现错误之后，就不执行之后的任何操作，直接终止，但是

{% highlight javascript %}
startPromise.then(fSuccess1, fFail1).then(fSuccess2, fFail2).then(fSuccess3, fFail3)…
{% endhighlight %}

不做任何操作的话，fFail1执行完之后，默认是接着执行fSuccess2或者fFail2，因此需要我做一些额外的管理工作…

我要想做异步管理的话，我还用个毛库啊，摔…

此外，每个异步生成一个defer对象，在我看来是有点冗余，虽然在规范看来不是…

* [async.js](https://github.com/caolan/async)

在自己封装了一遍when.js之后，发现自己有重复造轮子的趋势(虽然已经快造好了…)，然后就又试了一下async.js

简单的说就是和我期望的一样，所以很好，呵呵…

有以下这3个方法我已经很满足了…

{% highlight javascript %}
// 按照顺序执行，前一次的执行结果为下一个函数的执行参数
async.waterfall

// 并行(不按照顺序)执行，但是结果按照指定的Array顺序(或者Object键)返回
async.parallel

// 串行执行
async.series
{% endhighlight %}

嗯，确实跟我的想法一致：代码看起来要舒服…

附截图2张，起码现在我看着挺舒服，说不定日后还会发现不爽的地方，唉，可怜的处女座…

![代码截图](https://raw.github.com/huaxinjiayou/blog/gh-pages/image/async-code.png)

![前端界面截图](https://raw.github.com/huaxinjiayou/blog/gh-pages/image/async-page.png)