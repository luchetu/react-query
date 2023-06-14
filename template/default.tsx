import React from 'react'
import {
    UnorderedListOutlined,
    ReadOutlined,
    WindowsOutlined,
    VideoCameraAddOutlined,
    VideoCameraOutlined,
    MailOutlined,
    BellFilled,
    AppstoreAddOutlined,
    FileAddOutlined,
    MenuUnfoldOutlined,
    DownOutlined,
    RightOutlined,
    SmileOutlined,
    PlusOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, Breadcrumb, Typography, Badge, Col, Row, Space } from 'antd';
import Image from 'next/image'
import { useState } from 'react';
import type { MenuProps, MenuTheme } from 'antd/es/menu';
import { boolean } from 'yup';
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
        getItem('Jokes', 'jokes', <SmileOutlined />, [
            getItem('List Jokes', '/jokes/list', <UnorderedListOutlined />),
            getItem('Add Joke', '/jokes/', <PlusOutlined />),
        ])
    ];

    const onClick: MenuProps['onClick'] = (e) => {
        return router.push(e.key);
    };

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
                    mode="inline"
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

                                <Badge count={6} dot>
                                    <MailOutlined
                                        style={{ fontSize: 24 }}
                                    />
                                </Badge>
                                <Badge count={6}>
                                    <BellFilled
                                        style={{ fontSize: 24 }}
                                    />
                                </Badge>

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