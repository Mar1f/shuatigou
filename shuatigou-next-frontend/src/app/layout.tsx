"use client";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import BasicLayout from "@/layouts/BasicLayout";
import React, { useCallback, useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import store, { AppDispatch } from "@/stores";
import { getLoginUserUsingGet } from "@/api/userController";
import AccessLayout from "@/access/AccessLayout";
import { setLoginUser } from "@/stores/loginUser";
import "./globals.css";
import { usePathname } from "next/navigation"; // 引入 usePathname

/**
 * 全局初始化逻辑
 * @param children
 * @constructor
 */
const InitLayout: React.FC<
    Readonly<{
      children: React.ReactNode;
    }>
> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  // 初始化全局用户状态
  const doInitLoginUser = useCallback(async () => {
    const res = await getLoginUserUsingGet();
    if (res.data) {
      // 更新全局用户状态
      dispatch(setLoginUser(res.data));
    } else {
      // 仅用于测试
      // setTimeout(() => {
      //   const testUser = {
      //     userName: "测试登录",
      //     id: 1,
      //     userAvatar: "https://www.code-nav.cn/logo.png",
      //     userRole: ACCESS_ENUM.ADMIN
      //   };
      //   dispatch(setLoginUser(testUser));
      // }, 3000);
    }
  }, []);

  // 只执行一次
  useEffect(() => {
    doInitLoginUser();
  }, []);
  return children;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // 获取当前路径

  // 判断是否是登录或注册页面
  const isAuthPage =
    pathname.startsWith("/user/login") || pathname.startsWith("/user/register");

  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <Provider store={store}>
            {/* 如果是登录或注册页面，不显示 BasicLayout 和 AccessLayout */}
            {isAuthPage ? (
              <>{children}</> // 直接渲染子组件
            ) : (
              <AccessLayout>
                <BasicLayout>{children}</BasicLayout>
              </AccessLayout>
            )}
          </Provider>
        </AntdRegistry>
      </body>
    </html>
  );
}
