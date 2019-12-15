package com.service;

import com.alibaba.fastjson.JSON;
import com.dao.MenuDao;
import com.entity.BaseBean;
import com.entity.MyException;

import java.sql.SQLException;
import java.util.Map;


/*
 * 获取主界面菜单服务类
 */
public class MenuService {

    MenuDao menuDao;

    /*
     * 获取主界面菜单
     * @param character 登录角色
     * @param currentPage 当前页号
     * @param getId 是否只返回页码id
     * @return BaseBean 返货菜单信息
     * @throws ClassNotFoundException, SQLException, InstantiationException, IllegalAccessException
     */
    public BaseBean getMenu(String character, int currentPage, boolean getId) throws ClassNotFoundException, SQLException, InstantiationException, IllegalAccessException {
        menuDao = new MenuDao();

        BaseBean result = null;
        if (!getId) {
            result = menuDao.getMenu(character, currentPage);
        } else {
            result = menuDao.getMenuId(character);
        }
        return result;
    }

    /*
     * 更新菜单权限
     * @param 登录角色
     * @param menuInfo 菜单权限集合Json字符串
     * @throws ClassNotFoundException, SQLException, InstantiationException, IllegalAccessException, MyException
     */
    public void updateMenu(String character, String menuInfo) throws ClassNotFoundException, SQLException, InstantiationException, IllegalAccessException, MyException {
        menuDao = new MenuDao();

        Map<Integer, Boolean> menuInfoMap = JSON.parseObject(menuInfo, Map.class);
        menuDao.updateMenu(character, menuInfoMap);
    }
}
