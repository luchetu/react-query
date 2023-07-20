import { DefaultLayout } from "../../template"
import { Col, Row, Breadcrumb } from "antd";
import React from "react";
import Link from "next/link";
import ListJokes from "../../components/lists/ListJokes";

const ListPage = () => {
    return (
        <DefaultLayout
            title="Case Management"
            breadCrumbs={
                <>
                    <Breadcrumb.Item>
                        <Link href="/">Dashboard</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Cases Management</Breadcrumb.Item>
                </>
            }
            sideMenuCollapsed={true}
        >
            <Row justify="center" align="middle">
                <Col span={24}>

                </Col>
            </Row>
        </DefaultLayout>
    );
};

export default ListPage;
