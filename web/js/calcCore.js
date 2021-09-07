/**
 * 构建地图
 * @type {BMap.Map}
 */
console.log("=========test.js========");
var map = new BMap.Map("allmap");
// 地图中心的坐标
var x = 113.91226;
var y = 28.615881;
var point = new BMap.Point(x, y);
map.centerAndZoom(point, 17);
var mapType1 = new BMap.MapTypeControl(
    {
        mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP],
        anchor: BMAP_ANCHOR_TOP_LEFT
    }
);
var overView = new BMap.OverviewMapControl();
map.addControl(mapType1);
map.addControl(overView);
var top_right_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT});// 左下角，添加比例尺
var top_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_LEFT, offset: new BMap.Size(5, 50)});  //左上角，添加默认缩放平移控件
map.addControl(top_right_control);
map.addControl(top_right_navigation);
map.addEventListener("click", function (e) {
    alert("当前点的经度：\n" + e.point.lng + "\n当前纬度：\n" + e.point.lat);
});


var fire_jingdu;
var fire_weidu;
var fengxiang;
var fengsu;
var wendu;
var shidu;
var model;
var time;

// 记录模块中的状态信息。0表示未着火，1表示火焰熄灭,2表示初始燃烧，3表示火焰峰值.
var statusArrM1 = [];
var statusArrM2 = [];

for (var i = 0; i < fuelData.length; i++) {
    statusArrM1[i] = [];
    statusArrM2[i] = [];
    for (var j = 0; j < fuelData[0].length; j++) {
        statusArrM1[i][j] = 0;
        statusArrM2[i][j] = 0;
    }
}
// 迭代次数
var itera = 1;

// 区域左上角的经纬度，用来计算点在数组中的坐标
var jingdu_left = 113.910392;
var weidu_up = 28.617189;
var fire_i;
var fire_j;

/**
 * 获取页面中的数据
 */
function getValue() {
    fire_jingdu = document.getElementById("lng_value").value;
    fire_weidu = document.getElementById("lat_value").value;
    fengxiang = document.getElementById("fengxiang_value").value;
    fengsu = document.getElementById("fengsu_value").value;
    wendu = document.getElementById("wendu_value").value;
    shidu = document.getElementById("shidu_value").value;
    if (document.getElementById("WZFModel").checked === true) {
        model = "wzf";
    } else if (document.getElementById("CAModel").checked === true) {
        model = "ca";
    }
    if (fire_jingdu === "" || fire_weidu === "" || fengxiang === "" || fengsu === "" || wendu === "" || shidu === "") {
        alert("请输入数据进行预测");
        window.location.reload();
    }
    fire_i = parseInt((fire_jingdu - jingdu_left) / 0.0001);
    fire_j = parseInt((weidu_up - fire_weidu) / 0.0001);
    // 初始着火点
    statusArrM1[fire_i][fire_j] = 1;
    statusArrM2[fire_i][fire_j] = 1;
    if (model === "wzf") {
        fireSpreadWZFModel();
    } else if (model === "ca") {
        fireSpreadCAModel();
    }
}

/**
 * 火灾蔓延计算
 */
