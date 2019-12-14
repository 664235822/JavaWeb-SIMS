package com.dao;

import com.entity.*;

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
            sql += "and code like '%" + code + "%' ";
        }
        if (!name.isEmpty()) {
            sql += "and name like '%" + name + "%' ";
        }
        sql += "limit " + (currentPage - 1) * 10 + ",10;";

        ResultSet rs = querySelect(sql);

        BaseBean result = new BaseBean();
        TableBean table = new TableBean();
        List<TeacherBean> list = new ArrayList<>();

        while (rs.next()) {
            TeacherBean teacher = new TeacherBean();

            teacher.setCode(rs.getString("code"));
            teacher.setName(rs.getString("name"));
            teacher.setSex(rs.getString("sex"));
            teacher.setAge(rs.getInt("age"));
            teacher.setEducation(rs.getString("education"));
            teacher.setGoodAt(rs.getString("goodAt"));
            teacher.setPhone(rs.getString("phone"));
            teacher.setQQ(rs.getString("QQ"));
            teacher.setEmail(rs.getString("email"));
            teacher.setAddress(rs.getString("address"));
            teacher.setIntroduction(rs.getString("introduction"));

            list.add(teacher);
        }

        for (int i = 0; i < list.size(); i++) {
            list.get(i).setPwd(selectPwd(list.get(i).getCode()));
        }

        table.setList(list);

        selectCount("Teacher", code, name, table);

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
        String sql = "select st.code,st.name,st.age,st.sex,st.QQ,st.phone,st.address,st.classId,cl.className,gr.gradeName,tea.name tName from Class cl " +
                "inner join Student st on st.classId=cl.id " +
                "inner join TeacherClass tc on tc.classId=cl.id " +
                "inner join Grade gr on cl.gradeId=gr.id " +
                "inner join Teacher tea on tc.tId=tea.id where 1=1 ";
        if (!code.isEmpty()) {
            sql += "and st.code like '%" + code + "%' ";
        }
        if (!name.isEmpty()) {
            sql += "and st.name like '%" + name + "%' ";
        }
        sql += "limit " + (currentPage - 1) * 10 + ",10;";
        ResultSet rs = querySelect(sql);

        BaseBean result = new BaseBean();
        TableBean table = new TableBean();
        List<StudentBean> list = new ArrayList<>();

        while (rs.next()) {
            StudentBean student = new StudentBean();

            student.setCode(rs.getString("code"));
            student.setName(rs.getString("name"));
            student.setAge(rs.getInt("age"));
            student.setSex(rs.getString("sex"));
            student.setQQ(rs.getString("QQ"));
            student.setPhone(rs.getString("phone"));
            student.setAddress(rs.getString("address"));
            student.setClassId(rs.getInt("classId"));
            student.setClassName(rs.getString("className"));
            student.setGradeName(rs.getString("gradeName"));
            student.setTeacherName(rs.getString("tName"));

            list.add(student);
        }

        for (int i = 0; i < list.size(); i++) {
            list.get(i).setPwd(selectPwd(list.get(i).getCode()));
        }

        table.setList(list);

        selectCount("Student", code, name, table);

        result.setCode(BaseBean.SUCCESS);
        result.setData(table);
        result.setMessage("查看学生信息成功");
        destroy(rs);

        return result;
    }

    /*
     * 获取班级信息
     * @return BaseBean 返回班级信息
     * @throws SQLException
     */
    public BaseBean selectClass() throws SQLException {
        BaseBean result = new BaseBean();
        List<GradeBean> list = new ArrayList<>();

        String sql = "select cl.id classId,cl.classCode,cl.className,gr.id gradeId,gr.gradeCode,gr.gradeName from Class cl ";
        sql += "inner join Grade gr on cl.gradeId=gr.id;";
        ResultSet rs = querySelect(sql);

        int gradeId = 0;
        while (rs.next()) {
            if (rs.getInt("gradeId") != gradeId) {
                gradeId = rs.getInt("gradeId");

                GradeBean grade = new GradeBean();
                grade.setId(rs.getInt("gradeId"));
                grade.setGradeCode(rs.getString("gradeCode"));
                grade.setGradeName(rs.getString("gradeName"));
                grade.setClasses(new ArrayList<>());
                grade.setSubjects(new ArrayList<>());

                list.add(grade);
            }

            for (int i = 0; i < list.size(); i++) {
                if (list.get(i).getId() == gradeId) {

                    ClassBean _class = new ClassBean();
                    _class.setId(rs.getInt("classId"));
                    _class.setClassCode(rs.getString("classCode"));
                    _class.setClassName(rs.getString("className"));

                    list.get(i).getClasses().add(_class);
                }
            }
        }

        sql = "select su.id subjectId,su.subjectCode,su.subjectName,gr.id gradeId from Subject su ";
        sql += "inner join Grade gr on su.gradeId=gr.id;";
        rs = querySelect(sql);

        gradeId = 0;
        while (rs.next()) {
            if (rs.getInt("gradeId") != gradeId) {
                gradeId = rs.getInt("gradeId");
            }

            for (int i = 0; i < list.size(); i++) {
                if (list.get(i).getId() == gradeId) {

                    SubjectBean subject = new SubjectBean();
                    subject.setId(rs.getInt("subjectId"));
                    subject.setSubjectCode(rs.getString("subjectCode"));
                    subject.setSubjectName(rs.getString("subjectName"));

                    list.get(i).getSubjects().add(subject);
                }
            }
        }

        result.setCode(BaseBean.SUCCESS);
        result.setData(list);
        result.setMessage("获取班级信息成功");
        destroy(rs);

        return result;
    }

    /*
     * 获取表格行数和页数
     * @param 数据库表名
     * @param 查询账号
     * @param 查询用户名
     * @param 返回表格实体类
     * @throws SQLException
     */
    void selectCount(String tableName, String code, String name, TableBean obj) throws SQLException {
        String sql = "select count(*) as count from " + tableName + " where 1=1 ";
        if (!code.isEmpty()) {
            sql += "and code like '%" + code + "%' ";
        }
        if (!name.isEmpty()) {
            sql += "and name like '%" + name + "%' ";
        }
        sql += ";";
        ResultSet rs = querySelect(sql);
        int dataCount = 0;
        int pageCount = 0;
        if (rs.next()) {
            dataCount = rs.getInt("count");
            pageCount = (dataCount + 10 - 1) / 10;
        }
        obj.setDataCount(dataCount);
        obj.setPageCount(pageCount);

        rs.close();
    }

    /*
     * 获取密码
     * @param 查询账号
     * @return String 密码
     * @throws SQLException
     */
    String selectPwd(String code) throws SQLException {
        String sql = "select * from Login where code='" + code + "';";
        String pwd = null;
        ResultSet rs = querySelect(sql);
        if (rs.next()) {
            pwd = rs.getString("pwd");
        }

        rs.close();
        return pwd;
    }
}
