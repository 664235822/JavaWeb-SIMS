package com.servlet;

import com.alibaba.fastjson.JSON;
import com.entity.BaseBean;
import com.service.LoginService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/*
 * 修改密码Servlet类
 */
@WebServlet("/changePwd")
public class ChangePwdServlet extends HttpServlet {

    LoginService loginService = new LoginService();
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

            String code = req.getParameter("code");
            String pwd = req.getParameter("pwd");
            String newPwd = req.getParameter("newPwd");

            loginService.changePwd(code, pwd, newPwd);

            obj.setCode(BaseBean.SUCCESS);
            obj.setMessage("修改密码成功");
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
