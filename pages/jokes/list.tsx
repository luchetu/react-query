import { DefaultLayout } from "../../template"
import { Col, Row, Breadcrumb } from "antd";
import React from "react";
import Link from "next/link";
import ListJokes from "../../components/lists/ListJokes";

const ListPage = () => {
    return (
        <DefaultLayout
            title="Jokes"
            breadCrumbs={
                <>
                    <Breadcrumb.Item>
                        <Link href="/">Jokes</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Jokes</Breadcrumb.Item>
                </>
            }
            sideMenuCollapsed={true}
        >
            <Row justify="center" align="middle">
                <Col span={24}>
                    <ListJokes />
                </Col>
            </Row>
        </DefaultLayout>
    );
};

export default ListPage;
