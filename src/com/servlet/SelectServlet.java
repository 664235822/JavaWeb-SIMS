package com.servlet;

import com.alibaba.fastjson.JSON;
import com.entity.BaseBean;
import com.service.SelectService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/*
 * 查看表格Servlet类
 */
@WebServlet("/select")
public class SelectServlet extends HttpServlet {

    SelectService selectService = new SelectService();
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
            String code = req.getParameter("code");
            String name = req.getParameter("name");
            String gradeId = req.getParameter("gradeId");
            String classId = req.getParameter("classId");
            String subjectId = req.getParameter("subjectId");
            String currentPage = req.getParameter("currentPage");

            obj = selectService.select(tableName, code, name, gradeId, classId, subjectId, currentPage);
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
