package com.entity;

/*
 * 教师实体类
 */
public class TeacherBean {

    //教师信息头部
    public static String[] teacherInfo = {"code", "name", "sex", "age", "education", "goodAt", "phone", "QQ", "email", "address", "introduction"};

    //教师账号
    private String code;
    //教师姓名
    private String name;
    //教师密码
    private String pwd;
    //教师性别
    private String sex;
    //教师年龄
    private int age;
    //教师学历
    private String education;
    //教师兴趣
    private String goodAt;
    //教师电话
    private String phone;
    //教师QQQ
    private String QQ;
    //教师邮箱
    private String email;
    //教师地址
    private String address;
    //教师信息
    private String introduction;

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

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getEducation() {
        return education;
    }

    public void setEducation(String education) {
        this.education = education;
    }

    public String getGoodAt() {
        return goodAt;
    }

    public void setGoodAt(String goodAt) {
        this.goodAt = goodAt;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getQQ() {
        return QQ;
    }

    public void setQQ(String QQ) {
        this.QQ = QQ;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }
}
