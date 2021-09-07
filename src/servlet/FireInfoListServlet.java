package servlet;

import bean.FireInfo;
import dao.FireInfoDAO;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

/**
 * @author: afuya
 * @program: ffsimulation
 * @date: 2021/8/23 10:04 上午
 */
public class FireInfoListServlet extends HttpServlet {
    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        List<FireInfo> fireInfos = new FireInfoDAO().list();
        request.setAttribute("fireInfos", fireInfos);
        request.getRequestDispatcher("listFireInfo.jsp").forward(request, response);
    }
}
