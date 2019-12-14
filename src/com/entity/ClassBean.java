package com.entity;

import java.util.List;

/*
 * 班级信息实体类
 */
public class ClassBean {

    //班级id
    private int id;
    //班级编号
    private String classCode;
    //班级名
    private String className;
    //科目列表
    private List<SubjectBean> subjects;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getClassCode() {
        return classCode;
    }

    public void setClassCode(String classCode) {
        this.classCode = classCode;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public List<SubjectBean> getSubjects() {
        return subjects;
    }

    public void setSubjects(List<SubjectBean> subjects) {
        this.subjects = subjects;
    }
}
