<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" language="java" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no"/>
    <style>
        body, html {
            width: 100%;
            height: 100%;
            margin: 0;
            font-family: "微软雅黑";
        }

        #allmap {
            /*height: 600px;*/
            height: 80%;
            width: 100%;
        }

        #r-result {
            width: 100%;
            margin-top: 5px;
        }
    </style>
    <script type="text/javascript" src="//api.map.baidu.com/api?v=2.0&ak=ecGBhntDu7ubzr96GfhBll60oZXvq0MP"></script>
<%--    <script type="text/javascript" src="//api.map.baidu.com/api?v=3.0&ak=9AG1q980XQ9OUtYFO5hlXBII8ktPxmjV"></script>--%>
    <script type="text/javascript" src="js/calcPoint.js"></script>
    <title>平江县芦头林场卫星地图</title>
</head>
<body>
<div id='allmap'></div>

<!--信息显示div-->
<div id="r-result">

    <script>
        console.log("===========map.jsp==============");
        // 读取文件中的可燃物数据
        var fuelData = [];
        var i = 0, j = 0;
        <c:forEach items="${fuelData}" var="fuelData_1" >
        fuelData[i] = [];
        <c:forEach items="${fuelData_1}" var="fuelData_2" >
        fuelData[i][j] = ${fuelData_2};
        j = j + 1;
        </c:forEach>
        i = i + 1;
        j = 0;
        </c:forEach>
        console.log("fuelData: ");
        console.log(fuelData.length);
        console.log(fuelData[0].length);

        // 读取文件中的高程数据
        var slopeData = [];
        var i = 0, j = 0;
        <c:forEach items="${slopeData}" var="slopeData_1" >
        slopeData[i] = [];
        <c:forEach items="${slopeData_1}" var="slopeData_2" >
        slopeData[i][j] = ${slopeData_2};
        j = j + 1;
        </c:forEach>
        i = i + 1;
        j = 0;
        </c:forEach>
        console.log("slopeData: ");
        console.log(slopeData.length);
        console.log(slopeData[0].length);
    </script>
    <form id="form_1" action="addFireInfo" method="post">
        <!--左右居中 上下居中-->
        <table align="center" valign="center" width="50%">
            <tr>
                <td align="center" colspan="4">填写着火点位置信息</td>
            </tr>

            <tr>
                <td align="right"><font color="#FF0000">*</font>经度:</td>
                <td><input id="lng_value" name="fire_jingdu" type="text" size="30" value="113.911748"/></td>

                <td align="right"><font color="#FF0000">*</font>纬度:</td>
                <td><input id="lat_value" name="fire_weidu" type="text" size="30" value="28.616119"/></td>
            </tr>

            <tr>
                <td align="center" colspan="4">填写气象信息</td>
            </tr>

            <tr>
                <td align="right"><font color="#FF0000">*</font>风向(1-8):</td>
                <td><input id="fengxiang_value" name="fengxiang" type="text" size="30" value=""/></td>

                <td align="right"><font color="#FF0000">*</font>风速(m/s):</td>
                <td><input id="fengsu_value" name="fengsu" type="text" size="30" value=""/></td>

            </tr>
            <tr>
                <td align="right"><font color="#FF0000">*</font>温度(摄氏度):</td>
                <td><input id="wendu_value" name="wendu" type="text" size="30" value=""/></td>

                <td align="right"><font color="#FF0000">*</font>湿度(%):</td>
                <td><input id="shidu_value" name="shidu" type="text" size="30" value=""/></td>
            </tr>
            <script>
                function randomNum(minNum, maxNum) {
                    switch (arguments.length) {
                        case 1:
                            return parseInt(Math.random() * minNum + 1, 10);
                            break;
                        case 2:
                            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
                            break;
                        default:
                            return 0;
                            break;
                    }
                }
                document.getElementById("fengxiang_value").value = randomNum(1, 8);
                document.getElementById("fengsu_value").value = randomNum(1, 50);
                document.getElementById("wendu_value").value = randomNum(1, 40);
                document.getElementById("shidu_value").value = randomNum(1, 100);
            </script>

            <tr>
                <td align="center" colspan="4">选择蔓延模型</td>
            </tr>

            <tr>
                <td align="center" colspan="2"><input type="radio" name="simulationModel" checked="checked"
                                                      value="王正非模型"
                                                      id="WZFModel">王正非模型
                </td>
                <td align="center" colspan="2"><input type="radio" name="simulationModel" value="二维元胞自动机模型"
                                                      id="CAModel">二维元胞自动机模型
                </td>
            </tr>

            <tr>
                <table align="center" valign="center">
                    <tr>
                        <td align="center"><input id="b2" type="button" onclick="" value="开始仿真"/></td>
                        <td><input id="b5" type="submit" value="保存结果"></td>
                        <td align="center"><input id="b3" type="button" onclick="window.location.reload()"
                                                  value="重新仿真"/>
                        </td>
                        <%--                    <td align="center"><input id="b4" type="button" onclick="" value="仿真结果"/></td>--%>
                    </tr>
                </table>
            </tr>

            <tr>
                <table align="center" valign="center">
                    <tr>
                        <td align="right"></td>
                        <td align="right" colspan="2" valign="center"><font color="#FF0000">*</font>蔓延速度(m/s):</td>
                        <td align="right" colspan="2"><font color="#FF0000">*</font>蔓延面积(m^2):</td>
                        <td align="right" colspan="2"><font color="#FF0000">*</font>蔓延周长(m):</td>
                    </tr>
                    <tr>
                        <td align="right"></td>
                        <td align="right">王正非模型</td>
                        <td align="right">二维元胞自动机模型</td>
                        <td align="right">王正非模型</td>
                        <td align="right">二维元胞自动机模型</td>
                        <td align="right">王正非模型</td>
                        <td align="right">二维元胞自动机模型</td>
                    </tr>
                    <tr>
                        <td align="right">0.5小时</td>
                        <td align="center"><input id="fireSpeedt1m1" name="wzfT1Speed" type="text" value=""/></td>
                        <td align="center"><input id="fireSpeedt1m2" name="caT1Speed" type="text" value=""/></td>
                        <td align="center"><input id="fireAreat1m1" name="wzfT1Area" type="text" value=""/></td>
                        <td align="center"><input id="fireAreat1m2" name="caT1Area" type="text" value=""/></td>
                        <td align="center"><input id="fireLengtht1m1" name="wzfT1Length" type="text" value=""/></td>
                        <td align="center"><input id="fireLengtht1m2" name="caT1Length" type="text" value=""/></td>
                    </tr>

                    <tr>
                        <td align="right">1小时</td>
                        <td align="center"><input id="fireSpeedt2m1" name="wzfT2Speed" type="text" value=""/></td>
                        <td align="center"><input id="fireSpeedt2m2" name="caT2Speed" type="text" value=""/></td>
                        <td align="center"><input id="fireAreat2m1" name="wzfT2Area" type="text" value=""/></td>
                        <td align="center"><input id="fireAreat2m2" name="caT2Area" type="text" value=""/></td>
                        <td align="center"><input id="fireLengtht2m1" name="wzfT2Length" type="text" value=""/></td>
                        <td align="center"><input id="fireLengtht2m2" name="caT2Length" type="text" value=""/></td>
                    </tr>

                    <tr>
                        <td align="right">1.5小时</td>
                        <td align="center"><input id="fireSpeedt3m1" name="wzfT3Speed" type="text" value=""/></td>
                        <td align="center"><input id="fireSpeedt3m2" name="caT3Speed" type="text" value=""/></td>
                        <td align="center"><input id="fireAreat3m1" name="wzfT3Area" type="text" value=""/></td>
                        <td align="center"><input id="fireAreat3m2" name="caT3Area" type="text" value=""/></td>
                        <td align="center"><input id="fireLengtht3m1" name="wzfT3Length" type="text" value=""/></td>
                        <td align="center"><input id="fireLengtht3m2" name="caT3Length" type="text" value=""/></td>
                    </tr>

                    <tr>
                        <td align="right">2小时</td>
                        <td align="center"><input id="fireSpeedt4m1" name="wzfT4Speed" type="text" value=""/></td>
                        <td align="center"><input id="fireSpeedt4m2" name="caT4Speed" type="text" value=""/></td>
                        <td align="center"><input id="fireAreat4m1" name="wzfT4Area" type="text" value=""/></td>
                        <td align="center"><input id="fireAreat4m2" name="caT4Area" type="text" value=""/></td>
                        <td align="center"><input id="fireLengtht4m1" name="wzfT4Length" type="text" value=""/></td>
                        <td align="center"><input id="fireLengtht4m2" name="caT4Length" type="text" value=""/></td>
                    </tr>

                </table>
            </tr>
        </table>
    </form>
