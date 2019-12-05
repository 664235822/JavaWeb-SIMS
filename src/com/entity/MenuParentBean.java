package com.entity;

import java.util.List;

public class MenuParentBean {

    private int menuId;
    private String menuName;
    private List<MenuItemBean> items;

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

    public List<MenuItemBean> getItems() {
        return items;
    }

    public void setItems(List<MenuItemBean> items) {
        this.items = items;
    }
}
