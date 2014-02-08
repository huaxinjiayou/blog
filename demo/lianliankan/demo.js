(function (window, undefined) {

    var nIndex = 0;
    var oCanvasEl = document.getElementById('llkCanvas');
    var oStartEl = document.getElementById('llkStart');
    var oSuggestEl = document.getElementById('llkSuggest');
    var oResetEl = document.getElementById('llkReset');
    var oLianLianKan = new window.LianLianKan(_fGetConf());
    oLianLianKan.start();

    Util.addEvent(oStartEl, 'click', function () {
        oLianLianKan.stop();
        oLianLianKan = new window.LianLianKan(_fGetConf());
        oLianLianKan.start();
    });

    Util.addEvent(oSuggestEl, 'click', function () {
        oLianLianKan.suggest();
    });

    Util.addEvent(oResetEl, 'click', function () {
        oLianLianKan.resort();
    });

    function _fGetConf() {
        var nBorder = 1;
        var nImgLength = 40;
        var nImgCount = 20;
        var nTotalImgCount = 20;
        var fEnd = function () {alert('么么哒')};

        var aConf = [
            {
                container: oCanvasEl,
                xCount: 14,
                yCount: 11,
                border: nBorder,
                imgLength: nImgLength,
                imageCount: nImgCount,
                totalImageCount: nTotalImgCount,

                remain: {
                    '0': [      2, 3, 4,             9, 10, 11],
                    '1': [   1, 2, 3, 4, 5,       8, 9, 10, 11, 12],
                    '2': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
                    '3': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
                    '4': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
                    '5': [   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                    '6': [      2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                    '7': [         3, 4, 5, 6, 7, 8, 9, 10],
                    '8': [            4, 5, 6, 7, 8, 9],
                    '9': [               5, 6, 7, 8],
                   '10': [                  6, 7]
                },

                end: fEnd
            }, {
                container: oCanvasEl,
                xCount: 21,
                yCount: 15,
                border: nBorder,
                imgLength: nImgLength,
                imageCount: nImgCount,
                totalImageCount: nTotalImgCount,

                remain: {
                    '0': [               5,                                 15],
                    '1': [            4,    6,                          14,     16],
                    '2': [         3,    5,    7,                   13,     15,     17],
                    '3': [      2, 3,    5,    7, 8, 9, 10, 11, 12, 13,     15,   , 17, 18],
                    '4': [   1,                                                             19],
                    '5': [0,                                                                    20],
                    '6': [0,    2, 3, 4, 5,                                 15, 16, 17, 18,     20],
                    '7': [0,                                                                    20],
                    '8': [0,       3, 4,                                        16, 17,         20],
                    '9': [0,       3, 4,                                        16, 17,         20],
                   '10': [0,                            10,                                     20],
                   '11': [0,    2, 3, 4,    6,       9,     11,         14,     16, 17, 18,     20],
                   '12': [   1,    3,          7, 8,            12, 13,             17,     19],
                   '13': [      2, 3,                                               17, 18],
                   '14': [         3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
                },

                end: fEnd
            }, {
                container: oCanvasEl,
                xCount: 14,
                yCount: 11,
                border: nBorder,
                imgLength: nImgLength,
                imageCount: nImgCount,
                totalImageCount: nTotalImgCount,
                end: fEnd
            }
        ];

        var oConf = aConf[nIndex % aConf.length];
        nIndex++;
        return oConf;
    }

})(window);