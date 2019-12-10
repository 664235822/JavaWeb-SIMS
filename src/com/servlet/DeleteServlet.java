package com.servlet;

import com.alibaba.fastjson.JSON;
import com.entity.BaseBean;
import com.service.DeleteService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

/*
 * 删除信息Servlet类
 */
@WebServlet("/delete")
public class DeleteServlet extends HttpServlet {

    DeleteService deleteService = new DeleteService();
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
            String codeListStr = req.getParameter("codeList");

            List<Integer> codeList = JSON.parseObject(codeListStr, List.class);

            deleteService.delete(tableName, codeList);

            obj.setCode(BaseBean.SUCCESS);
            obj.setData("删除信息成功");
        } catch (Exception e) {
            obj.setCode(BaseBean.FAILED);
            obj.setData(e.getMessage());
        } finally {
            String result = JSON.toJSONString(obj);
            PrintWriter writer = resp.getWriter();
            writer.print(result);
        }
    }
}
