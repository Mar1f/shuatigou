"use client";
import React, {useState} from "react";
import {LoginFormPage, ProForm, ProFormCaptcha, ProFormText,} from "@ant-design/pro-components";
import {Divider, message, Tabs} from "antd";
import {LockOutlined, MobileOutlined, UserOutlined} from "@ant-design/icons";
import { userRegisterUsingPost} from "@/api/userController";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {AppDispatch} from "@/stores";
import {useDispatch} from "react-redux";
import "./index.css";

/**
 * 用户注册页面
 */
const UserRegisterPage: React.FC = () => {
  const [form] = ProForm.useForm();
  const [RegisterType, setRegisterType] = useState<"account" | "phone">("account");
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  /**
   * 提交处理
   * @param values 表单数据
   */
  const doSubmit = async (values: API.UserRegisterRequest) => {
    try {
      const res = await userRegisterUsingPost(values);
      if (res.data) {
        message.success("注册成功！");
        // 前往登陆页面
        router.push("/user/login");
      }
    } catch (e: any) {
      message.error("注册失败，" + e.message);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        height: "100vh",
      }}
      id="userLoginPage"
    >
      <LoginFormPage
        form={form}
        backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
        backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
        title={<span style={{ color: "white" }}>刷题狗</span>} // 设置标题颜色为白色
        // logo={<Image src="/assets/logo.png" alt="刷题狗" width={44} height={44} />}
        subTitle={<span style={{ color: "white" }}>爱上刷题</span>} // 设置副标题颜色为白色
        onFinish={doSubmit}
        submitter={{
          searchConfig: {
            submitText: "注册",
          },
        }}
        containerStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.65)",
          backdropFilter: "blur(4px)",
        }}
        actions={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Divider plain>
              <span
                style={{
                  fontWeight: "normal",
                  fontSize: 14,
                  color: "white", // 确保文字为白色
                }}
              >
                其他登录方式
              </span>
            </Divider>
          </div>
        }
      >
        <Tabs
          centered
          activeKey={RegisterType}
          onChange={(activeKey) =>
            setRegisterType(activeKey as "account" | "phone")
          }
        >
          <Tabs.TabPane key="account" tab="账号密码注册" />
          <Tabs.TabPane key="phone" tab="手机号注册" />
        </Tabs>

        {RegisterType === "account" && (
          <>
            <ProFormText
              name="userAccount"
              fieldProps={{
                size: "large",
                prefix: <UserOutlined className="prefixIcon" />,
              }}
              placeholder="请输入用户账号"
              rules={[
                {
                  required: true,
                  message: "请输入用户账号!",
                },
              ]}
            />
            <ProFormText.Password
              name="userPassword"
              fieldProps={{
                size: "large",
                prefix: <LockOutlined className="prefixIcon" />,
              }}
              placeholder="请输入密码"
              rules={[
                {
                  required: true,
                  message: "请输入密码！",
                },
              ]}
            />
          </>
        )}

        {RegisterType === "phone" && (
          <>
            <ProFormText
              name="mobile"
              fieldProps={{
                size: "large",
                prefix: <MobileOutlined className="prefixIcon" />,
              }}
              placeholder="请输入手机号"
              rules={[
                {
                  required: true,
                  message: "请输入手机号!",
                },
                {
                  pattern: /^1\d{10}$/,
                  message: "手机号格式错误！",
                },
              ]}
            />
            <ProFormCaptcha
              name="captcha"
              fieldProps={{
                size: "large",
                prefix: <LockOutlined className="prefixIcon" />,
              }}
              captchaProps={{
                size: "large",
              }}
              placeholder="请输入验证码"
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} 获取验证码`;
                }
                return "获取验证码";
              }}
              rules={[
                {
                  required: true,
                  message: "请输入验证码！",
                },
              ]}
              onGetCaptcha={async () => {
                message.success("获取验证码成功！验证码为：1234");
              }}
            />
          </>
        )}

        <div
          style={{
            marginBlockEnd: 24,
            textAlign: "end",
            color: "white",
          }}
        >
          已有账号？
          <Link prefetch={false} href="/user/login">
            去登录
          </Link>
        </div>
      </LoginFormPage>
    </div>
  );
};

export default UserRegisterPage;
