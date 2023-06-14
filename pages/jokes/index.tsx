import { DefaultLayout } from "../../template"
import { Col, Row, Breadcrumb } from "antd";
import React from "react";
import Link from "next/link";
import JokeForm from "../../components/forms/JokeForm";

const EditJoke = () => {
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
            <Row justify="center" align="middle">
                <Col span={24}>
                    <JokeForm />
                </Col>
            </Row>
        </DefaultLayout>
    );
};

export default EditJoke;
