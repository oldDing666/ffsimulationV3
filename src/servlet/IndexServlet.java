package servlet;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

/**
 * @author: afuya
 * @program: forestfiresimulation
 * @date: 2021/7/28 10:33 上午
 */
public class IndexServlet extends HttpServlet {
    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int[][] fuelData = getFuelData();
        double[][] slopeData = getSlopeData();
        request.setAttribute("fuelData", fuelData);
        request.setAttribute("slopeData", slopeData);
        request.getRequestDispatcher("map.jsp").forward(request, response);
    }

    private int[][] getFuelData() {
        String path = this.getServletContext().getRealPath("/WEB-INF/data/fuelData.txt");
        System.out.println(path);
        File f = new File(path);
        int[][] fuelData = null;
        try (
                FileReader fr = new FileReader(f);
                BufferedReader br = new BufferedReader(fr);
        ) {
            // 读取前3行概览数据
            String line1 = br.readLine();
            int row = Integer.parseInt(line1.split(" ")[1]);
            System.out.println(row);
            String line2 = br.readLine();
            int col = Integer.parseInt(line2.split(" ")[1]);
            System.out.println(col);
            String line3 = br.readLine();
            int cellSize = Integer.parseInt(line3.split(" ")[1]);
            System.out.println(cellSize);

            fuelData = new int[row][col];
            // 读取后70行可燃物等级数据
            for (int i = 0; i < row; i++) {
                String line = br.readLine();
                String[] fuelLine = line.split(" ");
                for (int j = 0; j < col; j++) {
                    fuelData[i][j] = Integer.parseInt(fuelLine[j]);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return fuelData;
    }

    private double[][] getSlopeData() {
        String path = this.getServletContext().getRealPath("/WEB-INF/data/slopeData.txt");
        System.out.println(path);
        File f = new File(path);
        double[][] slopeData = null;
        try (
                FileReader fr = new FileReader(f);
                BufferedReader br = new BufferedReader(fr);
        ) {
            // 读取前3行概览数据
            String line1 = br.readLine();
            int row = Integer.parseInt(line1.split(" ")[1]);
            System.out.println(row);
            String line2 = br.readLine();
            int col = Integer.parseInt(line2.split(" ")[1]);
            System.out.println(col);
            String line3 = br.readLine();
            int cellSize = Integer.parseInt(line3.split(" ")[1]);
            System.out.println(cellSize);
            slopeData = new double[row][col];
            // 读取后70行可燃物等级数据
            for (int i = 0; i < row; i++) {
                String line = br.readLine();
                String[] fuelLine = line.split(" ");
                for (int j = 0; j < col; j++) {
                    slopeData[i][j] = Double.parseDouble(fuelLine[j]);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return slopeData;
    }
}