</div>

</body>
<script>
    document.getElementById("b4").onclick = function () {
        var fireSpeed = getFireSpeed(statusArr);
        var fireLength = getFireLength(statusArr);
        var fireArea = getFireArea(statusArr);
        console.log(fireSpeed);
        console.log(fireLength);
        console.log(fireArea);
        document.getElementById("fireSpeed").value = fireSpeed;
        document.getElementById("fireLength").value = fireLength;
        document.getElementById("fireArea").value = fireArea;
    }

    function getFireSpeed(status) {
        var aveLength = Math.sqrt(getFireArea(status) / Math.PI);
        console.log(aveLength);
        console.log(time);
        var speed = aveLength / time;
        return speed.toFixed(6);
    }

    function getFireLength(status) {
        var num = 0;
        for (var i = 0; i < status.length; i++) {
            for (var j = 0; j < status[0].length; j++) {
                // 计算一个模块的四条边有没有与燃烧模块接壤
                if (status[i][j] !== 0) {
                    // 上
                    if ((i - 1 >= 0 && status[i - 1][j] === 0) || i === 0) {
                        num = num + 1;
                    }
                    // 下
                    if ((i + 1 < status.length && status[i + 1][j] === 0) || i === status.length - 1) {
                        num = num + 1;
                    }
                    // 左
                    if ((j - 1 >= 0 && status[i][j - 1] === 0) || j === 0) {
                        num = num + 1;
                    }
                    // 右
                    if ((j + 1 < status[0].length && status[i][j + 1] === 0) || j === status[0].length - 1) {
                        num = num + 1;
                    }
                }
            }
        }
        return num * 10;
    }

    function getFireArea(status) {
        var num = 0;
        for (var i = 0; i < status.length; i++) {
            for (var j = 0; j < status[0].length; j++) {
                if (status[i][j] !== 0)
                    num = num + 1;
            }
        }
        return num * 100;
    }
</script>
<script type="text/javascript" src="js/calcCore.js"></script>
</html>