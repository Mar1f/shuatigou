"use client";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import BasicLayout from "@/layouts/BasicLayout";
import React, { useCallback, useEffect } from "react";
import store, { AppDispatch } from "@/stores";
import { Provider, useDispatch } from "react-redux";
import { getLoginUserUsingGet } from "@/api/userController";
import AccessLayout from "@/access/AccessLayout";

/**
 * 执行初始化逻辑的布局（多封装一层）
 * @param children
 * @constructor
 */
const InitLayout: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  /**
   * 全局初始化函数，有全局单次调用的代码，都可以写到这里
   */
  const doInitLoginUser = useCallback(async () => {
    const res = await getLoginUserUsingGet();
    if (res.data) {
    } else {
      // 模拟登录
      // setTimeout(() => {
      //   const testUser = {
      //     username: "测试登录",
      //     id: 1,
      //     userAvatar:
      //       "https://img2.baidu.com/it/u=3258768447,4187215660&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
      //     userRole: ACCESS_ENUM.ADMIN,
      //   };
      //   dispatch(setLoginUser(testUser));
      // }, 3000);
    }
    console.log("hello 欢迎来到刷题狗");
  }, []);

  // 只执行一次
  useEffect(() => {
    doInitLoginUser();
  }, []);

  return <>{children}</>;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <Provider store={store}>
            <BasicLayout>
              <AccessLayout>{children}</AccessLayout>
            </BasicLayout>
          </Provider>
        </AntdRegistry>
      </body>
    </html>
  );
}
