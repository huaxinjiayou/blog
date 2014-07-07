(function (window, undefined) {

    function Transformer(oConf) {
        var that = this;
        if (that.initialize) {
            that.initialize(oConf);
        }
    }

    Transformer.prototype = {
        constructor : Transformer,

        initialize  : fInitialize,

        start       : fStart, // 启动程序
        stop        : fStop, // 停止
        render      : fRender,
        initParam   : fInitParam,
        loadImage   : fLoadImage, // 加载图片

        run         : fRun, // 开始执行动画
        nextStep    : fNextStep, // 执行下一步
        showSlogan  : fShowSlogan,
        change      : fChange,

        _setTimeout : _fSetTimeout // 修复 setTimeout 的 this 指向
    };

    window.Transformer = Transformer;

    function fInitialize(oConf) {
        var that = this;

        // 一些链接
        // that.baseUrl = 'http://www.baidu.com/aladdin/img/transformer/';
        that.baseUrl = 'images/'
        that.closeBg = that.baseUrl + 'close.png';

        // 信息
        that.data = {
            src: [],    // 图片路径
            status: []  // 图片加载状态, true表示加载完成
        };

        that.curStep = 0; // R 执行步骤
        that.totalStep = 101; // 全部步骤
        that.totalImageCount = 25; // 全部图片数量
        that.startCount = 25; // 加载的图片数量，达到这个数量就可以开始了
        that.duration = 80; // 动画的执行间隔
        that.pauseDuration = 800;


        that.zVal = 1000; // 初始 z-index 的值
        that.posIndex = 0; // 1张图片分4格，表示第几格 o
        that.imageIndex = 0; // 当前使用的图片序号 R
    }

    function fStart() {
        var that = this;

        // 初始化容器
        that.render();

        // 初始化相关数据，需要根据容器的宽度确定
        that.initParam();

        // 加载图片
        that.loadImage(that.totalImageCount);
    }

    function fStop() {
        var that = this;

        if (that.stoped) {
            return;
        }

        clearTimeout(that.timer);
        $('#transformer-close').unbind();
        $('#transformer-box').remove();
    }

    function fRender() {
        var that = this;
        var oContainer = that.container = $('#container').css('position', 'relative');
        var oTransformerBox = $("#transformer-box");
        if (oTransformerBox.length === 0) {
            var oD = $('<div id="transformer-box" class="xpath-log" style="display:none;"></div>');
            var oAk = $('<div id="transformer-canvas"><a id="transformer-close" href="javascript:">&nbsp;</a><div style="display:none"></div><style> #transformer-box{background:#fff;position:absolute;top:-20px;left:0;z-index:1000;} #transformer-container1{background:#fff;position:absolute;z-index:1000;} #transformer-container2{background:#fff;position:absolute;z-index:1000;} #transformer-close{width:50px;height:50px; background: url("' + that.closeBg + '"); position:absolute;top:0;right:0;display:block;color:#333; text-decoration:none; z-index: 10000; } #transformer-img{width:100%;height:100%;display:block;} </style></div>');
            var oAc = $('<div id="transformer-container1" style="z-index: 0"> &nbsp </div>');
            var oAA = $('<div id="transformer-container2" style="z-index: 1000;"> &nbsp </div>');

            oContainer.append(oD);
            oD.append(oAk);
            oAk.append(oAc).append(oAA);

            // 停止
            $('#transformer-close').on('click', function () {
                that.stop();
            });

        } else {
            oTransformerBox.show()
        }
    }

    function fInitParam() {
        var that = this;
        if (that.container.width() >= 1222) { // 小尺寸图片
            that.imagePath = that.baseUrl + 'img-kp0705/';
            that.imagePosition = ['0px 0px', '-1222px 0px', '0px -706px', '-1222px -706px'];
            that.imageSize = ';width:1222px ;height:706px';
            that.canvasStyle = 'width:1222px ;height:706px; position: relative;';
        } else { // 大尺寸图片
            that.imagePath = that.baseUrl + 'img-zp0705/';
            that.imagePosition = ['0px 0px', '-1002px 0px', '0px -689px', '-1002px -689px'];
            that.imageSize = ';width:1002px; height:689px';
            that.canvasStyle = 'width:1002px; height:689px;  position: relative;';
        }

        that.imageEndSrc = that.imagePath + 'small_00001.jpg';
        that.imagePosCount = that.imagePosition.length;
    }

    function fLoadImage(nCount) {
        var that = this;
        var oData = that.data;
        var nLoaded = 0; // 已加载完成
        var oImage, sSrc;

        for (var i = 0; i < nCount; i++) {
            sSrc = that.imagePath + '0000' + i + '.jpg';
            oImage = new Image();

            // 判断是否加载完成
            oImage.onload = (function (i) {
                return function () {
                    oData.status[i] = true;
                    nLoaded++;

                    // 加载到一定数量，开始
                    if (nLoaded === that.startCount) {
                        that._setTimeout('run', that.duration);
                    }
                }
            })(i);

            oImage.src =  that.imagePath + '/0000' + i + '.jpg';
            oData.src.push(sSrc);
        }

        oImage = new Image();
        oImage.src = that.imageEndSrc;
    }

    function fRun() {
        var that = this;

        if (that.curStep > that.totalStep) {
            return;
        }

        if (that.curStep === 0) {
            $('#transformer-box').show();
        }

        if (that.curStep === 92) {
            that.showSlogan();
            that._setTimeout('run', that.duration);
        } else {
            if (that.curStep === 93) {
                that.nextStep();
                that._setTimeout('run', that.pauseDuration);
            } else {
                if (that.curStep === that.totalStep) {
                    that.nextStep();
                    that._setTimeout('stop', that.duration);
                } else {
                    that.nextStep();
                    that._setTimeout('run', that.duration);
                }
            }
        }
    }

    function fNextStep() {
        var that = this;
        var oData = that.data;
        var sStyle = that.imageIndex >= that.totalImageCount ? '' : 'background-image: url(' + oData.src[that.imageIndex] + ');background-position: ' + that.imagePosition[that.posIndex] + that.imageSize;
        that.change(sStyle);

        // 修正位置
        that.posIndex = (that.posIndex + 1) % that.imagePosCount;

        // 修正图片序号
        if (that.posIndex == 0) {
            that.imageIndex++;
        }
    }

    function fShowSlogan() {
        var that = this;
        that.change('background-image: url(' + that.imageEndSrc + ');' + that.imageSize);
    }

    function fChange(sStyle) {
        var that = this;
        var oWin = $(window);

        $('#transformer-box').attr('style', 'width: ' + oWin.width() + 'px; height: ' + oWin.height() + 'px;');
        $('#transformer-canvas').attr('style', that.canvasStyle);

        if (that.curStep % 2 == 0) {
            $('#transformer-container2').css('z-index', that.zVal);
            $('#transformer-container1').attr('style', sStyle);
        } else {
            $('#transformer-container1').css('z-index', that.zVal);
            $('#transformer-container2').attr('style', sStyle);
        }

        that.zVal++;
        that.curStep++;
    }

    function _fSetTimeout(sName, nDuration) {
        var that = this;

        if (!that[sName]) {
            return;
        }

        that.timer = setTimeout(function () {
            that[sName]();
        }, nDuration);
    }


})(window);