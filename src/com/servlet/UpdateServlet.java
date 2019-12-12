package com.servlet;

import com.alibaba.fastjson.JSON;
import com.entity.BaseBean;
import com.service.UpdateService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/*
 * 更新信息Servlet类
 */
@WebServlet("/update")
public class UpdateServlet extends HttpServlet {

    UpdateService updateService = new UpdateService();
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

            String tableName = req.getParameter("tableName");
            String info = req.getParameter("info");

            updateService.update(tableName, info);

            obj.setCode(BaseBean.SUCCESS);
            obj.setMessage("更新信息成功");
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