function fireSpreadWZFModel() {
    // console.log("王正非模型");
    for (var i = 1; i < statusArrM1.length - 1; i++) {
        for (var j = 1; j < statusArrM1[0].length - 1; j++) {
            if (statusArrM1[i][j] === 0) {
                var p = 0;
                var p1 = 0.035;
                var p2 = 0.065;
                var p3 = 0.085;

                // 增加可燃物数据影响权重
                if (fuelData[i][j] >= 1 && fuelData[i][j] <= 3) {
                    p += p1;
                } else if (fuelData[i][j] >= 4 && fuelData[i][j] <= 6) {
                    p += p2;
                } else if (fuelData[i][j] >= 7 && fuelData[i][j] <= 9) {
                    p += p3;
                } else if (fuelData[i][j] === 0) {
                    continue;
                }

                var linked = statusArrM1[i - 1][j] + statusArrM1[i + 1][j] + statusArrM1[i][j - 1] + statusArrM1[i][j + 1];
                if (linked === 0) {
                    continue;
                }

                // 增加风向、风力的影响权重
                if (fengxiang === 1) {
                    if ((statusArrM1[i + 1][j] === 3) || (statusArrM1[i + 1][j] === 2 && fengsu > 10) || (statusArrM1[i + 1][j] === 1 && fengsu > 20)) {
                        p += p3;
                    } else if ((statusArrM1[i + 1][j] === 2 && fengsu > 0 && fengsu <= 10) || (statusArrM1[i + 1][j] === 1 && fengsu > 10 && fengsu <= 20)) {
                        p += p2;
                    } else if (statusArrM1[i + 1][j] === 1 && fengsu > 0 && fengsu <= 10) {
                        p += p1;
                    }
                    // 增加地形数据影响权重
                    if (Math.abs(slopeData[i][j] - slopeData[i + 1][j]) / 10 <= Math.tan(Math.PI / 6)) {
                        p += p1;
                    } else if (Math.abs(slopeData[i][j] - slopeData[i + 1][j]) / 10 > Math.tan(Math.PI / 6) && Math.abs(slopeData[i][j] - slopeData[i + 1][j]) / 10 <= Math.tan(Math.PI / 3)) {
                        p += p2;
                    } else if (Math.abs(slopeData[i][j] - slopeData[i + 1][j]) / 10 > Math.tan(Math.PI / 3)) {
                        p += p3;
                    }
                } else if (fengxiang === 2) {
                    if ((statusArrM1[i + 1][j - 1] === 3) || (statusArrM1[i + 1][j - 1] === 2 && fengsu > 10) || (statusArrM1[i + 1][j - 1] === 1 && fengsu > 20)) {
                        p += p3;
                    } else if ((statusArrM1[i + 1][j - 1] === 2 && fengsu > 0 && fengsu <= 10) || (statusArrM1[i + 1][j - 1] === 1 && fengsu > 10 && fengsu <= 20)) {
                        p += p2;
                    } else if (statusArrM1[i + 1][j - 1] === 1 && fengsu > 0 && fengsu <= 10) {
                        p += p1;
                    }
                    // 增加地形数据影响权重
                    if (Math.abs(slopeData[i][j] - slopeData[i + 1][j - 1]) / 10 <= Math.tan(Math.PI / 6)) {
                        p += p1;
                    } else if (Math.abs(slopeData[i][j] - slopeData[i + 1][j - 1]) / 10 > Math.tan(Math.PI / 6) && Math.abs(slopeData[i][j] - slopeData[i + 1][j - 1]) / 10 <= Math.tan(Math.PI / 3)) {
                        p += p2;
                    } else if (Math.abs(slopeData[i][j] - slopeData[i + 1][j - 1]) / 10 > Math.tan(Math.PI / 3)) {
                        p += p3;
                    }
                } else if (fengxiang === 3) {
                    if ((statusArrM1[i][j - 1] === 3) || (statusArrM1[i][j - 1] === 2 && fengsu > 10) || (statusArrM1[i][j - 1] === 1 && fengsu > 20)) {
                        p += p3;
                    } else if ((statusArrM1[i][j - 1] === 2 && fengsu > 0 && fengsu <= 10) || (statusArrM1[i][j - 1] === 1 && fengsu > 10 && fengsu <= 20)) {
                        p += p2;
                    } else if (statusArrM1[i][j - 1] === 1 && fengsu > 0 && fengsu <= 10) {
                        p += p1;
                    }
                    // 增加地形数据影响权重
                    if (Math.abs(slopeData[i][j] - slopeData[i][j - 1]) / 10 <= Math.tan(Math.PI / 6)) {
                        p += p1;
                    } else if (Math.abs(slopeData[i][j] - slopeData[i][j - 1]) / 10 > Math.tan(Math.PI / 6) && Math.abs(slopeData[i][j] - slopeData[i][j - 1]) / 10 <= Math.tan(Math.PI / 3)) {
                        p += p2;
                    } else if (Math.abs(slopeData[i][j] - slopeData[i][j - 1]) / 10 > Math.tan(Math.PI / 3)) {
                        p += p3;
                    }
                } else if (fengxiang === 4) {
                    if ((statusArrM1[i - 1][j - 1] === 3) || (statusArrM1[i - 1][j - 1] === 2 && fengsu > 10) || (statusArrM1[i - 1][j - 1] === 1 && fengsu > 20)) {
                        p += p3;
                    } else if ((statusArrM1[i - 1][j - 1] === 2 && fengsu > 0 && fengsu <= 10) || (statusArrM1[i - 1][j - 1] === 1 && fengsu > 10 && fengsu <= 20)) {
                        p += p2;
                    } else if (statusArrM1[i - 1][j - 1] === 1 && fengsu > 0 && fengsu <= 10) {
                        p += p1;
                    }
                    // 增加地形数据影响权重
                    if (Math.abs(slopeData[i][j] - slopeData[i - 1][j - 1]) / 10 <= Math.tan(Math.PI / 6)) {
                        p += p1;
                    } else if (Math.abs(slopeData[i][j] - slopeData[i - 1][j - 1]) / 10 > Math.tan(Math.PI / 6) && Math.abs(slopeData[i][j] - slopeData[i - 1][j - 1]) / 10 <= Math.tan(Math.PI / 3)) {
                        p += p2;
                    } else if (Math.abs(slopeData[i][j] - slopeData[i - 1][j - 1]) / 10 > Math.tan(Math.PI / 3)) {
                        p += p3;
                    }
                } else if (fengxiang === 5) {
                    if ((statusArrM1[i - 1][j] === 3) || (statusArrM1[i - 1][j] === 2 && fengsu > 10) || (statusArrM1[i - 1][j] === 1 && fengsu > 20)) {
                        p += p3;
                    } else if ((statusArrM1[i - 1][j] === 2 && fengsu > 0 && fengsu <= 10) || (statusArrM1[i - 1][j] === 1 && fengsu > 10 && fengsu <= 20)) {
                        p += p2;
                    } else if (statusArrM1[i - 1][j] === 1 && fengsu > 0 && fengsu <= 10) {
                        p += p1;
                    }
                    // 增加地形数据影响权重
                    if (Math.abs(slopeData[i][j] - slopeData[i - 1][j]) / 10 <= Math.tan(Math.PI / 6)) {
                        p += p1;
                    } else if (Math.abs(slopeData[i][j] - slopeData[i - 1][j]) / 10 > Math.tan(Math.PI / 6) && Math.abs(slopeData[i][j] - slopeData[i - 1][j]) / 10 <= Math.tan(Math.PI / 3)) {
                        p += p2;
                    } else if (Math.abs(slopeData[i][j] - slopeData[i - 1][j]) / 10 > Math.tan(Math.PI / 3)) {
                        p += p3;
                    }
                } else if (fengxiang === 6) {
                    if ((statusArrM1[i - 1][j + 1] === 3) || (statusArrM1[i - 1][j + 1] === 2 && fengsu > 10) || (statusArrM1[i - 1][j + 1] === 1 && fengsu > 20)) {
                        p += p3;
                    } else if ((statusArrM1[i - 1][j + 1] === 2 && fengsu > 0 && fengsu <= 10) || (statusArrM1[i - 1][j + 1] === 1 && fengsu > 10 && fengsu <= 20)) {
                        p += p2;
                    } else if (statusArrM1[i - 1][j + 1] === 1 && fengsu > 0 && fengsu <= 10) {
                        p += p1;
                    }
                    // 增加地形数据影响权重
                    if (Math.abs(slopeData[i][j] - slopeData[i - 1][j + 1]) / 10 <= Math.tan(Math.PI / 6)) {
                        p += p1;
                    } else if (Math.abs(slopeData[i][j] - slopeData[i - 1][j + 1]) / 10 > Math.tan(Math.PI / 6) && Math.abs(slopeData[i][j] - slopeData[i - 1][j + 1]) / 10 <= Math.tan(Math.PI / 3)) {
                        p += p2;
                    } else if (Math.abs(slopeData[i][j] - slopeData[i - 1][j + 1]) / 10 > Math.tan(Math.PI / 3)) {
                        p += p3;
                    }
                } else if (fengxiang === 7) {
                    if ((statusArrM1[i][j + 1] === 3) || (statusArrM1[i][j + 1] === 2 && fengsu > 10) || (statusArrM1[i][j + 1] === 1 && fengsu > 20)) {
                        p += p3;
                    } else if ((statusArrM1[i][j + 1] === 2 && fengsu > 0 && fengsu <= 10) || (statusArrM1[i][j + 1] === 1 && fengsu > 10 && fengsu <= 20)) {
                        p += p2;
                    } else if (statusArrM1[i][j + 1] === 1 && fengsu > 0 && fengsu <= 10) {
                        p += p1;
                    }
                    // 增加地形数据影响权重
                    if (Math.abs(slopeData[i][j] - slopeData[i][j + 1]) / 10 <= Math.tan(Math.PI / 6)) {
                        p += p1;
                    } else if (Math.abs(slopeData[i][j] - slopeData[i][j + 1]) / 10 > Math.tan(Math.PI / 6) && Math.abs(slopeData[i][j] - slopeData[i][j + 1]) / 10 <= Math.tan(Math.PI / 3)) {
                        p += p2;
                    } else if (Math.abs(slopeData[i][j] - slopeData[i][j + 1]) / 10 > Math.tan(Math.PI / 3)) {
                        p += p3;
                    }
                } else if (fengxiang === 8) {
                    if ((statusArrM1[i + 1][j + 1] === 3) || (statusArrM1[i + 1][j + 1] === 2 && fengsu > 10) || (statusArrM1[i + 1][j + 1] === 1 && fengsu > 20)) {
                        p += p3;
                    } else if ((statusArrM1[i + 1][j + 1] === 2 && fengsu > 0 && fengsu <= 10) || (statusArrM1[i + 1][j + 1] === 1 && fengsu > 10 && fengsu <= 20)) {
                        p += p2;
                    } else if (statusArrM1[i + 1][j + 1] === 1 && fengsu > 0 && fengsu <= 10) {
                        p += p1;
                    }
                    // 增加地形数据影响权重
                    if (Math.abs(slopeData[i][j] - slopeData[i + 1][j + 1]) / 10 <= Math.tan(Math.PI / 6)) {
                        p += p1;
                    } else if (Math.abs(slopeData[i][j] - slopeData[i + 1][j + 1]) / 10 > Math.tan(Math.PI / 6) && Math.abs(slopeData[i][j] - slopeData[i + 1][j + 1]) / 10 <= Math.tan(Math.PI / 3)) {
                        p += p2;
                    } else if (Math.abs(slopeData[i][j] - slopeData[i + 1][j + 1]) / 10 > Math.tan(Math.PI / 3)) {
                        p += p3;
                    }
                }

                // 增加温度影响权重
                if (wendu >= 0 && wendu <= 20) {
                    p += p1;
                } else if (wendu > 20 && wendu <= 40) {
                    p += p2;
                } else if (wendu > 40) {
                    p += p3;
                }

                // 增加湿度影响权重
                if (shidu < 20) {
                    p += p2;
                } else if (shidu >= 20 && shidu < 50) {
                    p += p1;
                } else if (shidu >= 50 && shidu < 75) {
                    p -= p1;
                } else if (shidu >= 75) {
                    p -= p2;
                }

                // 以一定的概率着火
                if (Math.random() <= p) {
                    statusArrM1[i][j] = 2;
                    console.log("当前预估火点为: i=" + i + ", j=" + j + ", 着火概率：" + p.toFixed(4));
                }
            } else if (statusArrM1[i][j] === 2) {
                statusArrM1[i][j] = 3;
            } else if (statusArrM1[i][j] === 3) {
                statusArrM1[i][j] = 1;
            }
        }
    }
    // paint();
}

