package dao;

import bean.FireInfo;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

/**
 * @author: afuya
 * @program: ffsimulation
 * @date: 2021/8/22 9:42 下午
 */
public class FireInfoDAO {
    // 构造方法
    public FireInfoDAO() {
        try {
            Class.forName("com.mysql.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    // 获取数据库连接，JDBC的标准写法
    public Connection getConnection() throws SQLException {
        return DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/ffsimulation?characterEncoding=UTF-8", "root",
                "admin");
    }

    // 获取所有的记录，在一页中显示
    public List<FireInfo> list() {
        return list(0, Short.MAX_VALUE);
    }

    // 增加一条记录
    public void add(FireInfo fireInfo) {
        String sql = "insert into fireInfo values(null,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        try (Connection c = getConnection(); PreparedStatement ps = c.prepareStatement(sql);) {
//            System.out.println("=========FireInfoDAO=========");
            ps.setDouble(1, fireInfo.getFire_jingdu());
//            System.out.println(fireInfo.getFire_jingdu());
            ps.setDouble(2, fireInfo.getFire_weidu());
//            System.out.println(fireInfo.getFire_weidu());
            ps.setInt(3, fireInfo.getFengxiang());
//            System.out.println(fireInfo.getFengxiang());
            ps.setDouble(4, fireInfo.getFengsu());
//            System.out.println(fireInfo.getFengsu());
            ps.setDouble(5, fireInfo.getWendu());
//            System.out.println(fireInfo.getWendu());
            ps.setDouble(6, fireInfo.getShidu());
//            System.out.println(fireInfo.getShidu());
            // 0.5h
            ps.setDouble(7, fireInfo.getWzfT1Speed());
            ps.setDouble(8, fireInfo.getCaT1Speed());
            ps.setDouble(9, fireInfo.getWzfT1Area());
            ps.setDouble(10, fireInfo.getCaT1Area());
            ps.setDouble(11, fireInfo.getWzfT1Length());
            ps.setDouble(12, fireInfo.getCaT1Length());
            // 1h
            ps.setDouble(13, fireInfo.getWzfT2Speed());
            ps.setDouble(14, fireInfo.getCaT2Speed());
            ps.setDouble(15, fireInfo.getWzfT2Area());
            ps.setDouble(16, fireInfo.getCaT2Area());
            ps.setDouble(17, fireInfo.getWzfT2Length());
            ps.setDouble(18, fireInfo.getCaT2Length());
            // 0.5h
            ps.setDouble(19, fireInfo.getWzfT3Speed());
            ps.setDouble(20, fireInfo.getCaT3Speed());
            ps.setDouble(21, fireInfo.getWzfT3Area());
            ps.setDouble(22, fireInfo.getCaT3Area());
            ps.setDouble(23, fireInfo.getWzfT3Length());
            ps.setDouble(24, fireInfo.getCaT3Length());
            // 0.5h
            ps.setDouble(25, fireInfo.getWzfT4Speed());
            ps.setDouble(26, fireInfo.getCaT4Speed());
            ps.setDouble(27, fireInfo.getWzfT4Area());
            ps.setDouble(28, fireInfo.getCaT4Area());
            ps.setDouble(29, fireInfo.getWzfT4Length());
            ps.setDouble(30, fireInfo.getCaT4Length());

            ps.execute();
            ResultSet rs = ps.getGeneratedKeys();
            if (rs.next()) {
                int id = rs.getInt(1);
                fireInfo.setId(id);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // 获取所有记录，通过start和count参数分页
    public List<FireInfo> list(int start, int count) {
        List<FireInfo> fireInfos = new ArrayList<>();
        String sql = "select * from fireInfo order by id desc limit ?,? ";
        try (Connection c = getConnection(); PreparedStatement ps = c.prepareStatement(sql);) {
            ps.setInt(1, start);
            ps.setInt(2, count);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                FireInfo fireInfo = new FireInfo();
                fireInfo.setId(rs.getInt(1));
                fireInfo.setFire_jingdu(rs.getDouble(2));
                fireInfo.setFire_weidu(rs.getDouble(3));
                fireInfo.setFengxiang(rs.getInt(4));
                fireInfo.setFengsu(rs.getDouble(5));
                fireInfo.setWendu(rs.getDouble(6));
                fireInfo.setShidu(rs.getDouble(7));
                // 0.5h
                fireInfo.setWzfT1Speed(rs.getDouble(8));
                fireInfo.setCaT1Speed(rs.getDouble(9));
                fireInfo.setWzfT1Area(rs.getDouble(10));
                fireInfo.setCaT1Area(rs.getDouble(11));
                fireInfo.setWzfT1Length(rs.getDouble(12));
                fireInfo.setCaT1Length(rs.getDouble(13));
                // 1h
                fireInfo.setWzfT2Speed(rs.getDouble(14));
                fireInfo.setCaT2Speed(rs.getDouble(15));
                fireInfo.setWzfT2Area(rs.getDouble(16));
                fireInfo.setCaT2Area(rs.getDouble(17));
                fireInfo.setWzfT2Length(rs.getDouble(18));
                fireInfo.setCaT2Length(rs.getDouble(19));
                // 1.5h
                fireInfo.setWzfT3Speed(rs.getDouble(20));
                fireInfo.setCaT3Speed(rs.getDouble(21));
                fireInfo.setWzfT3Area(rs.getDouble(22));
                fireInfo.setCaT3Area(rs.getDouble(23));
                fireInfo.setWzfT3Length(rs.getDouble(24));
                fireInfo.setCaT3Length(rs.getDouble(25));
                // 2h
                fireInfo.setWzfT4Speed(rs.getDouble(26));
                fireInfo.setCaT4Speed(rs.getDouble(27));
                fireInfo.setWzfT4Area(rs.getDouble(28));
                fireInfo.setCaT4Area(rs.getDouble(29));
                fireInfo.setWzfT4Length(rs.getDouble(30));
                fireInfo.setCaT4Length(rs.getDouble(31));

                fireInfos.add(fireInfo);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return fireInfos;
    }
}
