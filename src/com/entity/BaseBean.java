package com.entity;

/*
 * 返回数据实体类
 */
public class BaseBean {

    public static final int SUCCESS = 1;
    public static final int FAILED = 0;

    //返回状态码
    private int code;
    //返回数据
    private Object data;
    //返回信息
    private String message;

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
