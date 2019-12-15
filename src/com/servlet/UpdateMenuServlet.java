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
 * 更新菜单权限Servlet类
 */
@WebServlet("/updateMenu")
public class UpdateMenuServlet extends HttpServlet {

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
            int menuId = Integer.parseInt((req.getParameter("menuId")));
            boolean update = Boolean.parseBoolean(req.getParameter("update"));

            menuService.updateMenu(character, menuId, update);

            obj.setCode(BaseBean.SUCCESS);
            obj.setMessage("更新菜单权限成功");
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
