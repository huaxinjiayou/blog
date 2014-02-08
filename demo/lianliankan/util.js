(function (window, undefined) {
    var Util = {
        each: fEach,
        addClass: fAddClass,
        removeClass: fRemoveClass,
        addEvent: fAddEvent,
        getTarget: fGetTarget
    };

    function fEach(arr, func) {
        for (var i = 0, l = arr.length; i < l; i++) {
            func(arr[i], i);
        }
    }

    function fAddClass(oEl, sClassName) {
        if (oEl.className) {
            oEl.className += ' ' + sClassName;
        } else {
            oEl.className = sClassName;
        }
    }

    function fRemoveClass(oEl, sClassName) {
        if (oEl.className) {
            oEl.className = (' ' + oEl.className + ' ').replace(' ' + sClassName.replace(/^\s+|\s+$/, '') + ' ', '');
        }
    }

    function fAddEvent(oEl, sType, fHandler){
        if (oEl.addEventListener) {
            oEl.addEventListener(sType, fHandler, false);
        } else if (oEl.attachEvent) {
            oEl.attachEvent('on' + sType, fHandler);
        } else {
            oEl['on' + sType] = fHandler;
        }
    }

    function fGetTarget(oEvent) {
        return oEvent.target || oEvent.srcElement;
    }
    
    window.Util = Util;
})(window);