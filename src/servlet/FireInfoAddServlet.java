package servlet;

import bean.FireInfo;
import dao.FireInfoDAO;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

/**
 * @author: afuya
 * @program: ffsimulation
 * @date: 2021/8/22 10:12 下午
 */
public class FireInfoAddServlet extends HttpServlet {
    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        FireInfo fireInfo = new FireInfo();
        System.out.println("========FireInfoAddServlet=======");
        fireInfo.setFire_jingdu(Double.parseDouble(request.getParameter("fire_jingdu")));
        System.out.println(fireInfo.getFire_jingdu());
        fireInfo.setFire_weidu(Double.parseDouble(request.getParameter("fire_weidu")));
        System.out.println(fireInfo.getFire_weidu());
        fireInfo.setFengxiang(Integer.parseInt(request.getParameter("fengxiang")));
        System.out.println(fireInfo.getFengxiang());
        fireInfo.setFengsu(Double.parseDouble(request.getParameter("fengsu")));
        System.out.println(fireInfo.getFengsu());
        fireInfo.setWendu(Double.parseDouble(request.getParameter("wendu")));
        System.out.println(fireInfo.getWendu());
        fireInfo.setShidu(Double.parseDouble(request.getParameter("shidu")));
        System.out.println(fireInfo.getShidu());
        // 0.5h
        fireInfo.setWzfT1Speed(Double.parseDouble(request.getParameter("wzfT1Speed")));
        System.out.println(fireInfo.getWzfT1Speed());
        fireInfo.setCaT1Speed(Double.parseDouble(request.getParameter("caT1Speed")));
        System.out.println(fireInfo.getCaT1Speed());
        fireInfo.setWzfT1Area(Double.parseDouble(request.getParameter("wzfT1Area")));
        System.out.println(fireInfo.getWzfT1Area());
        fireInfo.setCaT1Area(Double.parseDouble(request.getParameter("caT1Area")));
        System.out.println(fireInfo.getCaT1Area());
        fireInfo.setWzfT1Length(Double.parseDouble(request.getParameter("wzfT1Length")));
        System.out.println(fireInfo.getWzfT1Length());
        fireInfo.setCaT1Length(Double.parseDouble(request.getParameter("caT1Length")));
        System.out.println(fireInfo.getCaT1Length());
        // 1h
        fireInfo.setWzfT2Speed(Double.parseDouble(request.getParameter("wzfT2Speed")));
        fireInfo.setCaT2Speed(Double.parseDouble(request.getParameter("caT2Speed")));
        fireInfo.setWzfT2Area(Double.parseDouble(request.getParameter("wzfT2Area")));
        fireInfo.setCaT2Area(Double.parseDouble(request.getParameter("caT2Area")));
        fireInfo.setWzfT2Length(Double.parseDouble(request.getParameter("wzfT2Length")));
        fireInfo.setCaT2Length(Double.parseDouble(request.getParameter("caT2Length")));
        // 1.5h
        fireInfo.setWzfT3Speed(Double.parseDouble(request.getParameter("wzfT3Speed")));
        fireInfo.setCaT3Speed(Double.parseDouble(request.getParameter("caT3Speed")));
        fireInfo.setWzfT3Area(Double.parseDouble(request.getParameter("wzfT3Area")));
        fireInfo.setCaT3Area(Double.parseDouble(request.getParameter("caT3Area")));
        fireInfo.setWzfT3Length(Double.parseDouble(request.getParameter("wzfT3Length")));
        fireInfo.setCaT3Length(Double.parseDouble(request.getParameter("caT3Length")));
        // 2h
        fireInfo.setWzfT4Speed(Double.parseDouble(request.getParameter("wzfT4Speed")));
        fireInfo.setCaT4Speed(Double.parseDouble(request.getParameter("caT4Speed")));
        fireInfo.setWzfT4Area(Double.parseDouble(request.getParameter("wzfT4Area")));
        fireInfo.setCaT4Area(Double.parseDouble(request.getParameter("caT4Area")));
        fireInfo.setWzfT4Length(Double.parseDouble(request.getParameter("wzfT4Length")));
        fireInfo.setCaT4Length(Double.parseDouble(request.getParameter("caT4Length")));

        System.out.println("===========火点经纬度信息==============");
        System.out.println("===========王正非模型0.5h火灾边界的点信息==============");
        int wzf_1800_setSize = Integer.parseInt(request.getParameter("wzf_1800_setSize"));
        Set<double[]> wzf_1800_points = new HashSet<>();
        for (int i = 0; i < wzf_1800_setSize; i++) {
            String point_x_y = request.getParameter("wzf_1800_set" + i);
            double x = Double.parseDouble(point_x_y.split("_")[0]);
            double y = Double.parseDouble(point_x_y.split("_")[1]);
            wzf_1800_points.add(new double[]{x, y});
        }
        StringBuilder sb1 = new StringBuilder();
        for (double x_y[] : wzf_1800_points) {
            sb1.append("[");
            sb1.append(x_y[0]);
            sb1.append(", ");
            sb1.append(x_y[1]);
            sb1.append("], ");
        }
        System.out.println(sb1.toString());

        System.out.println("===========王正非模型1h火灾边界的点信息==============");
        int wzf_3600_setSize = Integer.parseInt(request.getParameter("wzf_3600_setSize"));
        Set<double[]> wzf_3600_points = new HashSet<>();
        for (int i = 0; i < wzf_3600_setSize; i++) {
            String point_x_y = request.getParameter("wzf_3600_set" + i);
            double x = Double.parseDouble(point_x_y.split("_")[0]);
            double y = Double.parseDouble(point_x_y.split("_")[1]);
            wzf_3600_points.add(new double[]{x, y});
        }
        StringBuilder sb2 = new StringBuilder();
        for (double x_y[] : wzf_3600_points) {
            sb2.append("[");
            sb2.append(x_y[0]);
            sb2.append(", ");
            sb2.append(x_y[1]);
            sb2.append("], ");
        }
        System.out.println(sb2.toString());

