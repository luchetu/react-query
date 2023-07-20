import React, { useEffect } from 'react'
import {
    UnorderedListOutlined,
    MenuUnfoldOutlined,
    DownOutlined,
    RightOutlined,
    DatabaseOutlined,
    PlusOutlined,
    FolderOpenOutlined,
    DollarOutlined,
    FileSyncOutlined,
    BarChartOutlined,
    ApartmentOutlined,
    UsergroupAddOutlined,
    UserAddOutlined,
    UserOutlined,
    ToolOutlined,
    UnlockOutlined,
    TranslationOutlined
} from '@ant-design/icons';
import { MdOutlineNightlightRound } from 'react-icons/md';
import { WiDaySunny } from 'react-icons/wi';
import { Button, Layout, Menu, Breadcrumb, Badge, Col, Row } from 'antd';
import Image from 'next/image'
import { useState } from 'react';
import type { MenuProps, MenuTheme } from 'antd/es/menu';
import { useRouter } from "next/router";


interface defaultLayoutProps {
    title: string
    sideMenuCollapsed: boolean
    breadCrumbs: any
    children: any
}

const { Header, Sider, Content } = Layout;
const DefaultLayout: React.FC<defaultLayoutProps> = ({ children, breadCrumbs }) => {
    const [collapsed, setCollapsed] = useState(false);

    type MenuItem = Required<MenuProps>['items'][number];
    const router = useRouter();

    function getItem(
        label: React.ReactNode,
        key?: React.Key | null,
        icon?: React.ReactNode,
        children?: MenuItem[],
    ): MenuItem {
        return {
            key,
            icon,
            children,
            label,
        } as MenuItem;
    }

    const sidebarItems: MenuItem[] = [
        getItem('Clients', 'clients', <ApartmentOutlined />, [
            getItem('Client Management', '/clients/list', <UnorderedListOutlined />),
            getItem('Add Corporate', '/clients/corporate', <PlusOutlined />),
            getItem('Add Individual', '/clients/individual', <PlusOutlined />),
        ]),
        getItem('Cases', 'cases', <FolderOpenOutlined />, [
            getItem('Case Management', '/cases/list', <UnorderedListOutlined />),
            getItem('Add Case', '/cases/', <PlusOutlined />),
        ]),
        getItem('Appointments', 'appointments', <TranslationOutlined />, [
            getItem('List', '/appointments/list', <UnorderedListOutlined />),
            getItem('Book', '/appointments/book', <PlusOutlined />),
        ]),
        getItem('Documents', 'documents', <DatabaseOutlined />, [
            getItem('Docs Management', '/docs/list', <UnorderedListOutlined />),
            getItem('Add Document', '/docs/', <PlusOutlined />),
        ]),
        getItem('Bills', 'bills', <DollarOutlined />, [
            getItem('Bill Management', '/bills/list', <UnorderedListOutlined />),
            getItem('Add Bill', '/bills/', <PlusOutlined />),
            getItem('Invoice', '/bills/invoice/', <FileSyncOutlined />),
        ]),
        getItem('Users Management', 'users', <UsergroupAddOutlined />, [
            getItem('Users', 'users', <UserOutlined />, [
                getItem('List Users', 'users/list', <UnorderedListOutlined />),
                getItem('Add User', 'users/users', <UserAddOutlined />),
            ]),
            getItem('Roles', 'roles', <ToolOutlined />, [
                getItem('List Roles', 'roles/list', <UnorderedListOutlined />),
                getItem('Add Role', 'roles/roles', <PlusOutlined />),
            ]),
            getItem('Permissions', 'permissions', <UnlockOutlined />, [
                getItem('List Permissions', 'permissions/list', <UnorderedListOutlined />),
                getItem('Add Permission', 'permissions/permissions', <PlusOutlined />),
            ]),]),
        getItem('Reports', 'reports', <BarChartOutlined />)
    ]

    const onClick: MenuProps['onClick'] = (e) => {

        return router.push(e.key);
    };

    const modeDark = "Light";

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed} style={{ background: "#FFFF" }}>
                <div className="logo">
                    <div>
                        <Button
                            type="text"
                            icon={<MenuUnfoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 60,
                                height: 60,
                            }}
                        />
                    </div>
                    {!collapsed ? <div><Image
                        width={40}
                        height={40}
                        src="/images/nxtlogo.png"
                        alt="Picture of the author"
                    /> </div> :
                        ""}
                </div>

                <Menu
                    style={{ height: '100vh', }}
                    className="menu-items"
                    theme="light"
                    mode="vertical"
                    defaultSelectedKeys={['categories']}
                    items={sidebarItems}
                    expandIcon={<DownOutlined />}
                    onClick={onClick}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: "#F7F7F7",
                    }}
                >
                    <Row >

                        <Col style={{ display: "flex", justifyContent: "flex-end", }} span={24}>
                            <div style={{ display: "flex", justifyContent: "space-around", width: "100px", marginRight: "40px", alignItems: "center", margin: "20px" }}>
                                <div>
                                    {modeDark === "Light" ? <MdOutlineNightlightRound style={{ fontSize: 25 }} />
                                        :
                                        <WiDaySunny style={{ fontSize: 30, color: "black" }} />
                                    }
                                </div>

                            </div>
                        </Col>
                    </Row>
                </Header>

                <Content
                    style={{ margin: "0 16px" }}
                >
                    <Breadcrumb
                        separator={<RightOutlined style={{ fontSize: "12px" }} />}
                        style={{ margin: "0 0 16px" }}
                    >
                        {breadCrumbs}
                    </Breadcrumb>
                    {children}
                </Content>
            </Layout>
        </Layout >
    );
};
export default DefaultLayout;