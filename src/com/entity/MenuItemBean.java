package com.entity;

/*
 * 子菜单实体类
 */
public class MenuItemBean {

    //菜单序号
    private int menuId;
    //菜单名
    private String menuName;
    //菜单地址
    private String url;
    //图标
    private String icon;

    public String getMenuName() {
        return menuName;
    }

    public int getMenuId() {
        return menuId;
    }

    public void setMenuId(int menuId) {
        this.menuId = menuId;
    }

    public void setMenuName(String menuName) {
        this.menuName = menuName;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }
}