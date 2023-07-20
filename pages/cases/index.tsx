import { DefaultLayout } from "../../template"
import { Col, Row, Breadcrumb, Spin } from "antd";
import React from "react";
import Link from "next/link";
import CaseForm from "../../components/forms/CaseForm";
import { useRouter } from "next/router";
import { LoadingOutlined } from "@ant-design/icons";


const loadingIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;


const AddPage = () => {

    const router = useRouter();

    const { id } = router.query;

    return (
        <DefaultLayout
            title="Cases"
            breadCrumbs={
                <>
                    <Breadcrumb.Item>
                        <Link href="/cases/list">Cases List</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Cases</Breadcrumb.Item>
                </>
            }
            sideMenuCollapsed={true}
        >
            <Spin indicator={loadingIcon} spinning={id ? isLoading : false}>
                <Row justify="center" align="middle">
                    <Col span={24}>

                        <CaseForm />

                    </Col>
                </Row>
            </Spin>
        </DefaultLayout>
    );
};

export default AddPage;