        System.out.println("===========王正非模型1.5h火灾边界的点信息==============");
        int wzf_5400_setSize = Integer.parseInt(request.getParameter("wzf_5400_setSize"));
        Set<double[]> wzf_5400_points = new HashSet<>();
        for (int i = 0; i < wzf_5400_setSize; i++) {
            String point_x_y = request.getParameter("wzf_5400_set" + i);
            double x = Double.parseDouble(point_x_y.split("_")[0]);
            double y = Double.parseDouble(point_x_y.split("_")[1]);
            wzf_5400_points.add(new double[]{x, y});
        }
        StringBuilder sb3 = new StringBuilder();
        for (double x_y[] : wzf_5400_points) {
            sb3.append("[");
            sb3.append(x_y[0]);
            sb3.append(", ");
            sb3.append(x_y[1]);
            sb3.append("], ");
        }
        System.out.println(sb3.toString());

        System.out.println("===========王正非模型2h火灾边界的点信息==============");
        int wzf_7200_setSize = Integer.parseInt(request.getParameter("wzf_7200_setSize"));
        Set<double[]> wzf_7200_points = new HashSet<>();
        for (int i = 0; i < wzf_7200_setSize; i++) {
            String point_x_y = request.getParameter("wzf_7200_set" + i);
            double x = Double.parseDouble(point_x_y.split("_")[0]);
            double y = Double.parseDouble(point_x_y.split("_")[1]);
            wzf_7200_points.add(new double[]{x, y});
        }
        StringBuilder sb4 = new StringBuilder();
        for (double x_y[] : wzf_7200_points) {
            sb4.append("[");
            sb4.append(x_y[0]);
            sb4.append(", ");
            sb4.append(x_y[1]);
            sb4.append("], ");
        }
        System.out.println(sb4.toString());


        System.out.println("===========二维元胞自动机模型0.5h火灾边界的点信息==============");
        int ca_1800_setSize = Integer.parseInt(request.getParameter("ca_1800_setSize"));
        Set<double[]> ca_1800_points = new HashSet<>();
        for (int i = 0; i < ca_1800_setSize; i++) {
            String point_x_y = request.getParameter("ca_1800_set" + i);
            double x = Double.parseDouble(point_x_y.split("_")[0]);
            double y = Double.parseDouble(point_x_y.split("_")[1]);
            ca_1800_points.add(new double[]{x, y});
        }
        StringBuilder sb5 = new StringBuilder();
        for (double x_y[] : ca_1800_points) {
            sb5.append("[");
            sb5.append(x_y[0]);
            sb5.append(", ");
            sb5.append(x_y[1]);
            sb5.append("], ");
        }
        System.out.println(sb5.toString());

        System.out.println("===========二维元胞自动机模型1h火灾边界的点信息==============");
        int ca_3600_setSize = Integer.parseInt(request.getParameter("ca_3600_setSize"));
        Set<double[]> ca_3600_points = new HashSet<>();
        for (int i = 0; i < ca_3600_setSize; i++) {
            String point_x_y = request.getParameter("ca_3600_set" + i);
            double x = Double.parseDouble(point_x_y.split("_")[0]);
            double y = Double.parseDouble(point_x_y.split("_")[1]);
            ca_3600_points.add(new double[]{x, y});
        }
        StringBuilder sb6 = new StringBuilder();
        for (double x_y[] : ca_3600_points) {
            sb6.append("[");
            sb6.append(x_y[0]);
            sb6.append(", ");
            sb6.append(x_y[1]);
            sb6.append("], ");
        }
        System.out.println(sb6.toString());

        System.out.println("===========二维元胞自动机模型1.5h火灾边界的点信息==============");
        int ca_5400_setSize = Integer.parseInt(request.getParameter("ca_5400_setSize"));
        Set<double[]> ca_5400_points = new HashSet<>();
        for (int i = 0; i < ca_5400_setSize; i++) {
            String point_x_y = request.getParameter("ca_5400_set" + i);
            double x = Double.parseDouble(point_x_y.split("_")[0]);
            double y = Double.parseDouble(point_x_y.split("_")[1]);
            ca_5400_points.add(new double[]{x, y});
        }
        StringBuilder sb7 = new StringBuilder();
        for (double x_y[] : ca_5400_points) {
            sb7.append("[");
            sb7.append(x_y[0]);
            sb7.append(", ");
            sb7.append(x_y[1]);
            sb7.append("], ");
        }
        System.out.println(sb7.toString());

        System.out.println("===========二维元胞自动机模型2h火灾边界的点信息==============");
        int ca_7200_setSize = Integer.parseInt(request.getParameter("ca_7200_setSize"));
        Set<double[]> ca_7200_points = new HashSet<>();
        for (int i = 0; i < ca_7200_setSize; i++) {
            String point_x_y = request.getParameter("ca_7200_set" + i);
            double x = Double.parseDouble(point_x_y.split("_")[0]);
            double y = Double.parseDouble(point_x_y.split("_")[1]);
            ca_7200_points.add(new double[]{x, y});
        }
        StringBuilder sb8 = new StringBuilder();
        for (double x_y[] : ca_7200_points) {
            sb8.append("[");
            sb8.append(x_y[0]);
            sb8.append(", ");
            sb8.append(x_y[1]);
            sb8.append("], ");
        }
        System.out.println(sb8.toString());
        System.out.println("==================================================");

        new FireInfoDAO().add(fireInfo);
        response.sendRedirect("listFireInfo");
    }
}
