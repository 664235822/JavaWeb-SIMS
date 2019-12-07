package com.servlet;

import com.alibaba.fastjson.JSON;
import com.entity.BaseBean;
import com.service.ExcelService;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Iterator;
import java.util.List;

/*
 * 上传Excel文件并导入到数据库Servlet
 */
@WebServlet("/uploadExcel")
public class UploadExcelServlet extends HttpServlet {

    //上传文件路径
    private static String PATH_FOLDER = "/";
    //临时文件路径
    private static String TEMP_FOLDER = "/";

    ExcelService excelService = new ExcelService();
    BaseBean obj = new BaseBean();

    @Override
    public void init(ServletConfig config) throws ServletException {
        ServletContext servletContext = config.getServletContext();

        PATH_FOLDER = servletContext.getRealPath("/statics/upload");
        TEMP_FOLDER = servletContext.getRealPath("/uploadTemp");
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            req.setCharacterEncoding("utf-8");
            resp.setCharacterEncoding("utf-8");
            resp.setContentType("text/html;charset=UTF-8");

            String tableName = req.getParameter("tableName");

            DiskFileItemFactory factory = new DiskFileItemFactory();
            factory.setRepository(new File(TEMP_FOLDER));
            factory.setSizeThreshold(1024 * 1024);

            ServletFileUpload upload = new ServletFileUpload(factory);
            List<FileItem> list = upload.parseRequest(req);
            Iterator<FileItem> it = list.iterator();

            while (it.hasNext()) {
                FileItem item = it.next();
                if (!item.isFormField()) {
                    String filename = getUploadFileName(item);
                    String fx = filename.substring(filename.lastIndexOf("."));
                    String newfilename = System.currentTimeMillis() + fx;
                    File newfile = new File(PATH_FOLDER, newfilename);
                    item.write(newfile);

                    excelService.importFromExcelToMysql(newfile.getPath(), tableName);
                } else {
                    if (item.getFieldName().equals("username")) {
                        String userName = item.getString("utf-8");
                    }
                }
            }

            obj.setCode(BaseBean.SUCCESS);
            obj.setData("操作成功");
        } catch (Exception e) {
            obj.setCode(BaseBean.FAILED);
            obj.setData(e.getMessage());
        } finally {
            String result = JSON.toJSONString(obj);
            PrintWriter writer = resp.getWriter();
            writer.print(result);
        }
    }

    /*
     * 获得上传文件名
     * @param item 上传文件
     * @return 文件名
     */
    private String getUploadFileName(FileItem item) {
        String value = item.getName();
        int start = value.lastIndexOf("/");
        String filename = value.substring(start + 1);
        return filename;
    }
}
