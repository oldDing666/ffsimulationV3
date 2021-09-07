<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false" language="java"
         import="java.util.*" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<table align='center' border='1' cellspacing='0'>
    <tr>
        <td>id</td>
        <td>火点经度</td>
        <td>火点纬度</td>
        <td>风向</td>
        <td>风速</td>
        <td>温度</td>
        <td>湿度</td>
        <td>王正非模型0.5小时后蔓延速度(m/s)</td>
        <td>二维元胞自动机模型0.5小时后蔓延速度(m/s)</td>
        <td>王正非模型0.5小时后蔓延面积(m^2)</td>
        <td>二维元胞自动机模型0.5小时后蔓延面积(m^2)</td>
        <td>王正非模型0.5小时后蔓延周长(m)</td>
        <td>二维元胞自动机模型0.5小时后蔓延周长(m)</td>

        <td>王正非模型1小时后蔓延速度(m/s)</td>
        <td>二维元胞自动机模型1小时后蔓延速度(m/s)</td>
        <td>王正非模型1小时后蔓延面积(m^2)</td>
        <td>二维元胞自动机模型1小时后蔓延面积(m^2)</td>
        <td>王正非模型1小时后蔓延周长(m)</td>
        <td>二维元胞自动机模型1小时后蔓延周长(m)</td>

        <td>王正非模型1.5小时后蔓延速度(m/s)</td>
        <td>二维元胞自动机模型1.5小时后蔓延速度(m/s)</td>
        <td>王正非模型1.5小时后蔓延面积(m^2)</td>
        <td>二维元胞自动机模型1.5小时后蔓延面积(m^2)</td>
        <td>王正非模型1.5小时后蔓延周长(m)</td>
        <td>二维元胞自动机模型1.5小时后蔓延周长(m)</td>

        <td>王正非模型2小时后蔓延速度(m/s)</td>
        <td>二维元胞自动机模型2小时后蔓延速度(m/s)</td>
        <td>王正非模型2小时后蔓延面积(m^2)</td>
        <td>二维元胞自动机模型2小时后蔓延面积(m^2)</td>
        <td>王正非模型2小时后蔓延周长(m)</td>
        <td>二维元胞自动机模型2小时后蔓延周长(m)</td>
    </tr>
    <c:forEach items="${fireInfos}" var="fireInfo" varStatus="st">
        <tr>
            <td>${fireInfo.id}</td>
            <td>${fireInfo.fire_jingdu}</td>
            <td>${fireInfo.fire_weidu}</td>
            <td>${fireInfo.fengxiang}</td>
            <td>${fireInfo.fengsu}</td>
            <td>${fireInfo.wendu}</td>
            <td>${fireInfo.shidu}</td>

            <td>${fireInfo.wzfT1Speed}</td>
            <td>${fireInfo.caT1Speed}</td>
            <td>${fireInfo.wzfT1Area}</td>
            <td>${fireInfo.caT1Area}</td>
            <td>${fireInfo.wzfT1Length}</td>
            <td>${fireInfo.caT1Length}</td>

            <td>${fireInfo.wzfT2Speed}</td>
            <td>${fireInfo.caT2Speed}</td>
            <td>${fireInfo.wzfT2Area}</td>
            <td>${fireInfo.caT2Area}</td>
            <td>${fireInfo.wzfT2Length}</td>
            <td>${fireInfo.caT2Length}</td>

            <td>${fireInfo.wzfT3Speed}</td>
            <td>${fireInfo.caT3Speed}</td>
            <td>${fireInfo.wzfT3Area}</td>
            <td>${fireInfo.caT3Area}</td>
            <td>${fireInfo.wzfT3Length}</td>
            <td>${fireInfo.caT3Length}</td>

            <td>${fireInfo.wzfT4Speed}</td>
            <td>${fireInfo.caT4Speed}</td>
            <td>${fireInfo.wzfT4Area}</td>
            <td>${fireInfo.caT4Area}</td>
            <td>${fireInfo.wzfT4Length}</td>
            <td>${fireInfo.caT4Length}</td>

        </tr>
    </c:forEach>
</table>