function fireSpreadCAModel() {
    for (var i = 1; i < statusArrM2.length - 1; i++) {
        for (var j = 1; j < statusArrM2[0].length - 1; j++) {
            if (statusArrM2[i][j] === 0) {
                var p = 0;
                var p1 = 0.03;
                var p2 = 0.06;
                var p3 = 0.09;

                // 增加可燃物数据影响权重
                if (fuelData[i][j] >= 1 && fuelData[i][j] <= 3) {
                    p += p1;
                } else if (fuelData[i][j] >= 4 && fuelData[i][j] <= 6) {
                    p += p2;
                } else if (fuelData[i][j] >= 7 && fuelData[i][j] <= 9) {
                    p += p3;
                } else if (fuelData[i][j] === 0) {
                    continue;
                }

                // 增加相邻元胞的影响权重
                var linked = statusArrM2[i - 1][j] + statusArrM2[i + 1][j] + statusArrM2[i][j - 1] + statusArrM2[i][j + 1];
                if (linked >= 1 && linked <= 4) {
                    p += p1;
                } else if (linked > 4 && linked <= 8) {
                    p += p2;
                } else if (linked > 8 && linked <= 12) {
                    p += p3;
                } else if (linked === 0) {
                    continue;
                }

                // 增加风向、风力的影响权重
                if (fengxiang === 1) {
                    if ((statusArrM2[i + 1][j] === 3) || (statusArrM2[i + 1][j] === 2 && fengsu > 10) || (statusArrM2[i + 1][j] === 1 && fengsu > 20)) {
                        p += p3;
                    } else if ((statusArrM2[i + 1][j] === 2 && fengsu > 0 && fengsu <= 10) || (statusArrM2[i + 1][j] === 1 && fengsu > 10 && fengsu <= 20)) {
                        p += p2;
                    } else if (statusArrM2[i + 1][j] === 1 && fengsu > 0 && fengsu <= 10) {
                        p += p1;
                    }
                    // 增加地形数据影响权重
                    if (Math.abs(slopeData[i][j] - slopeData[i + 1][j]) / 10 <= Math.tan(Math.PI / 6)) {
                        p += p1;
                    } else if (Math.abs(slopeData[i][j] - slopeData[i + 1][j]) / 10 > Math.tan(Math.PI / 6) && Math.abs(slopeData[i][j] - slopeData[i + 1][j]) / 10 <= Math.tan(Math.PI / 3)) {
                        p += p2;
                    } else if (Math.abs(slopeData[i][j] - slopeData[i + 1][j]) / 10 > Math.tan(Math.PI / 3)) {
                        p += p3;
                    }
                } else if (fengxiang === 2) {
                    if ((statusArrM2[i + 1][j - 1] === 3) || (statusArrM2[i + 1][j - 1] === 2 && fengsu > 10) || (statusArrM2[i + 1][j - 1] === 1 && fengsu > 20)) {
                        p += p3;
                    } else if ((statusArrM2[i + 1][j - 1] === 2 && fengsu > 0 && fengsu <= 10) || (statusArrM2[i + 1][j - 1] === 1 && fengsu > 10 && fengsu <= 20)) {
                        p += p2;
                    } else if (statusArrM2[i + 1][j - 1] === 1 && fengsu > 0 && fengsu <= 10) {
                        p += p1;
                    }
                    // 增加地形数据影响权重
                    if (Math.abs(slopeData[i][j] - slopeData[i + 1][j - 1]) / 10 <= Math.tan(Math.PI / 6)) {
                        p += p1;
                    } else if (Math.abs(slopeData[i][j] - slopeData[i + 1][j - 1]) / 10 > Math.tan(Math.PI / 6) && Math.abs(slopeData[i][j] - slopeData[i + 1][j - 1]) / 10 <= Math.tan(Math.PI / 3)) {
                        p += p2;
                    } else if (Math.abs(slopeData[i][j] - slopeData[i + 1][j - 1]) / 10 > Math.tan(Math.PI / 3)) {
                        p += p3;
                    }
                } else if (fengxiang === 3) {
                    if ((statusArrM2[i][j - 1] === 3) || (statusArrM2[i][j - 1] === 2 && fengsu > 10) || (statusArrM2[i][j - 1] === 1 && fengsu > 20)) {
                        p += p3;
                    } else if ((statusArrM2[i][j - 1] === 2 && fengsu > 0 && fengsu <= 10) || (statusArrM2[i][j - 1] === 1 && fengsu > 10 && fengsu <= 20)) {
                        p += p2;
                    } else if (statusArrM2[i][j - 1] === 1 && fengsu > 0 && fengsu <= 10) {
                        p += p1;
                    }
                    // 增加地形数据影响权重
                    if (Math.abs(slopeData[i][j] - slopeData[i][j - 1]) / 10 <= Math.tan(Math.PI / 6)) {
                        p += p1;
                    } else if (Math.abs(slopeData[i][j] - slopeData[i][j - 1]) / 10 > Math.tan(Math.PI / 6) && Math.abs(slopeData[i][j] - slopeData[i][j - 1]) / 10 <= Math.tan(Math.PI / 3)) {
                        p += p2;
                    } else if (Math.abs(slopeData[i][j] - slopeData[i][j - 1]) / 10 > Math.tan(Math.PI / 3)) {
                        p += p3;
                    }
                } else if (fengxiang === 4) {
                    if ((statusArrM2[i - 1][j - 1] === 3) || (statusArrM2[i - 1][j - 1] === 2 && fengsu > 10) || (statusArrM2[i - 1][j - 1] === 1 && fengsu > 20)) {
                        p += p3;
                    } else if ((statusArrM2[i - 1][j - 1] === 2 && fengsu > 0 && fengsu <= 10) || (statusArrM2[i - 1][j - 1] === 1 && fengsu > 10 && fengsu <= 20)) {
                        p += p2;
                    } else if (statusArrM2[i - 1][j - 1] === 1 && fengsu > 0 && fengsu <= 10) {
                        p += p1;
                    }
                    // 增加地形数据影响权重
                    if (Math.abs(slopeData[i][j] - slopeData[i - 1][j - 1]) / 10 <= Math.tan(Math.PI / 6)) {
                        p += p1;
                    } else if (Math.abs(slopeData[i][j] - slopeData[i - 1][j - 1]) / 10 > Math.tan(Math.PI / 6) && Math.abs(slopeData[i][j] - slopeData[i - 1][j - 1]) / 10 <= Math.tan(Math.PI / 3)) {
                        p += p2;
                    } else if (Math.abs(slopeData[i][j] - slopeData[i - 1][j - 1]) / 10 > Math.tan(Math.PI / 3)) {
                        p += p3;
                    }
                } else if (fengxiang === 5) {
                    if ((statusArrM2[i - 1][j] === 3) || (statusArrM2[i - 1][j] === 2 && fengsu > 10) || (statusArrM2[i - 1][j] === 1 && fengsu > 20)) {
                        p += p3;
                    } else if ((statusArrM2[i - 1][j] === 2 && fengsu > 0 && fengsu <= 10) || (statusArrM2[i - 1][j] === 1 && fengsu > 10 && fengsu <= 20)) {
                        p += p2;
                    } else if (statusArrM2[i - 1][j] === 1 && fengsu > 0 && fengsu <= 10) {
                        p += p1;
                    }
                    // 增加地形数据影响权重
                    if (Math.abs(slopeData[i][j] - slopeData[i - 1][j]) / 10 <= Math.tan(Math.PI / 6)) {
                        p += p1;
                    } else if (Math.abs(slopeData[i][j] - slopeData[i - 1][j]) / 10 > Math.tan(Math.PI / 6) && Math.abs(slopeData[i][j] - slopeData[i - 1][j]) / 10 <= Math.tan(Math.PI / 3)) {
                        p += p2;
                    } else if (Math.abs(slopeData[i][j] - slopeData[i - 1][j]) / 10 > Math.tan(Math.PI / 3)) {
                        p += p3;
                    }
                } else if (fengxiang === 6) {
                    if ((statusArrM2[i - 1][j + 1] === 3) || (statusArrM2[i - 1][j + 1] === 2 && fengsu > 10) || (statusArrM2[i - 1][j + 1] === 1 && fengsu > 20)) {
                        p += p3;
                    } else if ((statusArrM2[i - 1][j + 1] === 2 && fengsu > 0 && fengsu <= 10) || (statusArrM2[i - 1][j + 1] === 1 && fengsu > 10 && fengsu <= 20)) {
                        p += p2;
                    } else if (statusArrM2[i - 1][j + 1] === 1 && fengsu > 0 && fengsu <= 10) {
                        p += p1;
                    }
                    // 增加地形数据影响权重
                    if (Math.abs(slopeData[i][j] - slopeData[i - 1][j + 1]) / 10 <= Math.tan(Math.PI / 6)) {
                        p += p1;
                    } else if (Math.abs(slopeData[i][j] - slopeData[i - 1][j + 1]) / 10 > Math.tan(Math.PI / 6) && Math.abs(slopeData[i][j] - slopeData[i - 1][j + 1]) / 10 <= Math.tan(Math.PI / 3)) {
                        p += p2;
                    } else if (Math.abs(slopeData[i][j] - slopeData[i - 1][j + 1]) / 10 > Math.tan(Math.PI / 3)) {
                        p += p3;
                    }
                } else if (fengxiang === 7) {
                    if ((statusArrM2[i][j + 1] === 3) || (statusArrM2[i][j + 1] === 2 && fengsu > 10) || (statusArrM2[i][j + 1] === 1 && fengsu > 20)) {
                        p += p3;
                    } else if ((statusArrM2[i][j + 1] === 2 && fengsu > 0 && fengsu <= 10) || (statusArrM2[i][j + 1] === 1 && fengsu > 10 && fengsu <= 20)) {
                        p += p2;
                    } else if (statusArrM2[i][j + 1] === 1 && fengsu > 0 && fengsu <= 10) {
                        p += p1;
                    }
                    // 增加地形数据影响权重
                    if (Math.abs(slopeData[i][j] - slopeData[i][j + 1]) / 10 <= Math.tan(Math.PI / 6)) {
                        p += p1;
                    } else if (Math.abs(slopeData[i][j] - slopeData[i][j + 1]) / 10 > Math.tan(Math.PI / 6) && Math.abs(slopeData[i][j] - slopeData[i][j + 1]) / 10 <= Math.tan(Math.PI / 3)) {
                        p += p2;
                    } else if (Math.abs(slopeData[i][j] - slopeData[i][j + 1]) / 10 > Math.tan(Math.PI / 3)) {
                        p += p3;
                    }
                } else if (fengxiang === 8) {
                    if ((statusArrM2[i + 1][j + 1] === 3) || (statusArrM2[i + 1][j + 1] === 2 && fengsu > 10) || (statusArrM2[i + 1][j + 1] === 1 && fengsu > 20)) {
                        p += p3;
                    } else if ((statusArrM2[i + 1][j + 1] === 2 && fengsu > 0 && fengsu <= 10) || (statusArrM2[i + 1][j + 1] === 1 && fengsu > 10 && fengsu <= 20)) {
                        p += p2;
                    } else if (statusArrM2[i + 1][j + 1] === 1 && fengsu > 0 && fengsu <= 10) {
                        p += p1;
                    }
                    // 增加地形数据影响权重
                    if (Math.abs(slopeData[i][j] - slopeData[i + 1][j + 1]) / 10 <= Math.tan(Math.PI / 6)) {
                        p += p1;
                    } else if (Math.abs(slopeData[i][j] - slopeData[i + 1][j + 1]) / 10 > Math.tan(Math.PI / 6) && Math.abs(slopeData[i][j] - slopeData[i + 1][j + 1]) / 10 <= Math.tan(Math.PI / 3)) {
                        p += p2;
                    } else if (Math.abs(slopeData[i][j] - slopeData[i + 1][j + 1]) / 10 > Math.tan(Math.PI / 3)) {
                        p += p3;
                    }
                }

                // 增加温度影响权重
                if (wendu >= 0 && wendu <= 20) {
                    p += p1;
                } else if (wendu > 20 && wendu <= 40) {
                    p += p2;
                } else if (wendu > 40) {
                    p += p3;
                }

                // 增加湿度影响权重
                if (shidu < 20) {
                    p += p2;
                } else if (shidu >= 20 && shidu < 50) {
                    p += p1;
                } else if (shidu >= 50 && shidu < 75) {
                    p -= p1;
                } else if (shidu >= 75) {
                    p -= p2;
                }

                // 以一定的概率着火
                if (Math.random() <= p) {
                    statusArrM2[i][j] = 2;
                    console.log("当前预估火点为: i=" + i + ", j=" + j + ", 着火概率：" + p.toFixed(4));
                }
            } else if (statusArrM2[i][j] === 2) {
                statusArrM2[i][j] = 3;
            } else if (statusArrM2[i][j] === 3) {
                statusArrM2[i][j] = 1;
            }
        }
    }
    // paint();
}

