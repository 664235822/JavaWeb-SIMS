package com.dao;

import com.entity.BaseBean;
import com.entity.MenuItemBean;
import com.entity.MenuParentBean;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class MenuDao extends BaseDao {

    public MenuDao() throws SQLException, ClassNotFoundException, IllegalAccessException, InstantiationException {
        super();
    }

    public BaseBean getMenu(String character) throws SQLException {
        String sql = "select * from Menu where menuId in (select menuid from " + character + ")";

        ResultSet rs = querySelect(sql);
        BaseBean result = new BaseBean();
        result.setCode(BaseBean.SUCCESS);
        result.setData(new ArrayList<MenuParentBean>());

        while (rs.next()) {
            if (rs.getInt("parent") == 0) {
                MenuParentBean parent = new MenuParentBean();
                parent.setMenuId(rs.getInt("menuId"));
                parent.setMenuName(rs.getString("menuName"));
                parent.setItems(new ArrayList<MenuItemBean>());
                ((ArrayList<MenuParentBean>) result.getData()).add(parent);
            } else {
                MenuItemBean item = new MenuItemBean();
                item.setMenuId(rs.getInt("menuId"));
                item.setMenuName(rs.getString("menuName"));
                item.setUrl(rs.getString("url"));
                ((ArrayList<MenuParentBean>) result.getData()).get(rs.getInt("parent") - 1).getItems().add(item);
            }
        }

        result.setData(result);
        destroy(rs);

        return result;
    }
}
