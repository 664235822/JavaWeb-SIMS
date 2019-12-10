package com.dao;

import com.entity.BaseBean;
import com.entity.StudentBean;
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
     * @return BaseBean 返回教师信息
     * @throws SQLException
     */
    public BaseBean selectTeacher(String code, String name) throws SQLException {
        String sql = "select * from Teacher where 1=1 ";
        if (!code.isEmpty()) {
            sql += "and tCode like '%" + code + "%' ";
        }
        if (!name.isEmpty()) {
            sql += "and tName like '%" + name + "%' ";
        }
        sql += ";";

        ResultSet rs = querySelect(sql);

        BaseBean result = new BaseBean();
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

        result.setCode(BaseBean.SUCCESS);
        result.setData(list);
        destroy(rs);

        return result;
    }

    /*
     * 查看学生信息表
     * @param code 查询账号
     * @param name 查询用户名
     * @return BaseBean 返回学生信息
     * @throws SQLException
     */
    public BaseBean selectStudent(String code, String name) throws SQLException {
        String sql = "select * from Student where 1=1 ";
        if (!code.isEmpty()) {
            sql += "and stuCode like '%" + code + "%' ";
        }
        if (!name.isEmpty()) {
            sql += "and stuName like '%" + name + "' ";
        }
        sql += ";";
        ResultSet rs = querySelect(sql);

        BaseBean result = new BaseBean();
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
            student.setClassId(rs.getInt("classId"));

            list.add(student);
        }

        result.setCode(BaseBean.SUCCESS);
        result.setData(list);
        destroy(rs);

        return result;
    }
}
