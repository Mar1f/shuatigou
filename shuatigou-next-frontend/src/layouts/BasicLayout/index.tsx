"use client";
import {GithubFilled, LogoutOutlined, SearchOutlined,} from "@ant-design/icons";
import {ProLayout} from "@ant-design/pro-components";
import {Dropdown, Input} from "antd";
import React from "react";
import Image from "next/image";
import {usePathname} from "next/navigation";
import Link from "next/link";
import GlobalFooter from "@/components/GlobalFooter";
import {menus} from "../../../config/menu";
import "./index.css";
import {useSelector} from "react-redux";
import {RootState} from "@/stores";
/**
 * 搜索条
 * @constructor
 */
const SearchInput = () => {
  return (
      <div
          key="SearchOutlined"
          aria-hidden
          style={{
            display: "flex",
            alignItems: "center",
            marginInlineEnd: 24,
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
      >
        <Input
            style={{
              borderRadius: 4,
              marginInlineEnd: 12,
            }}
            prefix={<SearchOutlined />}
            placeholder="搜索题目"
            variant="borderless"
        />
      </div>
  );
};
interface Props {
  children: React.ReactNode;
}
/**
 * 全局通用布局
 * @param children
 * @constructor
 */
export default function BasicLayout({ children }: Props) {
  const pathname = usePathname();
  const loginUser = useSelector((state: RootState) => state.loginUser);

  return (
      <div
          id="basicLayout"
          style={{
            height: "100vh",
            overflow: "auto",
          }}
      >
        <ProLayout
            title="刷题狗刷题平台"
            layout="top"
            logo={
              <Image
                  src="/assets/logo.png"
                  height={32}
                  width={32}
                  alt="刷题狗刷题网站 - Mar1f"
              />
            }
            location={{
              pathname,
            }}
            avatarProps={{
              src: loginUser.userAvatar || "/assets/notLoginUser.png",
              size: "small",
              title: loginUser.userName || "未登录",
              render: (props, dom) => {
                return (
                    <Dropdown
                        menu={{
                          items: [
                            {
                              key: "logout",
                              icon: <LogoutOutlined />,
                              label: "退出登录",
                            },
                          ],
                        }}
                    >
                      {dom}
                    </Dropdown>
                );
              },
            }}
            actionsRender={(props) => {
              if (props.isMobile) return [];
              return [
                <SearchInput key="search" />,
                <a
                    key="github"
                    href="https://github.com/Mar1f/shuatigou"
                    target="_blank"
                >
                  <GithubFilled key="GithubFilled" />
                </a>,
              ];
            }}
            headerTitleRender={(logo, title, _) => {
              return (
                  <a>
                    {logo}
                    {title}
                  </a>
              );
            }}
            // 渲染底部栏
            footerRender={() => {
              return <GlobalFooter />;
            }}
            onMenuHeaderClick={(e) => console.log(e)}
            // 定义有哪些菜单
            menuDataRender={() => {
              return menus;
            }}
            // 定义了菜单项如何渲染
            menuItemRender={(item, dom) => (
                <Link href={item.path || "/"} target={item.target}>
                  {dom}
                </Link>
            )}
        >
            { JSON.stringify(loginUser) }
          {children}
        </ProLayout>
      </div>
  );
}