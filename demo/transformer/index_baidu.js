var transformer = (function() {
    var M = false;
    var X = "http://www.baidu.com/aladdin/img/transformer/";
    var y = 15;
    var V = true;
    var A = "img-kp0705";
    var H = "img-zp0705";
    var ab = ["0px 0px", "-1222px 0px", "0px -706px", "-1222px -706px"];
    var ag = ["0px 0px", "-1002px 0px", "0px -689px", "-1002px -689px"];
    var S = ab.length;
    var g = true;
    var m = X + "/img/close.png";
    var K = 80;
    var F = 800;
    var W = 101;
    var R = 0;
    var o = 0;
    var ah = 0;
    var U = new Date().getTime(), ae = "transformer_imgs_" + U;
    window[ae] = {};
    var B = null;
    var d = null;
    var ac = null;
    var aa = null;
    var z = null;
    var p = null;
    var i = 0;
    var x = -1;
    var v = 100;
    var Q = null;
    var h = true;
    var c = true;
    var ad = 0;
    var L = {};
    var f = new Date().getTime();
    var G = f;
    function b(an) {
        if (!M) {
            return
        }
        var al = new Date().getTime();
        var am = al - f;
        var ak = al - G;
        G = al;
        console.log("[" + (am / 1000) + "s, " + ak + "ms] " + an)
    }
    function aj(ao) {
        if ("JSON" in window) {
            return JSON.stringify(ao)
        }
        var an = typeof (ao);
        if (an != "object" || ao === null) {
            if (an == "string") {
                ao = '"' + ao + '"'
            }
            return String(ao)
        } else {
            var ap, al, am = [], ak = (ao && ao.constructor == Array);
            for (ap in ao) {
                al = ao[ap];
                an = typeof (al);
                if (an == "string") {
                    al = '"' + al + '"'
                } else {
                    if (an == "object" && al !== null) {
                        al = JSON.stringify(al)
                    }
                }
                am.push((ak ? "" : '"' + ap + '":') + String(al))
            }
            return (ak ? "[" : "{") + String(am) + (ak ? "]" : "}")
        }
    }
    function Z(al) {
        $("#container").css("position", "relative");
        B = document.getElementById("container");
        if (V || $("#transformer-box").length == 0) {
            d = document.createElement("div");
            var ak = document.createElement("div");
            ac = document.createElement("div");
            aa = document.createElement("div");
            d.id = "transformer-box";
            ak.id = "transformer-canvas";
            ac.id = "transformer-container1";
            aa.id = "transformer-container2";
            ak.innerHTML = '<a id="transformer-close" href="javascript:">&nbsp;</a><div style="display:none"></div><style> #transformer-box{background:#fff;position:absolute;top:-20px;left:0;z-index:1000;} #transformer-container1{background:#fff;position:absolute;z-index:1000;} #transformer-container2{background:#fff;position:absolute;z-index:1000;} #transformer-close{width:50px;height:50px; background: url("' + m + '"); position:absolute;top:0;right:0;display:block;color:#333; text-decoration:none; z-index: 10000; } #transformer-img{width:100%;height:100%;display:block;} </style>';
            ac.innerHTML = " &nbsp ";
            aa.innerHTML = " &nbsp ";
            B.appendChild(d);
            d.appendChild(ak);
            ak.appendChild(ac);
            ak.appendChild(aa);
            p = document.getElementById("transformer-close");
            p.onclick = C;
            $("#transformer-container2").css("z-index", 1000);
            $("#transformer-container1").css("z-index", 0);
            $("#transformer-box").attr("class", "xpath-log");
            b(al);
            if (typeof (al) !== "undefined") {
                var al = aj(al);
                $("#transformer-box").attr("data-click", al)
            }
        } else {
            $("#transformer-box").show()
        }
    }
    function Y() {
        if (g) {
            return A
        }
        return H
    }
    function P(ak) {
        if (g) {
            return ab[ak]
        } else {
            return ag[ak]
        }
    }
    function ai() {
        if (g) {
            return ";width:1222px ;height:706px"
        }
        return ";width:1002px; height:689px"
    }
    function e() {
        if (g) {
            return "width:1222px ;height:706px; position: relative;"
        }
        return "width:1002px; height:689px;  position: relative;"
    }
    function s() {
        var al = $(window).width();
        var ak = $(window).height();
        return "width: " + al + "px; height: " + ak + "px;"
    }
    function N() {
        return X + "/" + Y() + "/small_00001.jpg"
    }
    function E(ak) {
        return X + "/" + Y() + "/0000" + ak + ".jpg"
    }
    function a(ak) {
        return window[ae][ak]
    }
    function af(am) {
        var al = 5;
        var ak = String(am);
        while (ak.length < al) {
            ak = "0" + ak
        }
        return ak
    }
    var n = 1000;
    function q() {
        var al = E(R - 1);
        var ak = P(0);
        var am = "background-image: url(" + al + ");background-position: " + ak + ai();
        return am
    }
    function T(ak) {
        b("doubleBufferShowImg frame_index=" + ah + ", index=" + R + ", pos_index=" + o + ", frame_index=" + ah + ", style=" + ak);
        $("#transformer-box").attr("style", s());
        $("#transformer-canvas").attr("style", e());
        if (ah % 2 == 0) {
            $("#transformer-container2").css("z-index", n);
            $("#transformer-container1").attr("style", ak)
        } else {
            $("#transformer-container1").css("z-index", n);
            $("#transformer-container2").attr("style", ak)
        }
        ++n;
        ++ah
    }
    function j() {
        b("showSlogan");
        var ak = "background-image: url(" + N() + ");" + ai();
        T(ak)
    }
    function l() {
        if (R >= v) {
            return ""
        }
        var al = E(R);
        var ak = P(o);
        var am = "background-image: url(" + al + ");background-position: " + ak + ai();
        return am
    }
    function O() {
        var ak = l();
        T(ak);
        o = (o + 1) % S;
        if (o == 0) {
            R += 1
        }
    }
    function k() {
        if (ah > W) {
            return
        }
        t();
        if (ah == 92) {
            j();
            x = setTimeout(k, K)
        } else {
            if (ah == 93) {
                O();
                x = setTimeout(k, F)
            } else {
                if (ah == W) {
                    O();
                    x = setTimeout(C, K)
                } else {
                    O();
                    x = setTimeout(k, K)
                }
            }
        }
    }
    function I(al) {
        t();
        v = al;
        for (var ak = 0; ak < al; ak++) {
            window[ae][ak] = new Image();
            window[ae][ak].src = E(ak);
            window[ae][ak].onload = (function(am) {
                return function() {
                    b("loaded " + am);
                    L[am] = true;
                    ++ad;
                    if (ad == y && !h) {
                        b("loaded " + ad + " images, start playing");
                        u()
                    }
                }
            })(ak)
        }
        window[ae][al] = new Image();
        window[ae][al].src = N()
    }
    function J(ak) {
        if (ak in L) {
            return true
        }
        return false
    }
    function u() {
        x = setTimeout(k, K)
    }
    function D(ak) {
        C();
        Z(ak);
        h = false;
        c = false;
        R = 0;
        o = 0;
        ah = 0;
        if (ad >= y) {
            u()
        }
    }
    function w() {
        if (h) {
            return
        }
        h = true;
        clearTimeout(x);
        if (Q) {
            Q()
        }
    }
    function C() {
        b("dispose disposed=" + c);
        if (c) {
            return
        }
        c = true;
        w();
        if (V) {
            p.onclick = null;
            B.removeChild(d)
        } else {
            $("#transformer-box").hide();
            $("#transformer-container1").attr("style", "");
            $("#transformer-container2").attr("style", "")
        }
    }
    function r(ak) {
        Q = ak
    }
    function t() {
        if (typeof (bds) !== "undefined") {
            if (bds.comm && bds.comm.containerSize) {
                var ak = bds.comm.containerSize;
                if (ak === "s") {
                    g = false
                } else {
                    if (ak === "l") {
                        g = true
                    }
                }
            }
        } else {
            B = document.getElementById("container");
            i = B.clientWidth;
            if (i < 1222) {
                g = false
            } else {
                g = true
            }
        }
    }
    I(25);
    return {start: D,dispose: C,resize: t,end: r}
}());
if (typeof (bds) !== "undefined") {
    bds.event.on("se.window_resize", transformer.resize)
}
;
