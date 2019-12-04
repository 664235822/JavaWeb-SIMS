package com.servlet;

import com.alibaba.fastjson.JSON;
import com.entity.BaseEntity;
import com.service.LoginService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/login")
public class LoginServlet extends HttpServlet{

    LoginService loginService;
    BaseEntity obj;

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

            obj = loginService.checkUserInfo(code,pwd);
        } catch (Exception e){
            obj.setCode(BaseEntity.FAILED);
            obj.setData(e.getMessage());
        } finally{
            String result = JSON.toJSONString(obj);
            PrintWriter writer = resp.getWriter();
            writer.print(result);
        }
    }
}