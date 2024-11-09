import { MenuDataItem } from "@ant-design/pro-layout";
import { CrownOutlined } from "@ant-design/icons";
import ACCESS_ENUM from "@/access/accessEnum";
import AccessEnum from "@/access/accessEnum";
// 菜单列表
export const menus = [
    {
        path: "/",
        name: "主页",
    },
    {
        path: "/banks",
        name: "题库",
        access: ACCESS_ENUM.USER || AccessEnum.VIP,
    },
    {
        path: "/questions",
        name: "题目",
    },
    {
        name: "刷题狗",
        path: "#",
        target: "_blank",
    },
    {
        path: "/admin",
        name: "管理",
        icon: <CrownOutlined />,
        access: ACCESS_ENUM.ADMIN,
        children: [
            {
                path: "/admin/user",
                name: "用户管理",
                access: ACCESS_ENUM.ADMIN,
            },
        ],
    },
] as MenuDataItem[];