function paint(statusArr) {
    var flag;
    var points = new Set();
    for (var i = 1; i <= statusArr.length - 2; i++) {
        for (var j = 1; j <= statusArr[0].length - 2; j++) {
            if (statusArr[i][j] > 0) {
                var jingdu_real = jingdu_left + 0.0001 * i;
                var weidu_real = weidu_up - 0.0001 * j;
                var point = new Point();
                point.x = jingdu_real;
                point.y = weidu_real;
                points.add(point);
            }
        }
    }

    console.log("=====points.size====" + points.size);
    var shellPoint = convexHull(points);
    console.log("======shellPoint.size=====" + shellPoint.size);


    for (var sp of shellPoint) {
        var point = new BMap.Point(sp.x, sp.y);
        var myIcon;
        if (model === "wzf") {
            myIcon = new BMap.Icon("img/yellow_4.bmp", new BMap.Size(5, 5));
        } else if (model === "ca") {
            myIcon = new BMap.Icon("img/red_4.bmp", new BMap.Size(5, 5));
        }
        var marker = new BMap.Marker(point, {icon: myIcon});
        map.addOverlay(marker);
    }
    var polygonPoints = [];
    for (var sp of shellPoint) {
        var point = new BMap.Point(sp.x, sp.y);
        polygonPoints.push(point);
    }
    var polygon;
    if (model === "wzf") {
        polygon = new BMap.Polygon(polygonPoints, {strokeColor: "yellow", strokeWeight: 2, strokeOpacity: 0.5});  //创建多边形
    } else if (model === "ca") {
        polygon = new BMap.Polygon(polygonPoints, {strokeColor: "red", strokeWeight: 2, strokeOpacity: 0.5});  //创建多边形
    }
    map.addOverlay(polygon);   //增加多边形

    // // 百度地图语法
    // var points = new BMap.Point(jingdu_real, weidu_real);
    // // 传递，flag状态，和真实的经纬度坐标，开始作图
    // addMarker(points, flag);
    transPoints(shellPoint);
}

