package com.dao;

import com.entity.BaseBean;
import com.entity.StudentBean;
import com.entity.TableBean;
import com.entity.TeacherBean;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/*
 * 查看表格类
 */
public class SelectDao extends BaseDao {

    public SelectDao() throws SQLException, ClassNotFoundException, IllegalAccessException, InstantiationException {
        super();
    }

    /*
     * 查询教师信息表
     * @param code 查询账号
     * @param name 查询用户名
     * @param currentPage 当前页号
     * @return BaseBean 返回教师信息
     * @throws SQLException
     */
    public BaseBean selectTeacher(String code, String name, int currentPage) throws SQLException {
        String sql = "select * from Teacher where 1=1 ";
        if (!code.isEmpty()) {
            sql += "and tCode like '%" + code + "%' ";
        }
        if (!name.isEmpty()) {
            sql += "and tName like '%" + name + "%' ";
        }
        sql += "limit " + (currentPage - 1) * 10 + ",10;";

        ResultSet rs = querySelect(sql);

        BaseBean result = new BaseBean();
        TableBean table = new TableBean();
        List<TeacherBean> list = new ArrayList<>();

        while (rs.next()) {
            TeacherBean teacher = new TeacherBean();

            teacher.setCode(rs.getString("tCode"));
            teacher.setName(rs.getString("tName"));
            teacher.setSex(rs.getString("tSex"));
            teacher.setAge(rs.getInt("tAge"));
            teacher.setEducation(rs.getString("tEducation"));
            teacher.setGoodAt(rs.getString("tGoodAt"));
            teacher.setPhone(rs.getString("tPhone"));
            teacher.setQQ(rs.getString("tQQ"));
            teacher.setEmail(rs.getString("tEmail"));
            teacher.setAddress(rs.getString("tAddress"));
            teacher.setIntroduction(rs.getString("tIntroduction"));

            list.add(teacher);
        }

        table.setList(list);

        sql = "select count(*) as count from Teacher where 1=1 ";
        if (!code.isEmpty()) {
            sql += "and tCode like '%" + code + "%' ";
        }
        if (!name.isEmpty()) {
            sql += "and tName like '%" + name + "%' ";
        }
        sql += ";";
        rs = querySelect(sql);
        int dataCount = 0;
        int pageCount = 0;
        if (rs.next()) {
            dataCount = rs.getInt("count");
            pageCount = (dataCount + 10 - 1) / 10;
        }
        table.setDataCount(dataCount);
        table.setPageCount(pageCount);

        result.setCode(BaseBean.SUCCESS);
        result.setData(table);
        result.setMessage("查看教师信息成功");
        destroy(rs);

        return result;
    }

    /*
     * 查看学生信息表
     * @param code 查询账号
     * @param name 查询用户名
     * @param currentPage 当前页号
     * @return BaseBean 返回学生信息
     * @throws SQLException
     */
    public BaseBean selectStudent(String code, String name, int currentPage) throws SQLException {
        String sql = "select st.stuCode,st.stuName,st.stuAge,st.stuSex,st.stuQQ,st.stuPhone,st.stuAddress,cl.className,gr.gradeName,tea.tName from Student st " +
                "inner join Class cl on st.classId=cl.id " +
                "inner join Grade gr on cl.gradeId=gr.id " +
                "inner join TeacherClass tc on cl.id=tc.classId " +
                "inner join Teacher tea on tc.tId=tea.id where 1=1 ";
        if (!code.isEmpty()) {
            sql += "and st.stuCode like '%" + code + "%' ";
        }
        if (!name.isEmpty()) {
            sql += "and st.stuName like '%" + name + "%' ";
        }
        sql += "limit " + (currentPage - 1) * 10 + ",10;";
        ResultSet rs = querySelect(sql);

        BaseBean result = new BaseBean();
        TableBean table = new TableBean();
        List<StudentBean> list = new ArrayList<>();

        while (rs.next()) {
            StudentBean student = new StudentBean();

            student.setCode(rs.getString("stuCode"));
            student.setName(rs.getString("stuName"));
            student.setAge(rs.getInt("stuAge"));
            student.setSex(rs.getString("stuSex"));
            student.setQQ(rs.getString("stuQQ"));
            student.setPhone(rs.getString("stuPhone"));
            student.setAddress(rs.getString("stuAddress"));
            student.setClassName(rs.getString("className"));
            student.setGradeName(rs.getString("gradeName"));
            student.setTeacherName(rs.getString("tName"));

            list.add(student);
        }

        sql = "select count(*) as count from Student where 1=1 ";
        if (!code.isEmpty()) {
            sql += "and stuCode like '%" + code + "%' ";
        }
        if (!name.isEmpty()) {
            sql += "and stuName like '%" + name + "%' ";
        }
        sql += ";";
        rs = querySelect(sql);
        int dataCount = 0;
        int pageCount = 0;
        if (rs.next()) {
            dataCount = rs.getInt("count");
            pageCount = (dataCount + 10 - 1) / 10;
        }
        table.setDataCount(dataCount);
        table.setPageCount(pageCount);

        result.setCode(BaseBean.SUCCESS);
        result.setData(table);
        result.setMessage("查看学生信息成功");
        destroy(rs);

        return result;
    }
}
