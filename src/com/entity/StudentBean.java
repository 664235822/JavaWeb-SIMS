package com.entity;

/*
 * 学生实体类
 */
public class StudentBean {

    //学生信息头部
    public static String[] studentInfo = {"stuCode", "stuName", "stuAge", "stuSex", "stuQQ", "stuPhone", "stuAddress", "classId"};

    //学生账号
    private String code;
    //学生姓名
    private String name;
    //学生年龄
    private int age;
    //学生性别
    private String sex;
    //学生QQ
    private String QQ;
    //学生电话
    private String phone;
    //学生地址
    private String address;
    //学生班级
    private int classId;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getQQ() {
        return QQ;
    }

    public void setQQ(String QQ) {
        this.QQ = QQ;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getClassId() {
        return classId;
    }

    public void setClassId(int classId) {
        this.classId = classId;
    }
}
