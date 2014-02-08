(function (window, undefined) {
    var Util = window.Util;

    function LianLianKan(oConf) {
        var that = this;
        that.initialize(oConf);
    }

    LianLianKan.DISTANCE = {
        X: 0,
        Y: 1
    };

    LianLianKan.prototype = {
        constructor: LianLianKan,
        initialize: fInitialize,

        point2index: fPoint2index,
        index2point: fIndex2Point,
        big2small: fBig2Small,
        small2big: fSmall2Big,

        canCross: fCanCross,
        samePoint: fSamePoint,

        createRemain: fCreateRemain,
        createData: fCreateData,
        createLineContainer: fCreateLineContainer,
        createImgContainer: fCreateImgContainer,

        start: fStart,
        stop: fStop,
        isDie: fIsDie,
        resort: fResort,
        link: fLink,
        showLink: fShowLink,
        hideLink: fHideLink,
        getSuggest: fGetSuggest,
        suggest: fSuggest,
        getCrossPoints: fGetCrossPoints
    }

    function fInitialize(oConf) {
        var that = this;
        var oContainer = oConf.container || document.body;
        var nXCount = oConf.xCount = oConf.xCount || 10;
        var nYCount = oConf.yCount = oConf.yCount || 10;
        var nLength = oConf.imgLength = oConf.imgLength || 50;
        var nBorder = oConf.border = oConf.border || 1;

        // 缓存一些数据
        that.rawConfing = oConf;
        that.linePoll = {};
        that.itemPoll = {};
        that._suggest = []; // 提示操作
        that.data = [];
        that.target = [];
        that.removeCount = 0; // 已经消除的数量
        that.count = {
            lineX: 2 * nXCount + 2,
            lineY: 2 * nYCount + 2,
            imgX: nXCount,
            imgY: nYCount
        };

        // 渲染容器
        that.remain = that.createRemain(oConf.remain);
        that.totalCount = that.remain.length || nXCount * nYCount;
        that.createData(that.totalCount, oConf.totalImageCount, oConf.imageCount, that.remain);
        that.lineContainer = that.createLineContainer(that.count.lineX, that.count.lineY, nLength / 2 - nBorder, nBorder);
        oContainer.appendChild(that.lineContainer);
    }

    function fPoint2index(nX, nY) {
        var that = this;
        if (arguments.length === 1) {
            var oPoint = nX;
            nX = oPoint.x;
            nY = oPoint.y;
        }
        return nY * that.rawConfing.xCount + nX;
    }

    function fIndex2Point(nIndex) {
        var that = this;
        var nXCount = that.rawConfing.xCount;
        var nX = nIndex % nXCount;
        var nY = (nIndex - nX) / nXCount;
        return {
            x: nX,
            y: nY
        };
    }

    function fBig2Small(oPoint) {
        return {
            x: 2 * oPoint.x + 2,
            y: 2 * oPoint.y + 2
        }
    }

    function fSmall2Big(oPoint) {
        return {
            x: oPoint.x / 2 - 1,
            y: oPoint.y / 2 - 1
        }
    }

    function fCanCross(oPoint, nDistance, bFlag) {
        var that = this;
        var bResult = false;
        var DISTANCE = LianLianKan.DISTANCE;
        var oCount = that.count;
        var nStep = bFlag ? 1 : -1;

        if (oPoint.x === 0 || oPoint.y === 0 || oPoint.x === oCount.lineX || oPoint.y === oCount.lineY) {
            return true;
        }

        switch (nDistance) {
            case DISTANCE.X:
                if (oPoint.x % 2) {
                    oPoint.x += nStep;

                    if (oPoint.x === 0 || oPoint.x === oCount.lineX) {
                        oPoint.x -= 2 * nStep;
                    }
                }
                break;
            case DISTANCE.Y:
                if (oPoint.y % 2) {
                    oPoint.y += nStep;

                    if (oPoint.y === 0 || oPoint.y === oCount.lineY) {
                        oPoint.y -= 2 * nStep;
                    }
                }
        }

        oPoint = that.small2big(oPoint);
        var nIndex = that.point2index(oPoint);
        return that.data[nIndex] === undefined;
    }

    function fSamePoint(oPoint1, oPoint2) {
        return oPoint1.x === oPoint2.x && oPoint1.y === oPoint2.y;
    }

    function fCreateRemain(oRemainConf) {
        if (!oRemainConf) {
            return [];
        }

        var that = this;
        var aRemain = [];
        var i, l, aTmp;
        for (var n in oRemainConf) {
            aTmp = oRemainConf[n];
            if (oRemainConf.hasOwnProperty(n) && aTmp) {
                n = +n;
                for (i = 0, l = aTmp.length; i < l; i++) {
                    aRemain.push(that.point2index(aTmp[i], n));
                }
            }
        }

        return aRemain;
    }

    function fCreateData(nTotalCount, nImgCount, nImgShowCount, aRemain) {
        aRemain = aRemain || [];

        var that = this;
        var aData = that.data;
        var aType = [];
        var aAllType = [];
        var nMinCount = nTotalCount / 3; // 设置默认的最小值，防止设定值过大
        var i, nTmp, nType;

        nMinCount = Math.min(nMinCount, nImgCount, nImgShowCount);
        aData.length= nTotalCount;
        aType.length = nMinCount;

        if (nImgCount <= 0) {
            Util.each(aType, function (v, i) {
                aType[i] = i;
            });
        } else {
            aAllType.length = nImgCount;
            Util.each(aAllType, function (v, i) {
                aAllType[i] = i;
            });

            // 随机抽取
            Util.each(aType, function (v, i) {
                nTmp = Math.floor(Math.random() * aAllType.length);
                aType[i] = aAllType[nTmp];
                aAllType.splice(nTmp, 1);
            });

            aAllType.length = 0;
        }

        if (aRemain.length === 0) {
            aRemain.length = nTotalCount;
            Util.each(aRemain, function (v, i) {
                aRemain[i] = i;
            });
        } else if (aRemain.length > nTotalCount) {
            aRemain.length = nTotalCount;
        }

        for (i = 0; i < nTotalCount && aRemain.length > 0; i++) {
            nTmp = Math.floor(Math.random() * aRemain.length);
            if (i < nMinCount) { // 确保出现指定数量的图片
                nType = aType[i];

                // 第一张图片位置
                aData[aRemain[nTmp]] = nType;
                aRemain.splice(nTmp, 1);

                // 另一张相同图片的位置
                nTmp = Math.floor(Math.random() * aRemain.length);
                aData[aRemain[nTmp]] = nType;
                aRemain.splice(nTmp, 1);
            } else {
                nType = aType[Math.floor(Math.random() * aType.length)];

                // 第一张图片位置
                aData[aRemain[nTmp]] = nType;
                aRemain.splice(nTmp, 1);

                // 另一张相同图片的位置
                nTmp = Math.floor(Math.random() * aRemain.length);
                aData[aRemain[nTmp]] = nType;
                aRemain.splice(nTmp, 1);
            }
        }
    }

    function fCreateLineContainer(nX, nY, nLength, nBorder) {
        var that = this;
        var oLinePoll = that.linePoll;
        var oDiv = document.createElement('DIV');
        var oUl = document.createElement('UL');
        var oLi = document.createElement('LI');
        var x, y, oTmpLi, sClassName;

        // 设置尺寸
        oDiv.style.width = oUl.style.width = nX * (nLength + nBorder) + nBorder + 'px';
        oDiv.style.height = oUl.style.height = nY * (nLength + nBorder) + nBorder + 'px';
        oLi.style.width = nLength + 'px';
        oLi.style.height = nLength + 'px';
        oDiv.className = 'llk-container';
        oUl.className = 'line-ul';

        for (y = 0; y < nY; y++) {
            for (x = 0; x < nX; x++) {
                oTmpLi = oLi.cloneNode(false);
                sClassName = '';

                if (x === nX - 1) {
                    sClassName += ' border-right';
                }

                if (y === nY - 1) {
                    sClassName += ' border-bottom';
                }

                if (sClassName !== '') {
                    oTmpLi.className = sClassName;
                }

                oUl.appendChild(oTmpLi);
                oLinePoll[x + '_' + y] = oTmpLi;
            }
        }

        oDiv.appendChild(oUl);
        return oDiv;
    }

    function fCreateImgContainer(nX, nY, nLength, nBorder) {
        var that = this;
        var oData = that.data;
        var oItemPoll = that.itemPoll;
        var oUl = document.createElement('UL');
        var oLi = document.createElement('LI');
        var oImg = document.createElement('IMG');
        var nSize = nLength - 2;
        var x, y, nVal, oTmpLi, oTmpImg;

        oLi.style.width = nSize + 'px';
        oLi.style.height = nSize + 'px';
        oUl.style.width = nX * nLength + 'px';
        oUl.style.height = nY * nLength + 'px';
        oUl.style.left = oUl.style.top = (nLength + nBorder) / 2 + 'px';
        oUl.className = 'img-ul';

        for (y = 0; y < nY; y++) {
            for (x = 0; x < nX; x++) {
                oTmpLi = oLi.cloneNode(false);

                nVal = oData[that.point2index(x, y)];
                if (nVal !== undefined) {
                    oTmpImg = oImg.cloneNode(false);
                    oTmpImg.src = 'images/' + nVal + '.gif';
                    oTmpLi.appendChild(oTmpImg);
                    oTmpLi.setAttribute('data-point', x + '_' + y);
                }

                oUl.appendChild(oTmpLi);
                oItemPoll[x + '_' + y] = oTmpLi;
            }
        }

        return oUl;
    }

    function fStart() {
        var that = this;
        var oConf = that.rawConfing;

        if (that.inited) {
            return;
        }

        that.inited = true;

        // 显示图片
        that.imgContainer = that.createImgContainer(that.count.imgX, that.count.imgY, oConf.imgLength, oConf.border);
        that.lineContainer.appendChild(that.imgContainer);

        Util.addEvent(that.lineContainer, 'click', function (oEvent) {
            var oEl = Util.getTarget(oEvent);
            if (oEl.nodeName.toLowerCase() === 'img') {
                oEl = oEl.parentNode;

                var aPoint = oEl.getAttribute('data-point').split('_');
                var oPoint = {x: +aPoint[0], y: +aPoint[1]};
                var nPointData = that.data[that.point2index(oPoint)];
                var aTarget = that.target;

                if (aTarget.length === 0) {
                    if (nPointData === undefined) {
                        return;
                    }

                    aTarget.push({
                        el: oEl,
                        data: nPointData
                    });
                    Util.addClass(oEl, 'item-focus');
                } else {
                    var oTarget = aTarget[0];

                    if (oEl === oTarget.el || nPointData === undefined || nPointData !== oTarget.data) {
                        Util.removeClass(oTarget.el, 'item-focus');
                        aTarget.length = 0;

                        if (nPointData !== oTarget.data) {
                            aTarget.push({
                                el: oEl,
                                data: nPointData
                            });
                            Util.addClass(oEl, 'item-focus');
                        }
                    } else {
                        aTarget.push({
                            el: oEl,
                            data: nPointData
                        });
                        Util.addClass(oEl, 'item-focus');

                        var bLink = that.link(aTarget);

                        if (bLink) {
                            aTarget.length = 0;
                        } else {
                            aTarget.shift();
                            Util.addClass(aTarget[0].el, 'item-focus');
                        }
                    }
                }

            }
        });
    }

    function fStop() {
        var that = this;

        // 事件就不取消了，好麻烦
        that.rawConfing.container.innerHTML = '';
        that.rawConfing = null;
        that.linePoll = null;
        that.itemPoll = null;
        that._suggest.length = 0;
        that.data.length = 0;
        that.count = null;
        that.lineContainer = null;
        that.imgContainer = null;
    }

    function fIsDie() {
        var that = this;
        return that.getSuggest().length === 0;
    }

    function fLink(aTarget) {
        aTarget = aTarget.slice(0);

        var that = this;
        var aPoint1 = aTarget[0].el.getAttribute('data-point').split('_');
        var aPoint2 = aTarget[1].el.getAttribute('data-point').split('_');
        var oPoint1 = {x: +aPoint1[0], y: +aPoint1[1]};
        var oPoint2 = {x: +aPoint2[0], y: +aPoint2[1]};
        var aCrossPoints = that.getCrossPoints(oPoint1, oPoint2);
        if (aCrossPoints.length > 0) { // 可以消除
            var aLink = that.showLink(aCrossPoints);
            that.hideLink(aTarget, aLink, 200);

            that.data[that.point2index(oPoint1)] = undefined;
            that.data[that.point2index(oPoint2)] = undefined;

            // 去掉提示
            if (that._suggest.length > 0) {
                that._suggest.length = 0;
            }

            aCrossPoints.length = 0;
            that.removeCount += 2;

            if (that.removeCount === that.totalCount) {
                if (that.rawConfing.end) {
                    that.rawConfing.end.call(that);
                }

                if (that.onEnd) {
                    that.onEnd.call(that);
                }
            }
            return true;
        } else { // 不能连接还原状态
            Util.removeClass(aTarget[0].el, 'item-focus');
            Util.removeClass(aTarget[1].el, 'item-focus');
            return false;
        }
    }

    function fShowLink(aPoints) {
        aPoints = aPoints.slice(0);

        var that = this;
        var DISTANCE = LianLianKan.DISTANCE;
        var oLinePoll = that.linePoll;
        var oCount = that.count;
        var aResult = [];
        var nDistance;

        if (that.samePoint(aPoints[2], aPoints[3])) {
            aPoints.pop();
        }

        if (that.samePoint(aPoints[0], aPoints[1])) {
            aPoints.shift();
        }

        for (var i = 0, l = aPoints.length - 1; i < l; i++) {
            nDistance = aPoints[i].y === aPoints[i + 1].y ? DISTANCE.X : DISTANCE.Y;
            _fDraw(aPoints[i], aPoints[i + 1], nDistance, i != 0, i != l - 1);
        }
        return aResult;

        function _fDraw(oStart, oEnd, nDistance, bIncludeS, bIncludeE) {
            var oEl, nStep, nStarX, nStarY, nEndX, nEndY, nX, nY;

            switch (nDistance) {
                case DISTANCE.X:
                    nStep = oStart.x < oEnd.x ? 1 : -1;
                    nStarX = bIncludeS ? (oStart.x < oEnd.x ? oStart.x : oStart.x + nStep) : oStart.x + (oStart.x < oEnd.x ? nStep : 2 * nStep);
                    nEndX = bIncludeE ? (oStart.x < oEnd.x ? oEnd.x - nStep : oEnd.x) : oEnd.x - (oStart.x < oEnd.x ? 2 * nStep : nStep);
                    if (oStart.y < oCount.lineY) {
                        for (nX = nStarX; nX * nStep <= nEndX * nStep; nX += nStep) {
                            oEl = oLinePoll[nX + '_' + oStart.y];
                            Util.addClass(oEl, 'special-top');
                            aResult.push({el: oEl, name: 'special-top'});
                        }
                    } else {
                        for (nX = nStarX; nX * nStep <= nEndX * nStep; nX += nStep) {
                            oEl = oLinePoll[nX + '_' + (oStart.y - 1)];
                            Util.addClass(oEl, 'special-bottom');
                            aResult.push({el: oEl, name: 'special-bottom'});
                        }
                    }
                    break;
                case DISTANCE.Y:
                    nStep = oStart.y < oEnd.y ? 1 : -1;
                    nStarY = bIncludeS ? (oStart.y < oEnd.y ? oStart.y : oStart.y + nStep) : oStart.y + (oStart.y < oEnd.y ? nStep : 2 * nStep);
                    nEndY = bIncludeE ? (oStart.y < oEnd.y ? oEnd.y - nStep : oEnd.y) : oEnd.y - (oStart.y < oEnd.y ? 2 * nStep : nStep);
                    if (oStart.x < oCount.lineX) {
                        for (nY = nStarY; nY * nStep <= nEndY * nStep; nY += nStep) {
                            oEl = oLinePoll[oStart.x + '_' + nY];
                            Util.addClass(oEl, 'special-left');
                            aResult.push({el: oEl, name: 'special-left'});
                        }
                    } else {
                        for (nY = nStarY; nY * nStep <= nEndY * nStep; nY += nStep) {
                            oEl = oLinePoll[oStart.x - 1 + '_' + nY];
                            Util.addClass(oEl, 'special-right');
                            aResult.push({el: oEl, name: 'special-right'});
                        }
                    }
                    break;
            }
        }
    }

    function fHideLink(aTarget, aLink, nDuration, bNotDisappear) {
        setTimeout(function () {
            Util.each(aLink, function (oInfo) {
                Util.removeClass(oInfo.el, oInfo.name);
            });

            Util.each(aTarget, function (oInfo) {
                Util.removeClass(oInfo.el, 'item-focus');

                if (!bNotDisappear) {
                    oInfo.el.innerHTML = '';
                }
            });
            aLink.length = 0;
            aTarget.length = 0;
        }, nDuration);
    }

    function fGetSuggest() {
        var that = this;
        if (that._suggest.length > 0) {
            return that._suggest;
        }

        var aData = that.data;
        var l = aData.length;
        var aCrossPoints, i, j;
        for (i = 0; i < l; i++) {
            if (aData[i] === undefined) {
                continue;
            }

            for (j = i + 1; j < l; j++) {
                if (aData[i] === aData[j]) {
                    aCrossPoints = that.getCrossPoints(that.index2point(i), that.index2point(j));

                    if (aCrossPoints.length > 0) {
                        that._suggest = [that.index2point(i), that.index2point(j), aCrossPoints];
                        return that._suggest;
                    }
                }
            }
        }

        that._suggest = [];
    }

    function fSuggest() {
        var that = this;

        if (!that.inited) {
            return;
        }

        var aSuggest = that.getSuggest();

        if (aSuggest.length === 0) {
            alert('呵呵...');
        } else {
            var aLink =  that.showLink(aSuggest[2]);
            var oStartEl = that.itemPoll[aSuggest[0].x + '_' + aSuggest[0].y];
            var oEndEl = that.itemPoll[aSuggest[1].x + '_' + aSuggest[1].y];
            Util.addClass(oStartEl, 'item-focus');
            Util.addClass(oEndEl, 'item-focus');
            that.hideLink([{el: oStartEl}, {el: oEndEl}], aLink, 600, true);
        }
    }

    function fResort() {
        var that = this;

        if (!that.inited) {
            return;
        }

        var oConf = that.rawConfing;
        that._suggest.length = 0;

        do {
            _fQuickReload();
        } while(that.isDie());

        // 替换图片
        var oImgContainer = that.createImgContainer(that.count.imgX, that.count.imgY, oConf.imgLength, oConf.border);
        that.lineContainer.replaceChild(oImgContainer, that.imgContainer);
        that.imgContainer = oImgContainer;

        function _fQuickReload() {
            var aTmp = [];
            var aRemain = [];
            var aData = that.data;

            for (var i = 0, l = aData.length; i < l; i++) {
                aRemain.push(i);
                if (aData[i] !== undefined) {
                    aTmp.push(aData[i]);
                    aData[i] = undefined;
                }
            }

            Util.each(aTmp, function (v, i) {
                i = Math.floor(Math.random() * aRemain.length);
                aData[aRemain[i]] = v;
                aRemain.splice(i, 1);
            });

            aTmp.length = 0;
            aRemain.length = 0;
        }
    }

    function fGetCrossPoints(oStart, oEnd) {
        var that = this;
        var DISTANCE = LianLianKan.DISTANCE;

        oStart = that.big2small(oStart);
        oEnd = that.big2small(oEnd);

        if (oStart.y === oEnd.y) { // 同一水平线上
            return _fSolutionX(oStart, oEnd).turn;
        } else if (oStart.x === oEnd.x) { // 同一垂直线上
            return _fSolutionY(oStart, oEnd).turn;
        } else {
            var oX = _fSolutionX(oStart, oEnd);
            var oY = _fSolutionY(oStart, oEnd);
            return oX.length <= oY.length ? oX.turn : oY.turn;
        }

        function _fSolutionX(oStart, oEnd) {
            var nLength = Infinity;
            var nDif = 0;
            var oPointStart = {x: oStart.x};
            var oPointEnd = {x: oEnd.x};
            var aTurn = [];

            for (var nY = 0, l = that.count.lineY; nY <= l; nY += 2) {
                oPointStart.y = nY;
                oPointEnd.y = nY;

                if (_fCanCross(oPointStart, oPointEnd, DISTANCE.X, !that.samePoint(oPointStart, oStart), !that.samePoint(oPointEnd, oEnd))) {
                    if (_fCanCross(oPointStart, oStart, DISTANCE.Y, true, false) && _fCanCross(oPointEnd, oEnd, DISTANCE.Y, true, false)) {
                        nDif = Math.abs(nY - oStart.y) + Math.abs(nY - oStart.y);
                        if (nLength > nDif) {
                            nLength = nDif;
                            aTurn = [oStart, {x: oPointStart.x, y: oPointStart.y}, {x: oPointEnd.x, y: oPointEnd.y}, oEnd];
                        }
                    }
                }
            }

            return {length: nLength, turn: aTurn};
        }

        function _fSolutionY(oStart, oEnd) {
            var nLength = Infinity;
            var nDif = 0;
            var oPointStart = {y: oStart.y};
            var oPointEnd = {y: oEnd.y};
            var aTurn = [];

            for (var nX = 0, l = that.count.lineX; nX <= l; nX += 2) {
                oPointStart.x = nX;
                oPointEnd.x = nX;

                if (_fCanCross(oPointStart, oPointEnd, DISTANCE.Y, !that.samePoint(oPointStart, oStart), !that.samePoint(oPointEnd, oEnd))) {
                    if (_fCanCross(oPointStart, oStart, DISTANCE.X, true, false) && _fCanCross(oPointEnd, oEnd, DISTANCE.X, true, false)) {
                        nDif = Math.abs(nX - oStart.x) + Math.abs(nX - oEnd.x);
                        if (nLength > nDif) {
                            nLength = nDif;
                            aTurn = [oStart, {x: oPointStart.x, y: oPointStart.y}, {x: oPointEnd.x, y: oPointEnd.y}, oEnd];
                        }
                    }
                }
            }

            return {length: nLength, turn: aTurn};
        }

        // 判断两个坐标之间水平/垂直方向的方格是否都可以通过
        function _fCanCross(oStart, oEnd, nDistance, bIncludeS, bIncludeE) {
            var bResult = true;
            var oTmpStart, oTmpEnd, oTmp, nFrom, nTo;

            if (nDistance === DISTANCE.X && oStart.x > oEnd.x || nDistance === DISTANCE.Y && oStart.y > oEnd.y) {
                oTmpStart = {x: oEnd.x, y: oEnd.y};
                oTmpEnd = {x: oStart.x, y: oStart.y};
                var bTmp = bIncludeS;
                bIncludeS = bIncludeE;
                bIncludeE = bTmp;
            } else {
                oTmpStart = {x: oStart.x, y: oStart.y};
                oTmpEnd = {x: oEnd.x, y: oEnd.y};
            }

            switch (nDistance) {
                case DISTANCE.X:
                    nFrom = bIncludeS ? oTmpStart.x : oTmpStart.x + 2;
                    nTo = bIncludeE ? oTmpEnd.x : oTmpEnd.x - 2;

                    for (var nX = nFrom; bResult && nX <= nTo; nX += 2) {
                        bResult = that.canCross({x: nX, y: oTmpStart.y}, nDistance, oStart.x < oEnd.x);
                    }
                    break;

                case DISTANCE.Y:
                    nFrom = bIncludeS ? oTmpStart.y : oTmpStart.y + 2;
                    nTo = bIncludeE ? oTmpEnd.y : oTmpEnd.y - 2;

                    for (var nY = nFrom; bResult && nY <= nTo; nY += 2) {
                        bResult = that.canCross({x: oTmpStart.x, y: nY}, nDistance, oStart.y < oEnd.y);
                    }
                    break;
            }

            return bResult;
        }
    }

    window.LianLianKan = LianLianKan;

})(window);