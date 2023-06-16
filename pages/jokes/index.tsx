import { DefaultLayout } from "../../template"
import { Col, Row, Breadcrumb, Spin } from "antd";
import React from "react";
import Link from "next/link";
import JokeForm from "../../components/forms/JokeForm";
import { useRouter } from "next/router";
import { useJoke } from "../../hooks";
import { LoadingOutlined } from "@ant-design/icons";


const loadingIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;


const EditJoke = () => {

    const router = useRouter();

    const { id } = router.query;

    const { data: joke, isLoading } = useJoke(id);

    return (
        <DefaultLayout
            title="Jokes"
            breadCrumbs={
                <>
                    <Breadcrumb.Item>
                        <Link href="/jokes/list">Jokes List</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Jokes</Breadcrumb.Item>
                </>
            }
            sideMenuCollapsed={true}
        >
            <Spin indicator={loadingIcon} spinning={id ? isLoading : false}>
                <Row justify="center" align="middle">
                    <Col span={24}>

                        <JokeForm joke={joke} />

                    </Col>
                </Row>
            </Spin>
        </DefaultLayout>
    );
};

export default EditJoke;
