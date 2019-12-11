package com.servlet;

import com.alibaba.fastjson.JSON;
import com.entity.BaseBean;
import com.service.MenuService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/*
 * 获取主界面菜单Servlet
 */
@WebServlet("/menu")
public class MenuServlet extends HttpServlet {

    MenuService menuService = new MenuService();
    BaseBean obj = new BaseBean();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            req.setCharacterEncoding("utf-8");
            resp.setCharacterEncoding("utf-8");

            String character = req.getParameter("character");

            obj = menuService.getMenu(character);
        } catch (Exception e) {
            obj.setCode(BaseBean.FAILED);
            obj.setMessage(e.getMessage());
        } finally {
            String result = JSON.toJSONString(obj);
            PrintWriter writer = resp.getWriter();
            writer.print(result);
        }
    }
}
