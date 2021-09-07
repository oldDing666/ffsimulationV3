// 定义一个点的类
function Point() {
    this.x = 0.0;
    this.y = 0.0;
}

function convexHull(points) {
    var shellPoint = new Set();
    var minPoint = null;
    var nowBearing = 0.0;
    var nextBearing = 0.0;
    var preBearing = 0.0;
    var nextLength = 0.0;
    var nowPoint = null;
    var nextPoint = null;

    if (points.size > 0) {
        //元素小于3个时，必是凸包直接返回
        if (points.size <= 3) {
            return points;
        }

        //求最左下元素
        for (var point of points) {
            if (minPoint == null) {
                minPoint = point;
                continue;
            }
            if (minPoint.x > point.x) {
                minPoint = point;
            } else if (minPoint.x == point.x) {
                if (minPoint.y > point.y) {
                    minPoint = point;
                }
            }
        }

        //最左下元素定时凸包元素，加入集合
        shellPoint.add(minPoint);
        nowPoint = minPoint;
        //之前凸包元素指向最近凸包元素的角度（相对与y轴顺时针）
        preBearing = 0;
        while (true) {
            nextBearing = 360;
            nextLength = Number.MAX_VALUE;
            for (var point of points) {
                if (point == nowPoint) {
                    continue;
                }
                nowBearing = calculateBearingToPoint(preBearing, nowPoint.x, nowPoint.y, point.x, point.y);
                if (nextBearing === nowBearing) {
                    if (nextLength < (Math.pow(point.x - nowPoint.x, 2) + Math.pow(point.y - nowPoint.y, 2))) {
                        nextLength = Math.pow(point.x - nowPoint.x, 2) + Math.pow(point.y - nowPoint.y, 2);
                        nextPoint = point;
                    }
                } else if (nextBearing > nowBearing) {
                    nextLength = Math.pow(point.x - nowPoint.x, 2) + Math.pow(point.y - nowPoint.y, 2);
                    nextBearing = nowBearing;
                    nextPoint = point;
                }
            }
            if (minPoint == nextPoint) {
                break;
            }
            nowPoint = nextPoint;
            preBearing = preBearing + nextBearing;
            shellPoint.add(nextPoint);
        }
    }
    return shellPoint;
}

function calculateBearingToPoint(currentBearing, currentX, currentY, targetX, targetY) {
    var angle = 0.0;
    var x = targetX - currentX;
    var y = targetY - currentY;
    angle = Math.atan2(x, y) * 180.0 / Math.PI - currentBearing;
    return angle < 0 ? angle + 360 : angle;
}