function transPoints(shellPoint) {
    var preStr = model + "_" + time + "_";
    var len = shellPoint.size;
    var myInput = document.createElement("input");
    myInput.name = preStr + "setSize";
    myInput.value = len;
    myInput.hidden = true;
    document.getElementById("form_1").appendChild(myInput);

    var index = 0;
    for (var point of shellPoint) {
        var myInput = document.createElement("input");
        myInput.name = preStr + "set" + index;
        myInput.value = point.x + "_" + point.y;
        myInput.hidden = true;
        index = index + 1;
        document.getElementById("form_1").appendChild(myInput);
    }
}

var needTransPoints = new Set();

document.getElementById("b2").onclick = function () {
    itera = 1;
    realTimeClData = setInterval(realTimeCl, 1000);

    function realTimeCl() {
        getValue();
        console.log("==========当前周期：" + itera + " ==========");
        if (itera === 10) {
            time = 30 * 60;
            if (model === "wzf") {
                paint(statusArrM1);
                document.getElementById("fireSpeedt1m1").value = getFireSpeed(statusArrM1);
                document.getElementById("fireAreat1m1").value = getFireArea(statusArrM1);
                document.getElementById("fireLengtht1m1").value = getFireLength(statusArrM1);

            } else if (model === "ca") {
                paint(statusArrM2);
                document.getElementById("fireSpeedt1m2").value = getFireSpeed(statusArrM2);
                document.getElementById("fireAreat1m2").value = getFireArea(statusArrM2);
                document.getElementById("fireLengtht1m2").value = getFireLength(statusArrM2);
            }
        } else if (itera === 20) {
            time = 60 * 60;
            if (model === "wzf") {
                paint(statusArrM1);
                document.getElementById("fireSpeedt2m1").value = getFireSpeed(statusArrM1);
                document.getElementById("fireAreat2m1").value = getFireArea(statusArrM1);
                document.getElementById("fireLengtht2m1").value = getFireLength(statusArrM1);
            } else if (model === "ca") {
                paint(statusArrM2)
                document.getElementById("fireSpeedt2m2").value = getFireSpeed(statusArrM2);
                document.getElementById("fireAreat2m2").value = getFireArea(statusArrM2);
                document.getElementById("fireLengtht2m2").value = getFireLength(statusArrM2);
            }
        } else if (itera === 30) {
            time = 90 * 60;
            if (model === "wzf") {
                paint(statusArrM1);
                document.getElementById("fireSpeedt3m1").value = getFireSpeed(statusArrM1);
                document.getElementById("fireAreat3m1").value = getFireArea(statusArrM1);
                document.getElementById("fireLengtht3m1").value = getFireLength(statusArrM1);
            } else if (model === "ca") {
                paint(statusArrM2);
                document.getElementById("fireSpeedt3m2").value = getFireSpeed(statusArrM2);
                document.getElementById("fireAreat3m2").value = getFireArea(statusArrM2);
                document.getElementById("fireLengtht3m2").value = getFireLength(statusArrM2);
            }
        } else if (itera >= 40) {
            time = 120 * 60;
            if (model === "wzf") {
                paint(statusArrM1);
                document.getElementById("fireSpeedt4m1").value = getFireSpeed(statusArrM1);
                document.getElementById("fireAreat4m1").value = getFireArea(statusArrM1);
                document.getElementById("fireLengtht4m1").value = getFireLength(statusArrM1);
            } else if (model === "ca") {
                paint(statusArrM2);
                document.getElementById("fireSpeedt4m2").value = getFireSpeed(statusArrM2);
                document.getElementById("fireAreat4m2").value = getFireArea(statusArrM2);
                document.getElementById("fireLengtht4m2").value = getFireLength(statusArrM2);
            }
            clearInterval(realTimeClData);
            // alert("预测结束");
        }
        itera = itera + 1;
    }
}