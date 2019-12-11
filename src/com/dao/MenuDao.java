package com.dao;

import com.entity.BaseBean;
import com.entity.MenuItemBean;
import com.entity.MenuParentBean;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/*
 * 获取主界面菜单类
 */
public class MenuDao extends BaseDao {

    public MenuDao() throws SQLException, ClassNotFoundException, IllegalAccessException, InstantiationException {
        super();
    }

    /*
     * 获取主界面菜单
     * @param character 登录角色
     * @return BaseBean 返货菜单信息
     * @throws SQLException
     */
    public BaseBean getMenu(String character) throws SQLException {
        String sql = "select * from Menu where menuId in (select menuid from " + character + ")";

        ResultSet rs = querySelect(sql);
        BaseBean result = new BaseBean();

        List<MenuParentBean> list = new ArrayList<>();

        while (rs.next()) {
            if (rs.getInt("parent") == 0) {
                MenuParentBean parent = new MenuParentBean();
                parent.setMenuId(rs.getInt("menuId"));
                parent.setMenuName(rs.getString("menuName"));
                parent.setItems(new ArrayList<MenuItemBean>());
                list.add(parent);
            } else {
                MenuItemBean item = new MenuItemBean();
                item.setMenuId(rs.getInt("menuId"));
                item.setMenuName(rs.getString("menuName"));
                item.setUrl(rs.getString("url"));

                for (int i = 0; i < (list).size(); i++) {
                    if (list.get(i).getMenuId() == rs.getInt("parent")) {
                        list.get(i).getItems().add(item);
                        break;
                    }
                }
            }
        }

        result.setCode(BaseBean.SUCCESS);
        result.setData(list);
        result.setMessage("查看菜单成功");
        destroy(rs);

        return result;
    }
}
